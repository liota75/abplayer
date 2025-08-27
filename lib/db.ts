// lib/db.ts
import { Pool } from "pg";

// Vercel 서버리스에서는 Supabase pgBouncer(포트 6543) + sslmode=require 권장
// DATABASE_URL 예: postgres://postgres:비번@aws-0-xxx.pooler.supabase.com:6543/postgres?sslmode=require
const connectionString = process.env.DATABASE_URL!;

export const pool = new Pool({
  connectionString,
  // ★ 핵심: 인증서 검증 비활성화(셀프사인 체인 오류 회피)
  ssl: { rejectUnauthorized: false },
  // 서버리스 친화 옵션(안전한 소형 풀)
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
