# JK AB Player — Vercel Web Service (A→Z)

## 0) 준비
- GitHub 계정, Vercel 계정(무료)
- Postgres(DB): Supabase(추천)나 Neon 무료 티어

## 1) DB 만들기
- Supabase 프로젝트 생성 → SQL Editor에서 `schema.sql` 실행
- `tracks`, `media_links`에 초기 데이터 넣기(INSERT 또는 CSV/JSON Import)

## 2) 코드 올리기
- 이 폴더를 GitHub 새 리포로 푸시

## 3) Vercel 배포
- Vercel → "Add New Project" → 방금 리포 선택 → Deploy
- Project → Settings → Environment Variables:
  - `DATABASE_URL` = Postgres 접속 문자열
- 다시 Deploy(또는 자동 재배포)

## 4) 접속
- 배포 URL 예: https://<project>.vercel.app
- 상태 체크: /api/health → { ok: true }

## 5) 커스텀 도메인
- Vercel → Project → Settings → Domains → `yourdomain.com` 추가
- 안내대로 DNS CNAME 설정

## 6) 데이터 쓰는 법
- tracks 테이블: 제목/아티스트 등 메타
- media_links 테이블: 각 트랙의 JP/KR 유튜브 링크 + start/end
- 상세 페이지는 /api/tracks/:id 에서 best_links 계산

Done. 서버는 Vercel이 자동으로 운영합니다.
