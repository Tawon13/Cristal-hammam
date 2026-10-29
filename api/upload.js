import { checkPassword, json, deny } from './_lib/auth.js';
import { writePhoto } from './_lib/store.js';

const TYPES = { 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png' };

export async function POST(request) {
  if (!(await checkPassword(request))) return deny();
  const type = (request.headers.get('content-type') || '').split(';')[0];
  if (!TYPES[type]) return json({ error: 'Format d\'image non accepté.' }, 415);
  const bytes = new Uint8Array(await request.arrayBuffer());
  if (!bytes.length) return json({ error: 'Image vide.' }, 400);
  if (bytes.length > 4 * 1024 * 1024) return json({ error: 'Image trop lourde (4 Mo maximum).' }, 413);
  const base = (request.headers.get('x-file-name') || 'photo').toLowerCase().replace(/\.[a-z0-9]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'photo';
  const url = await writePhoto(base + '.' + TYPES[type], bytes, type);
  return json({ url });
}
