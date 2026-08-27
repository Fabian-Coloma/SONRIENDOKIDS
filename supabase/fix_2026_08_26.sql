-- ============================================================
-- SQL PARA EJECUTAR EN SUPABASE → SQL EDITOR (todo de una vez)
-- Copia TODO este bloque, pégalo y dale Run
-- ============================================================

-- 1. FIX ERROR 403: permitir insertar ingresos desde la web
drop policy if exists "finanzas_ingresos anon insert" on finanzas_ingresos;
create policy "finanzas_ingresos anon insert"
on finanzas_ingresos for insert
to anon, authenticated
with check (true);

-- 2. Estado de pago en citas (Pagado / Falta / Debe)
alter table citas add column if not exists estado_pago text default 'Falta'
  check (estado_pago in ('Pagado','Falta','Debe'));

-- 3. Alergia a medicamentos (historia clínica)
alter table historias_clinicas add column if not exists alergia_medicamentos text;

-- 4. Columnas de recordatorios para citas y próximas citas
alter table citas add column if not exists recordatorio_semana boolean default false;
alter table citas add column if not exists recordatorio_dia boolean default false;
alter table citas add column if not exists recordatorio_hora boolean default false;
