-- Columna estado_pago en citas (Pagado / Falta / Debe)
alter table citas add column if not exists estado_pago text default 'Falta'
  check (estado_pago in ('Pagado','Falta','Debe'));
