-- ============================================================
-- SQL para ejecutar en Supabase → SQL Editor (todo de una vez)
-- ============================================================

-- 1. Fix notas_evolucion: id autogenerado + campo dentista_cop
alter table notas_evolucion alter column id set default gen_random_uuid();
alter table notas_evolucion add column if not exists dentista_cop text;

-- 2. Tabla odontogramas_sesion (PDF del odontograma + monto, por paciente)
create table if not exists odontogramas_sesion (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references pacientes(id) on delete cascade,
  fecha date not null,
  monto_total numeric not null default 0,
  detalle jsonb,
  pdf_url text,
  created_at timestamptz default now()
);
alter table odontogramas_sesion enable row level security;
drop policy if exists "odontogramas_sesion all" on odontogramas_sesion;
create policy "odontogramas_sesion all" on odontogramas_sesion for all using (true) with check (true);

-- 4. Columna correo en pacientes (para recordatorios por email)
alter table pacientes add column if not exists correo text;
