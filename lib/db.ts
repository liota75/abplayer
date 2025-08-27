// lib/db.ts
import { Pool } from "pg";

// Vercel 서버리스에서 Supabase 연결: pooler(6543) + sslmode=require 권장
// DATABASE_URL 예시:
// postgres://postgres:****@aws-0-xxx.pooler.supabase.com:6543/postgres?sslmode=require
const connectionString = process.env.DATABASE_URL!;

export const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }, // ★ 인증서 체인 검증 완화 (self-signed 에러 해결)
  max: 5,
  idleTimeoutMillis: 10_000,
  connectionTimeoutMillis: 10_000,
});

export async function q<T = any>(sql: string, params: any[] = []) {
  const c = await pool.connect();
  try {
    const r = await c.query(sql, params);
    return r.rows as T[];
  } finally {
    c.release();
  }
}
