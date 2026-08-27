-- Recordatorios: columnas de control (ejecutar en Supabase SQL Editor)

alter table citas add column if not exists recordatorio_dia boolean default false;
alter table citas add column if not exists recordatorio_hora boolean default false;
