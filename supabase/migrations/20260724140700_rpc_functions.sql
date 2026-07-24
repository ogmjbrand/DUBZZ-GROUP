-- Transactional RPCs backing the create-order / create-booking Edge Functions.
-- security definer so a single call is one atomic transaction; each still reads
-- auth.uid() from the caller's JWT, so authorization is enforced inside the
-- function itself, not just by RLS on the underlying tables.

create or replace function public.create_order(
  p_items jsonb, -- [{ "product_variant_id": "...", "quantity": 2 }, ...]
  p_shipping_address_id uuid
)
returns public.orders
language plpgsql
security definer
set search_path = public
as $$
declare
  v_profile_id uuid := auth.uid();
  v_order public.orders;
  v_item jsonb;
  v_variant public.product_variants;
  v_total_cents integer := 0;
  v_unit_price integer;
  v_quantity integer;
begin
  if v_profile_id is null then
    raise exception 'Authentication required' using errcode = '28000';
  end if;

  if p_items is null or jsonb_array_length(p_items) = 0 then
    raise exception 'No items provided' using errcode = '22023';
  end if;

  -- Pass 1: lock each variant row and validate stock before writing anything.
  for v_item in select * from jsonb_array_elements(p_items)
  loop
    v_quantity := (v_item ->> 'quantity')::integer;

    select * into v_variant
    from public.product_variants
    where id = (v_item ->> 'product_variant_id')::uuid
    for update;

    if not found then
      raise exception 'Product variant % not found', v_item ->> 'product_variant_id';
    end if;

    if v_variant.stock_quantity < v_quantity then
      raise exception 'Insufficient stock for variant %', v_variant.sku using errcode = '23514';
    end if;

    v_unit_price := coalesce(
      v_variant.price_override_cents,
      (select price_cents from public.products where id = v_variant.product_id)
    );
    v_total_cents := v_total_cents + v_unit_price * v_quantity;
  end loop;

  insert into public.orders (profile_id, status, total_cents, shipping_address_id)
  values (v_profile_id, 'pending', v_total_cents, p_shipping_address_id)
  returning * into v_order;

  -- Pass 2: write order_items and decrement stock now that everything validated.
  for v_item in select * from jsonb_array_elements(p_items)
  loop
    v_quantity := (v_item ->> 'quantity')::integer;
    select * into v_variant from public.product_variants where id = (v_item ->> 'product_variant_id')::uuid;
    v_unit_price := coalesce(
      v_variant.price_override_cents,
      (select price_cents from public.products where id = v_variant.product_id)
    );

    insert into public.order_items (order_id, product_variant_id, quantity, unit_price_cents)
    values (v_order.id, v_variant.id, v_quantity, v_unit_price);

    update public.product_variants
    set stock_quantity = stock_quantity - v_quantity
    where id = v_variant.id;
  end loop;

  return v_order;
end;
$$;

create or replace function public.create_booking(
  p_sanctuary_id uuid,
  p_check_in date,
  p_check_out date,
  p_guests integer,
  p_experience_ids jsonb default '[]'::jsonb -- [{ "experience_id": "...", "quantity": 1 }, ...]
)
returns public.bookings
language plpgsql
security definer
set search_path = public
as $$
declare
  v_profile_id uuid := auth.uid();
  v_booking public.bookings;
  v_sanctuary public.sanctuaries;
  v_total_cents integer;
  v_item jsonb;
  v_exp public.experiences;
begin
  if v_profile_id is null then
    raise exception 'Authentication required' using errcode = '28000';
  end if;

  if p_check_out <= p_check_in then
    raise exception 'check_out must be after check_in' using errcode = '22023';
  end if;

  select * into v_sanctuary from public.sanctuaries where id = p_sanctuary_id and is_published;
  if not found then
    raise exception 'Sanctuary not found or unpublished';
  end if;

  v_total_cents := v_sanctuary.base_price_cents * (p_check_out - p_check_in);

  for v_item in select * from jsonb_array_elements(p_experience_ids)
  loop
    select * into v_exp from public.experiences where id = (v_item ->> 'experience_id')::uuid;
    if found then
      v_total_cents := v_total_cents + v_exp.price_cents * coalesce((v_item ->> 'quantity')::integer, 1);
    end if;
  end loop;

  -- The exclusion constraint on `bookings` (see wine_resort migration) rejects
  -- overlapping stays for this sanctuary; a conflict raises exclusion_violation
  -- (SQLSTATE 23P01), which the Edge Function turns into a 409 response.
  insert into public.bookings (profile_id, sanctuary_id, check_in, check_out, guests, status, total_cents)
  values (v_profile_id, p_sanctuary_id, p_check_in, p_check_out, p_guests, 'pending', v_total_cents)
  returning * into v_booking;

  for v_item in select * from jsonb_array_elements(p_experience_ids)
  loop
    insert into public.booking_experiences (booking_id, experience_id, quantity)
    values (v_booking.id, (v_item ->> 'experience_id')::uuid, coalesce((v_item ->> 'quantity')::integer, 1));
  end loop;

  return v_booking;
end;
$$;
