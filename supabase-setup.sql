-- Run this in your Supabase SQL editor

CREATE TABLE leads (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at   timestamptz DEFAULT now(),
  name         text NOT NULL,
  phone        text NOT NULL,
  email        text,
  interest     text,
  source       text NOT NULL CHECK (source IN ('en', 'he')),
  page_url     text,
  ip           text
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Only server (service role) can insert — no public access
-- The API route uses the service role key, so no policy needed for inserts from server.
-- Block all client-side access:
CREATE POLICY "No public access" ON leads FOR ALL TO anon USING (false);
