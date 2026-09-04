-- Client portal: initial schema
-- clients + client_users with row level security so a signed-in user can
-- only ever read the client they belong to.

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  gbp_place_id text,
  local_falcon_location_id text,
  created_at timestamptz not null default now()
);

create table public.client_users (
  user_id uuid not null references auth.users (id) on delete cascade,
  client_id uuid not null references public.clients (id) on delete cascade,
  primary key (user_id, client_id)
);

alter table public.clients enable row level security;
alter table public.client_users enable row level security;

-- No insert/update/delete policies: with RLS enabled and only these select
-- policies, portal users are read-only. Admin writes happen via the Supabase
-- dashboard or the service role key.

create policy "Users can read their own memberships"
  on public.client_users
  for select
  using (user_id = (select auth.uid()));

create policy "Users can read their own client"
  on public.clients
  for select
  using (
    id in (
      select client_id
      from public.client_users
      where user_id = (select auth.uid())
    )
  );

-- Seed: first test client (Local Falcon uses the Google Place ID as the
-- location identifier).
insert into public.clients (name, gbp_place_id, local_falcon_location_id)
values (
  'Devin Fontenot, Attorney at Law',
  'ChIJj2YclxiHO4YRPjtIB1DH4_4',
  'ChIJj2YclxiHO4YRPjtIB1DH4_4'
);
