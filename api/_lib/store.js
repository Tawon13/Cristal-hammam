// Stockage du contenu et des photos : Vercel Blob en ligne, dossier .data/ en local.
import { promises as fs } from 'node:fs';
import path from 'node:path';

const CONTENT = 'content.json';
// Connexion au Blob : jeton classique ou BLOB_STORE_ID + OIDC (nouveaux stockages Vercel)
const useBlob = () => !!(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
const localDir = () => path.join(process.cwd(), '.data');

export async function readContent() {
  if (useBlob()) {
    const { get } = await import('@vercel/blob');
    const res = await get(CONTENT, { access: 'public', useCache: false });
    if (!res || res.statusCode !== 200) return null;
    return JSON.parse(await new Response(res.stream).text());
  }
  try { return JSON.parse(await fs.readFile(path.join(localDir(), CONTENT), 'utf8')); }
  catch { return null; }
}

export async function writeContent(content) {
  const body = JSON.stringify(content);
  const backup = 'backups/content-' + new Date().toISOString().replace(/[:.]/g, '-') + '.json';
  if (useBlob()) {
    const { put } = await import('@vercel/blob');
    const opts = { access: 'public', contentType: 'application/json', addRandomSuffix: false };
    await put(CONTENT, body, { ...opts, allowOverwrite: true, cacheControlMaxAge: 60 });
    await put(backup, body, opts);
    return;
  }
  await fs.mkdir(path.join(localDir(), 'backups'), { recursive: true });
  await fs.writeFile(path.join(localDir(), CONTENT), body);
  await fs.writeFile(path.join(localDir(), backup), body);
}

export async function writePhoto(name, bytes, contentType) {
  if (useBlob()) {
    const { put } = await import('@vercel/blob');
    const blob = await put('photos/' + name, bytes, { access: 'public', contentType, addRandomSuffix: true });
    return blob.url;
  }
  const file = Date.now() + '-' + name;
  await fs.mkdir(path.join(localDir(), 'photos'), { recursive: true });
  await fs.writeFile(path.join(localDir(), 'photos', file), Buffer.from(bytes));
  return '/.data/photos/' + file;
}
