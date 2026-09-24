-- Borrado de datos de prueba para dejar el dashboard en blanco
-- Tablas que se borran: solo datos (filas), las tablas se mantienen intactas
-- Tablas que NO se tocan: precios (catálogo de tratamientos), lid_map (para Rebeca/WhatsApp)

DELETE FROM pacientes;
DELETE FROM citas;
DELETE FROM finanzas_ingresos;
DELETE FROM finanzas_egresos;
DELETE FROM historias_clinicas;
DELETE FROM notas_evolucion;
DELETE FROM odontogramas_sesion;
DELETE FROM historial_medico;

-- Verification
SELECT 'Borrado completado. Dashboard en blanco para la doctora.' AS resultado;
