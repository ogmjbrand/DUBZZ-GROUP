-- Move btree_gist out of public per Supabase's security linter (0014_extension_in_public).
-- Safe to relocate after creation: existing objects (e.g. the bookings exclusion
-- constraint) reference it by OID, not by schema-qualified name.
create schema if not exists extensions;
alter extension btree_gist set schema extensions;
