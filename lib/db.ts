// lib/db.ts
import pg from "pg";
const { Pool } = pg;

// 🔒 Supabase pgBouncer(6543) + sslmode=require 를 사용하되,
//    node-postgres의 TLS 검증을 전역에서 끕니다 (체인에 self-signed 포함시)
pg.defaults.ssl = { rejectUnauthorized: false };

// Vercel 환경변수에 저장한 풀러 URI (예: ...pooler.supabase.com:6543/...?...sslmode=require)
const connectionString = process.env.DATABASE_URL!;

export const pool = new Pool({
  connectionString,
  // 개별 옵션도 남겨둬 이중안전
  ssl: { rejectUnauthorized: false },
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
