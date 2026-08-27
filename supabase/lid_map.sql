-- Auto-registro de LIDs: tabla para que cualquier número nuevo funcione
-- Ejecutar en Supabase SQL Editor

create table if not exists lid_map (
  lid text primary key,
  numero text not null,
  created_at timestamptz default now()
);

alter table lid_map enable row level security;
drop policy if exists "lid_map service all" on lid_map;
create policy "lid_map service all" on lid_map for all using (true) with check (true);
