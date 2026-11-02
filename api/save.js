import { checkPassword, json, deny, storageError } from './_lib/auth.js';
import { writeContent } from './_lib/store.js';

const KEYS = ['schedule', 'closures', 'promos', 'offers', 'slides', 'photos', 'spaces', 'rituals', 'tabsData', 'bookData'];

function validate(c) {
  if (!c || typeof c !== 'object') return 'Contenu invalide.';
  for (const k of KEYS) if (!Array.isArray(c[k])) return 'Champ manquant : ' + k;
  if (c.schedule.length !== 7) return 'Les horaires doivent couvrir 7 jours.';
  for (const d of c.schedule) for (const k of ['f', 'h']) {
    const v = d[k];
    if (v !== null && !(Array.isArray(v) && v.length === 2 && v.every(Number.isInteger) && v[0] >= 0 && v[1] <= 24 && v[0] < v[1])) return 'Horaire invalide.';
  }
  if (!c.slides.length) return 'Il faut au moins une photo en haut de page.';
  for (const p of c.promos) if (!p || typeof p.text !== 'string') return 'Promotion invalide.';
  for (const o of c.offers) if (!o || typeof o.title !== 'string' || !Array.isArray(o.items)) return 'Offre invalide.';
  return null;
}

export async function POST(request) {
  if (!(await checkPassword(request))) return deny();
  const text = await request.text();
  if (text.length > 300000) return json({ error: 'Contenu trop volumineux.' }, 413);
  let body;
  try { body = JSON.parse(text); } catch { return json({ error: 'Contenu invalide.' }, 400); }
  const content = Object.fromEntries(KEYS.map(k => [k, body[k]]));
  if (content.promos === undefined) content.promos = [];
  if (content.offers === undefined) content.offers = [];
  if (body.entry && typeof body.entry === 'object' && !Array.isArray(body.entry)) content.entry = body.entry;
  const err = validate(content);
  if (err) return json({ error: err }, 400);
  content.updatedAt = new Date().toISOString();
  try { await writeContent(content); }
  catch (e) { console.error(e); return json({ error: storageError(e) }, 500); }
  return json({ ok: true, updatedAt: content.updatedAt });
}
