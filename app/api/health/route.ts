// app/api/health/route.ts
import { q } from "../../../lib/db"; // app/api/health → 루트까지 3번 ↑

export async function GET() {
  // 기본 값: 서버리스가 살아있는지
  const base = { ok: true, env: "vercel-serverless" };

  // DB 진단을 시도하되, 실패해도 200으로 리턴해 원인만 보여줌
  try {
    const [{ count: tracks_count }] = await q<{count:number}>(
      "select count(*)::int as count from tracks"
    );
    const [{ count: links_count }] = await q<{count:number}>(
      "select count(*)::int as count from media_links"
    );
    const [{ db }]   = await q<{db:string}>("select current_database() as db");
    const [{ user }] = await q<{user:string}>("select current_user as user");

    return Response.json({ ...base, db, user, tracks_count, links_count });
  } catch (e:any) {
    // DB 연결/스키마 문제일 때도 원인을 눈에 보이게
    return Response.json({ ...base, db_error: String(e) });
  }
}
