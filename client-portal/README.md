# Multiply Local — Client Portal

Next.js (App Router, TypeScript) + Tailwind + Supabase client portal, deployed
at **clients.multiplylocal.com**. Step 1 scope: magic-link login, one client
per user, and a `/dashboard` showing the client's latest Local Falcon scan.

## 1. Create the Supabase project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → **New project** (name it `multiply-local-portal`, pick a region near Louisiana, e.g. `us-east-1`).
2. Once it's provisioned, open **Project Settings → API** and copy the **Project URL** and **anon public** key — you'll need both for `.env.local` and Vercel.
3. Under **Authentication → Sign In / Up**, make sure the **Email** provider is enabled — magic links work out of the box with it, and the portal never uses passwords.
4. Under **Authentication → URL Configuration**:
   - **Site URL**: `https://clients.multiplylocal.com`
   - **Redirect URLs**: add `https://clients.multiplylocal.com/auth/confirm` and `http://localhost:3000/auth/confirm`
5. (Recommended) Under **Authentication → Emails → Magic Link**, change the
   template link to the server-side `token_hash` format so links work even if
   opened in a different browser than the one that requested them:

   ```html
   <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">Log In</a>
   ```

   (The default `{{ .ConfirmationURL }}` template also works — the
   `/auth/confirm` route handles both formats.)

## 2. Run the migration

**Option A — SQL Editor (fastest):** open **SQL Editor** in the Supabase
dashboard, paste the contents of `supabase/migrations/20260904000000_init.sql`,
and run it.

**Option B — Supabase CLI:**

```bash
cd client-portal
supabase login
supabase link --project-ref YOUR-PROJECT-REF
supabase db push
```

This creates `clients` and `client_users` with row-level security (users can
only read their own client, nothing is writable from the portal) and seeds the
test client **Devin Fontenot, Attorney at Law**.

## 3. Link your user to the test client

Sign in once through the portal (so the auth user exists), then run this in
the SQL Editor:

```sql
insert into public.client_users (user_id, client_id)
select u.id, c.id
from auth.users u, public.clients c
where u.email = 'YOUR-EMAIL-HERE'
  and c.name = 'Devin Fontenot, Attorney at Law';
```

## 4. Run locally

```bash
cd client-portal
cp .env.example .env.local   # fill in the three values
npm install
npm run dev
```

## 5. Deploy to Vercel

1. In Vercel: **Add New → Project**, import the `multiplylocal` repo.
2. **Root Directory**: set to `client-portal` (important — the repo root is the
   static marketing site). Framework preset auto-detects Next.js.
3. Add the environment variables from `.env.example` (all three) for
   Production and Preview.
4. Deploy.
5. **Custom domain**: Project → Settings → Domains → add
   `clients.multiplylocal.com`, then add the CNAME record Vercel shows you
   (`clients` → `cname.vercel-dns.com`) at your DNS provider.

## Environment variables

See `.env.example`:

| Variable | Where it's used |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (client + server) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (safe for browser; RLS enforces access) |
| `LOCAL_FALCON_API_KEY` | Local Falcon API key — **server-only** (`lib/local-falcon.ts` imports `server-only`, so it can never be bundled for the browser) |

## Adding a client later

1. Insert a row into `clients` (the `local_falcon_location_id` is the
   location's Google Place ID as shown in Local Falcon).
2. Have the user sign in once, then insert a `client_users` row linking them.
