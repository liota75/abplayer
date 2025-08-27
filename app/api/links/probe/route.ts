export async function POST(req: Request) {
  const { hrefs = [] } = await req.json().catch(()=>({hrefs:[]}));
  const results: any[] = [];
  for (const href of hrefs) {
    try {
      const u = "https://www.youtube.com/oembed?format=json&url="+encodeURIComponent(href);
      const r = await fetch(u, { cache: "no-store" });
      results.push({ href, ok: r.status===200, status: r.status });
    } catch(e:any) {
      results.push({ href, ok:false, error: String(e) });
    }
  }
  return Response.json({ results });
}
