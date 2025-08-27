export async function GET() {
  return Response.json({ ok: true, env: "vercel-serverless" });
}
