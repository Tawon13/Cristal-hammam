import { timingSafeEqual, createHash } from 'node:crypto';

const digest = s => createHash('sha256').update(String(s)).digest();

// Vérifie l'en-tête x-admin-password contre la variable ADMIN_PASSWORD.
export async function checkPassword(request) {
  const expected = process.env.ADMIN_PASSWORD;
  const given = request.headers.get('x-admin-password') || '';
  const ok = !!expected && timingSafeEqual(digest(given), digest(expected));
  if (!ok) await new Promise(r => setTimeout(r, 800));
  return ok;
}

export const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...headers } });

export const deny = () => json({ error: 'Mot de passe incorrect.' }, 401);

// Message lisible quand le stockage Vercel Blob refuse l'opération.
export function storageError(e) {
  const msg = String(e && e.message || e);
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) return 'Stockage non relié : BLOB_READ_WRITE_TOKEN est absent (Storage → Blob → Connect Project, puis redéployer).';
  if (/private/i.test(msg)) return 'Le stockage Blob est en accès privé ; il doit être en accès public. (' + msg + ')';
  return 'Stockage : ' + msg;
}
