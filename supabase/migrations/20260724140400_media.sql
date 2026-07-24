-- Dubzz Media: agency portfolio/CMS
create table public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  body text,
  cover_image text,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.case_studies enable row level security;

create policy "case_studies_public_read" on public.case_studies
  for select using (is_published or public.is_admin());

create policy "case_studies_admin_write" on public.case_studies
  for all using (public.is_admin()) with check (public.is_admin());

-- Powers the site-wide /blog, not just a Media-division feature
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  body text,
  cover_image text,
  is_published boolean not null default false,
  published_at timestamptz,
  author_id uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

create policy "blog_posts_public_read" on public.blog_posts
  for select using (is_published or public.is_admin());

create policy "blog_posts_admin_write" on public.blog_posts
  for all using (public.is_admin()) with check (public.is_admin());

create table public.media_bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  project_type text,
  message text,
  preferred_date date,
  status public.inquiry_status not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.media_bookings enable row level security;

create policy "media_bookings_public_insert" on public.media_bookings
  for insert with check (true);

create policy "media_bookings_admin_manage" on public.media_bookings
  for all using (public.is_admin()) with check (public.is_admin());
