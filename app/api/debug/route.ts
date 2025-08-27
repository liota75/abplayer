// app/api/debug/route.ts
import { q } from "../../../../lib/db";

export async function GET() {
  try {
    const [{ count: tracks_count }] = await q<{count: string}>("select count(*)::int as count from tracks");
    const [{ count: links_count }]  = await q<{count: string}>("select count(*)::int as count from media_links");
    // DB 식별 정보(민감값은 마스킹)
    const [{ db }] = await q<{db: string}>("select current_database() as db");
    const [{ user }] = await q<{user: string}>("select current_user as user");

    return Response.json({
      ok: true,
      db,
      user,
      tracks_count,
      links_count,
      note: "이 숫자가 0이면 목록이 비는 게 정상입니다."
    });
  } catch (e:any) {
    return Response.json({ ok:false, error: String(e) }, { status: 500 });
  }
}
