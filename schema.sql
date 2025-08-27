create table if not exists tracks (
  id text primary key,
  jp_title text, jp_artist text, jp_year int,
  kr_title text, kr_artist text, kr_year int,
  notes text,
  tags text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists media_links (
  id text primary key,
  track_id text references tracks(id) on delete cascade,
  side text check (side in ('jp','kr')),
  href text not null,
  start int default 0,
  "end" int,
  rank_score float default 0,
  is_official boolean default false,
  is_embeddable boolean default true,
  pinned boolean default false,
  last_checked_at timestamptz
);

create index if not exists media_links_track_side_idx on media_links(track_id, side);
