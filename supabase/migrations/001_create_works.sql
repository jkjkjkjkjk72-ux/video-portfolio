-- ============================================================
-- 001_create_works.sql
-- Supabase SQL Editor에서 전체를 복사하여 실행하세요.
-- ============================================================

CREATE TABLE IF NOT EXISTS works (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT        UNIQUE NOT NULL,
  title           TEXT        NOT NULL,
  client          TEXT        NOT NULL DEFAULT '',
  year            INTEGER     NOT NULL DEFAULT EXTRACT(YEAR FROM NOW())::INTEGER,
  genre           TEXT[]      NOT NULL DEFAULT '{}',
  thumbnail       TEXT        NOT NULL DEFAULT '',
  preview_video   TEXT,
  video_provider  TEXT        NOT NULL CHECK (video_provider IN ('vimeo', 'youtube')),
  video_id        TEXT        NOT NULL DEFAULT '',
  credits         JSONB       NOT NULL DEFAULT '[]',
  description     TEXT        NOT NULL DEFAULT '',
  stills          TEXT[]      NOT NULL DEFAULT '{}',
  featured        BOOLEAN     NOT NULL DEFAULT false,
  "order"         INTEGER     NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Row Level Security ──────────────────────────────────────
ALTER TABLE works ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 허용
CREATE POLICY "works_public_select"
  ON works FOR SELECT
  USING (true);

-- anon 키로 쓰기 허용 (관리자 패널 용)
-- ⚠️  프로덕션에서는 Supabase Auth 또는 service_role 키로 교체 권장
CREATE POLICY "works_anon_write"
  ON works FOR ALL
  USING (true)
  WITH CHECK (true);

-- ── 샘플 데이터 (선택) ──────────────────────────────────────
-- 아래 INSERT를 실행하면 기존 더미 데이터가 DB에 들어갑니다.
-- 관리자 패널에서 직접 입력하려면 생략해도 됩니다.

INSERT INTO works
  (slug, title, client, year, genre, thumbnail, preview_video,
   video_provider, video_id, credits, description, stills, featured, "order")
VALUES
  (
    'fragments-of-still',
    'Fragments of Still',
    'Self-initiated',
    2024,
    ARRAY['Short Film', 'Experimental'],
    'https://placehold.co/1920x1080/111111/333333?text=Fragments+of+Still',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'vimeo', '148751763',
    '[{"role":"Director","name":"Studio"},{"role":"Cinematographer","name":"Kim Jiyeon"}]',
    'An experimental short exploring the tension between motion and stillness.',
    ARRAY['https://placehold.co/1920x1080/111111/444444?text=Still+01',
          'https://placehold.co/1920x1080/111111/444444?text=Still+02'],
    true, 1
  ),
  (
    'between-seasons',
    'Between Seasons',
    'Arcana Apparel',
    2024,
    ARRAY['Commercial', 'Fashion'],
    'https://placehold.co/1920x1080/0d0d0d/2a2a2a?text=Between+Seasons',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    'vimeo', '259411563',
    '[{"role":"Director","name":"Studio"},{"role":"Cinematographer","name":"Lee Dongwoo"}]',
    'A brand film for Arcana Apparel''s AW24 collection.',
    ARRAY['https://placehold.co/1920x1080/0d0d0d/303030?text=Still+01',
          'https://placehold.co/1920x1080/0d0d0d/303030?text=Still+02'],
    true, 2
  ),
  (
    'open-ground',
    'Open Ground',
    'Korea Rural Community Corp.',
    2023,
    ARRAY['Documentary'],
    'https://placehold.co/1920x1080/0f0f0f/383838?text=Open+Ground',
    NULL,
    'youtube', 'dQw4w9WgXcQ',
    '[{"role":"Director","name":"Studio"},{"role":"Producer","name":"Jung Yeri"}]',
    'A 28-minute documentary following three farming families over one growing season.',
    ARRAY['https://placehold.co/1920x1080/0f0f0f/3d3d3d?text=Still+01'],
    false, 3
  ),
  (
    'signal-noise',
    'Signal / Noise',
    'Yura — Music Video',
    2023,
    ARRAY['Music Video'],
    'https://placehold.co/1920x1080/080808/252525?text=Signal+Noise',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    'youtube', 'dQw4w9WgXcQ',
    '[{"role":"Director","name":"Studio"},{"role":"Cinematographer","name":"Oh Seungchan"}]',
    'Music video for Yura''s single ''Signal / Noise''.',
    ARRAY['https://placehold.co/1920x1080/080808/2a2a2a?text=Still+01'],
    true, 4
  ),
  (
    'after-hours-gin',
    'After Hours',
    'Slant Gin',
    2023,
    ARRAY['Commercial', 'Beverage'],
    'https://placehold.co/1920x1080/101010/2e2e2e?text=After+Hours',
    NULL,
    'vimeo', '148751763',
    '[{"role":"Director","name":"Studio"},{"role":"Cinematographer","name":"Bae Jinwook"}]',
    'Product launch campaign for Slant Gin.',
    ARRAY['https://placehold.co/1920x1080/101010/333333?text=Still+01'],
    false, 5
  ),
  (
    'grid-city',
    'Grid City',
    'Seoul Architecture Biennale',
    2022,
    ARRAY['Documentary', 'Architecture'],
    'https://placehold.co/1920x1080/0c0c0c/282828?text=Grid+City',
    NULL,
    'vimeo', '259411563',
    '[{"role":"Director","name":"Studio"},{"role":"Cinematographer","name":"Shin Yoona"}]',
    'Commissioned for the 2022 Seoul Architecture Biennale.',
    ARRAY['https://placehold.co/1920x1080/0c0c0c/2d2d2d?text=Still+01'],
    false, 6
  )
ON CONFLICT (slug) DO NOTHING;
