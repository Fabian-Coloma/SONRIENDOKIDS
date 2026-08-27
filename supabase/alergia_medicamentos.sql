-- Campo de alergia a medicamentos en historias clínicas
alter table historias_clinicas add column if not exists alergia_medicamentos text;
