// Serveur local : fichiers statiques + fonctions /api (stockage dans .data/).
// Usage : ADMIN_PASSWORD=test node scripts/dev-server.mjs [port]
import http from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const port = Number(process.argv[2] || 8765);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain' };

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (url.pathname.startsWith('/api/')) {
      const mod = await import(path.join(root, url.pathname.replace(/\/$/, '') + '.js') + '?t=' + Date.now());
      const handler = mod[req.method];
      if (!handler) { res.writeHead(405).end(); return; }
      const chunks = [];
      for await (const c of req) chunks.push(c);
      const request = new Request(url, { method: req.method, headers: req.headers, body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks) });
      const response = await handler(request);
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(Buffer.from(await response.arrayBuffer()));
      return;
    }
    let file = path.join(root, decodeURIComponent(url.pathname));
    if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
    if ((await fs.stat(file).catch(() => null))?.isDirectory()) file = path.join(file, 'index.html');
    const data = await fs.readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  } catch (e) {
    res.writeHead(e.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/plain' }).end(String(e.code || e.message));
  }
}).listen(port, () => console.log('http://localhost:' + port));
