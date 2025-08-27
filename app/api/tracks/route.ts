import { q } from "@/lib/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = (url.searchParams.get("query") || "").trim();
  const limit = Math.min(Number(url.searchParams.get("limit")||50), 200);

  const where = query ? `
    where jp_title ilike $1 or jp_artist ilike $1
       or kr_title ilike $1 or kr_artist ilike $1
       or $1 = any(tags)
  ` : "";
  const params = query ? [`%${query}%`] : [];
  const items = await q<any>(`
    select id,jp_title,jp_artist,jp_year,kr_title,kr_artist,kr_year,notes,tags
    from tracks ${where}
    order by updated_at desc
    limit ${limit}
  `, params);

  return Response.json({ items });
}
