-- Dubzz Trade: commodity showcase + B2B inquiries
create table public.commodities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  category text,
  images text[] not null default '{}',
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.commodities enable row level security;

create policy "commodities_public_read" on public.commodities
  for select using (is_published or public.is_admin());

create policy "commodities_admin_write" on public.commodities
  for all using (public.is_admin()) with check (public.is_admin());

create type public.inquiry_status as enum ('new', 'in_progress', 'closed');

-- Public can submit an inquiry but never read them back (no lead-list scraping);
-- only admins can read/manage.
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  message text not null,
  commodity_id uuid references public.commodities (id),
  status public.inquiry_status not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

create policy "inquiries_public_insert" on public.inquiries
  for insert with check (true);

create policy "inquiries_admin_manage" on public.inquiries
  for all using (public.is_admin()) with check (public.is_admin());
