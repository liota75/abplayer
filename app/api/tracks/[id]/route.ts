import { q } from "../../../../lib/db";
import { rankLinks } from "../../../../lib/rank";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const [track] = await q<any>(`select * from tracks where id=$1`, [params.id]);
  if (!track) return new Response("not found", { status: 404 });

  const links = await q<any>(`select * from media_links where track_id=$1`, [params.id]);
  const best = {
    jp: rankLinks(links.filter((l:any)=>l.side==='jp'))[0] || null,
    kr: rankLinks(links.filter((l:any)=>l.side==='kr'))[0] || null,
  };
  return Response.json({ ...track, links, best_links: best });
}
