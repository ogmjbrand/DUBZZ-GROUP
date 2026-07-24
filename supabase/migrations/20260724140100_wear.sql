-- Dubzz Wear: catalog, cart, orders
create type public.order_status as enum ('pending', 'paid', 'fulfilled', 'cancelled');

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'USD',
  category text,
  images text[] not null default '{}',
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "products_public_read" on public.products
  for select using (is_published or public.is_admin());

create policy "products_admin_write" on public.products
  for all using (public.is_admin()) with check (public.is_admin());

create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  size text,
  color text,
  sku text not null unique,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  price_override_cents integer check (price_override_cents >= 0),
  created_at timestamptz not null default now()
);

alter table public.product_variants enable row level security;

create policy "product_variants_public_read" on public.product_variants
  for select using (
    public.is_admin() or exists (
      select 1 from public.products p where p.id = product_id and p.is_published
    )
  );

create policy "product_variants_admin_write" on public.product_variants
  for all using (public.is_admin()) with check (public.is_admin());

create table public.wishlists (
  profile_id uuid not null references public.profiles (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (profile_id, product_id)
);

alter table public.wishlists enable row level security;

create policy "wishlists_owner_or_admin" on public.wishlists
  for all using (profile_id = auth.uid() or public.is_admin())
  with check (profile_id = auth.uid() or public.is_admin());

-- Carts support guest sessions (profile_id null, session_id set), but guest carts
-- are only ever mutated server-side via the create-order Edge Function (service
-- role bypasses RLS) -- these policies only grant direct client access to a
-- signed-in owner's own cart.
create table public.carts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles (id) on delete cascade,
  session_id text,
  created_at timestamptz not null default now(),
  constraint carts_owner_check check (profile_id is not null or session_id is not null)
);

alter table public.carts enable row level security;

create policy "carts_owner_or_admin" on public.carts
  for all using ((profile_id is not null and profile_id = auth.uid()) or public.is_admin())
  with check ((profile_id is not null and profile_id = auth.uid()) or public.is_admin());

create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts (id) on delete cascade,
  product_variant_id uuid not null references public.product_variants (id),
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now(),
  unique (cart_id, product_variant_id)
);

alter table public.cart_items enable row level security;

create policy "cart_items_owner_or_admin" on public.cart_items
  for all using (
    public.is_admin() or exists (
      select 1 from public.carts c where c.id = cart_id and c.profile_id = auth.uid()
    )
  )
  with check (
    public.is_admin() or exists (
      select 1 from public.carts c where c.id = cart_id and c.profile_id = auth.uid()
    )
  );

-- Orders are only ever written by the create-order Edge Function (service role,
-- bypasses RLS) -- customers can read their own, never write directly.
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id),
  status public.order_status not null default 'pending',
  total_cents integer not null check (total_cents >= 0),
  currency text not null default 'USD',
  shipping_address_id uuid references public.addresses (id),
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "orders_owner_or_admin_read" on public.orders
  for select using (profile_id = auth.uid() or public.is_admin());

create policy "orders_admin_write" on public.orders
  for all using (public.is_admin()) with check (public.is_admin());

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_variant_id uuid not null references public.product_variants (id),
  quantity integer not null check (quantity > 0),
  unit_price_cents integer not null check (unit_price_cents >= 0)
);

alter table public.order_items enable row level security;

create policy "order_items_owner_or_admin_read" on public.order_items
  for select using (
    public.is_admin() or exists (
      select 1 from public.orders o where o.id = order_id and o.profile_id = auth.uid()
    )
  );

create policy "order_items_admin_write" on public.order_items
  for all using (public.is_admin()) with check (public.is_admin());
