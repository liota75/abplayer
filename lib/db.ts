import { Pool } from "pg";
const pgUrl = process.env.DATABASE_URL!;
export const pool = new Pool({ connectionString: pgUrl });

export async function q<T=any>(sql: string, params: any[] = []) {
  const c = await pool.connect();
  try { const r = await c.query(sql, params); return r.rows as T[]; }
  finally { c.release(); }
}
