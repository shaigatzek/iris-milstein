# Setup Instructions

## 1. Images
Save your property photos to `public/images/` with these exact names:
- `hero-bg.jpg` — pool + palm trees + house exterior (panoramic)
- `property-pool.jpg` — long narrow pool with tree reflections
- `property-garden.jpg` — garden entry path to stone house (spring)
- `property-exterior.jpg` — stone wall with red climbing vines
- `interior-dining.jpg` — Panton chairs dining room + glass wall
- `interior-kitchen.jpg` — kitchen with vintage mosaic floor
- `logo.png` — the Iris Milstein logo (Concept C, rose background or transparent)

## 2. GitHub
```bash
cd C:\Users\Roni\IrisMilstein
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/shaigatzek/iris-milstein.git
git push -u origin main
```

## 3. Supabase
1. Go to supabase.com → your project → SQL Editor
2. Run the contents of `supabase-setup.sql`
3. Go to Settings → API → copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Service Role Key (secret) → `SUPABASE_SERVICE_ROLE_KEY`

## 4. Vercel
1. Go to vercel.com → New Project → Import from GitHub → select `iris-milstein`
2. In Environment Variables, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your supabase URL
   - `SUPABASE_SERVICE_ROLE_KEY` = your service role key
3. Deploy

## 5. Domain
In Vercel → Settings → Domains:
- Add `square34.com` → English page (/)
- Add `square34.com/he` → Hebrew page (already handled by Next.js routing)

Or if square34.com is already pointing elsewhere:
- Point DNS to Vercel nameservers
- Vercel handles both routes automatically
