import { checkPassword, json, deny } from './_lib/auth.js';

export async function POST(request) {
  if (!process.env.ADMIN_PASSWORD) return json({ error: 'ADMIN_PASSWORD n\'est pas configuré sur Vercel.' }, 500);
  return (await checkPassword(request)) ? json({ ok: true }) : deny();
}
