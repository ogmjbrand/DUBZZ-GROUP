-- Dubzz Wine Resort: sanctuaries, experiences, bookings
create type public.booking_status as enum ('pending', 'confirmed', 'cancelled');

create table public.sanctuaries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  images text[] not null default '{}',
  base_price_cents integer not null check (base_price_cents >= 0),
  capacity integer not null default 2 check (capacity > 0),
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.sanctuaries enable row level security;

create policy "sanctuaries_public_read" on public.sanctuaries
  for select using (is_published or public.is_admin());

create policy "sanctuaries_admin_write" on public.sanctuaries
  for all using (public.is_admin()) with check (public.is_admin());

create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  sanctuary_id uuid references public.sanctuaries (id) on delete cascade,
  name text not null,
  description text,
  price_cents integer not null check (price_cents >= 0),
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.experiences enable row level security;

create policy "experiences_public_read" on public.experiences
  for select using (is_published or public.is_admin());

create policy "experiences_admin_write" on public.experiences
  for all using (public.is_admin()) with check (public.is_admin());

-- stay_range + the exclusion constraint below reject overlapping bookings for the
-- same sanctuary at the database level (cancelled bookings don't block new ones).
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id),
  sanctuary_id uuid not null references public.sanctuaries (id),
  check_in date not null,
  check_out date not null check (check_out > check_in),
  guests integer not null default 1 check (guests > 0),
  status public.booking_status not null default 'pending',
  total_cents integer not null check (total_cents >= 0),
  created_at timestamptz not null default now(),
  stay_range daterange generated always as (daterange(check_in, check_out, '[)')) stored,
  exclude using gist (sanctuary_id with =, stay_range with &&) where (status <> 'cancelled')
);

alter table public.bookings enable row level security;

create policy "bookings_owner_or_admin_read" on public.bookings
  for select using (profile_id = auth.uid() or public.is_admin());

create policy "bookings_admin_write" on public.bookings
  for all using (public.is_admin()) with check (public.is_admin());

create table public.booking_experiences (
  booking_id uuid not null references public.bookings (id) on delete cascade,
  experience_id uuid not null references public.experiences (id),
  quantity integer not null default 1 check (quantity > 0),
  primary key (booking_id, experience_id)
);

alter table public.booking_experiences enable row level security;

create policy "booking_experiences_owner_or_admin_read" on public.booking_experiences
  for select using (
    public.is_admin() or exists (
      select 1 from public.bookings b where b.id = booking_id and b.profile_id = auth.uid()
    )
  );

create policy "booking_experiences_admin_write" on public.booking_experiences
  for all using (public.is_admin()) with check (public.is_admin());
