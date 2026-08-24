-- ============================================================
-- Tabla de PRECIOS OFICIALES del consultorio (fuente: PRECIOS.docx)
-- Ejecutar en Supabase Dashboard > SQL Editor
-- ============================================================

create table if not exists precios (
  id int primary key,
  nombre text unique not null,
  categoria text not null check (categoria in ('General','Niño','Permanente')),
  precio numeric(8,2) not null
);

insert into precios (id, nombre, categoria, precio) values
  (1,'Consulta Dental','General',40),
  (2,'Radiografía Periapical','General',40),
  (3,'Sedación con Óxido Nitroso','Niño',250),
  (4,'Exodoncia Simple Niño','Niño',80),
  (5,'Exodoncia Compleja Niño','Niño',140),
  (6,'Exodoncia Supernumerario','Niño',250),
  (7,'Curación Simple Niño','Niño',80),
  (8,'Curación Compuesta Niño','Niño',100),
  (9,'Curación Compleja Niño','Niño',160),
  (10,'Pulpectomía','Niño',220),
  (11,'Pulpotomía','Niño',200),
  (12,'Corona de Acero','Niño',230),
  (13,'Mantenedor de Espacio','Niño',300),
  (14,'Operculectomía','Niño',300),
  (15,'Frenectomía','Niño',500),
  (16,'Exéresis Mucocele','Niño',300),
  (17,'Profilaxis Dental','Niño',100),
  (18,'Destartraje con Ultrasonido','Niño',160),
  (19,'Aplicación de Flúor','Niño',110),
  (20,'Curación Simple','Permanente',120),
  (21,'Curación Compuesta','Permanente',160),
  (22,'Curación Compleja','Permanente',280),
  (23,'Reconstrucción Estética','Permanente',350),
  (24,'Exodoncia Simple','Permanente',200),
  (25,'Destartraje con Ultrasonido + Profilaxis','Permanente',210),
  (26,'Blanqueamiento Consultorio (2 sesiones)','Permanente',350)
on conflict (id) do update set nombre=excluded.nombre, categoria=excluded.categoria, precio=excluded.precio;

alter table precios enable row level security;
drop policy if exists "precios public read" on precios;
create policy "precios public read" on precios for select using (true);
