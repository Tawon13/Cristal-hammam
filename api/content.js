import { readContent } from './_lib/store.js';
import { json } from './_lib/auth.js';

export async function GET() {
  try {
    const content = await readContent();
    return json(content || {}, 200, { 'Cache-Control': 'public, max-age=0, s-maxage=15, stale-while-revalidate=60' });
  } catch (e) {
    return json({}, 200, { 'Cache-Control': 'no-store' });
  }
}
