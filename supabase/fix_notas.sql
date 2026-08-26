-- ============================================================
-- SQL PARA EJECUTAR HOY (26/08) — copia TODO y dale Run
-- ============================================================

-- 1. Fix notas_evolucion: id autogenerado + campo dentista_cop
alter table notas_evolucion alter column id set default gen_random_uuid();
alter table notas_evolucion add column if not exists dentista_cop text;

-- 2. Tabla próximas citas (recordatorios automáticos)
create table if not exists proximas_citas (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references pacientes(id) on delete cascade,
  fecha date not null,
  hora time not null,
  motivo text,
  notas text,
  notificar_whatsapp boolean default true,
  notificar_email boolean default true,
  rec_semana_wspp boolean default false,
  rec_semana_email boolean default false,
  rec_dia_wspp boolean default false,
  rec_dia_email boolean default false,
  rec_hora_wspp boolean default false,
  rec_hora_email boolean default false,
  created_at timestamptz default now()
);
alter table proximas_citas enable row level security;
drop policy if exists "proximas_citas service all" on proximas_citas;
create policy "proximas_citas service all" on proximas_citas for all using (true) with check (true);
