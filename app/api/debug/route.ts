// app/api/debug/route.ts
import { q } from "../../../lib/db"; // debug도 health와 동일: 3번 ↑

export async function GET() {
  try {
    const [{ count: tracks_count }] = await q<{count:number}>("select count(*)::int as count from tracks");
    const [{ count: links_count }]  = await q<{count:number}>("select count(*)::int as count from media_links");
    return Response.json({ ok:true, tracks_count, links_count });
  } catch (e:any) {
    return Response.json({ ok:false, error:String(e) }, { status: 500 });
  }
}
