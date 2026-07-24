-- Dubzz Group: investor relations
create type public.document_visibility as enum ('public', 'investor_only');

create table public.investor_documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  file_url text not null,
  category text,
  visibility public.document_visibility not null default 'investor_only',
  created_at timestamptz not null default now()
);

alter table public.investor_documents enable row level security;

create policy "investor_documents_read" on public.investor_documents
  for select using (
    visibility = 'public'
    or public.is_admin()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('investor', 'admin')
    )
  );

create policy "investor_documents_admin_write" on public.investor_documents
  for all using (public.is_admin()) with check (public.is_admin());

create type public.membership_tier as enum ('member', 'inner_circle', 'founder');

-- Backs the "Guest Profile: Inner Circle Hub" screen
create table public.investor_memberships (
  profile_id uuid primary key references public.profiles (id) on delete cascade,
  tier public.membership_tier not null default 'member',
  joined_at timestamptz not null default now()
);

alter table public.investor_memberships enable row level security;

create policy "investor_memberships_owner_or_admin_read" on public.investor_memberships
  for select using (profile_id = auth.uid() or public.is_admin());

create policy "investor_memberships_admin_write" on public.investor_memberships
  for all using (public.is_admin()) with check (public.is_admin());

-- Site-wide: Careers
create table public.job_postings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  department text,
  location text,
  employment_type text,
  description text,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.job_postings enable row level security;

create policy "job_postings_public_read" on public.job_postings
  for select using (is_published or public.is_admin());

create policy "job_postings_admin_write" on public.job_postings
  for all using (public.is_admin()) with check (public.is_admin());

create table public.job_applications (
  id uuid primary key default gen_random_uuid(),
  job_posting_id uuid not null references public.job_postings (id),
  name text not null,
  email text not null,
  resume_url text,
  cover_letter text,
  created_at timestamptz not null default now()
);

alter table public.job_applications enable row level security;

create policy "job_applications_public_insert" on public.job_applications
  for insert with check (true);

create policy "job_applications_admin_manage" on public.job_applications
  for all using (public.is_admin()) with check (public.is_admin());

-- Site-wide: Contact
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  division text,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "contact_messages_public_insert" on public.contact_messages
  for insert with check (true);

create policy "contact_messages_admin_manage" on public.contact_messages
  for all using (public.is_admin()) with check (public.is_admin());
