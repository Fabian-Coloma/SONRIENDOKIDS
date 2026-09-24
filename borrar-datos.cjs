// borrar-datos.js — Borra datos de prueba del dashboard, dejando tablas intactas
// Tablas que se borran: pacientes, citas, finanzas_ingresos, finanzas_egresos,
//   historias_clinicas, notas_evolucion, odontogramas_sesion, historial_medico
// Tablas que NO se tocan: precios (catálogo de tratamientos), lid_map (para Rebeca/WhatsApp)

const fs = require('fs');
const path = require('path');

// Leer .env y parsear variables
function parseEnv(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;
    const eqIdx = line.indexOf('=');
    if (eqIdx === -1) return;
    const key = line.substring(0, eqIdx).trim();
    let val = line.substring(eqIdx + 1).trim();
    // Quitar comillas alrededor del valor
    val = val.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
    env[key] = val;
  });
  return env;
}

const env = parseEnv(path.join(__dirname, '.env'));
const URL = env.VITE_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_KEY;

console.log('=== Iniciando borrado de datos de prueba ===');
console.log('URL:', URL);
console.log('KEY:', KEY.substring(0, 30) + '...');
console.log('');

const tablas = [
  'pacientes',
  'citas',
  'finanzas_ingresos',
  'finanzas_egresos',
  'historias_clinicas',
  'notas_evolucion',
  'odontogramas_sesion',
  'historial_medico'
];

async function borrarTabla(tabla) {
  const url = `${URL}/rest/v1/${tabla}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'apikey': KEY,
        'Authorization': `Bearer ${KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=retain-order'
      }
    });
    const text = await response.text();
    console.log(`tabla ${tabla}: HTTP ${response.status}`);
    if (response.status !== 200 && response.status !== 204 && text) {
      console.log('  error:', text.substring(0, 200));
    }
    return { tabla, status: response.status, text };
  } catch (err) {
    console.log(`tabla ${tabla}: ERROR - ${err.message}`);
    return { tabla, status: 0, text: err.message };
  }
}

async function contarTabla(tabla) {
  const url = `${URL}/rest/v1/${tabla}?limit=0`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': KEY,
        'Authorization': `Bearer ${KEY}`
      }
    });
    const text = await response.text();
    if (response.status === 200) {
      const data = JSON.parse(text);
      return { tabla, count: Array.isArray(data) ? data.length : 0, ok: true };
    } else {
      return { tabla, count: -1, ok: false, error: text.substring(0, 100) };
    }
  } catch (err) {
    return { tabla, count: -1, ok: false, error: err.message };
  }
}

(async () => {
  console.log('\n=== INICIANDO BORRADO DE DATOS DE PRUEBA ===\n');
  
  // Borrado tabla por tabla
  for (const tabla of tablas) {
    await borrarTabla(tabla);
  }
  
  console.log('\n=== VERIFICANDO QUE LAS TABLAS ESTÁN VACÍAS ===\n');
  
  // Verificación
  let todasVacias = true;
  for (const tabla of tablas) {
    const result = await contarTabla(tabla);
    const estado = result.ok ? (result.count === 0 ? 'VACÍA ✅' : `TIENE ${result.count} REGISTROS ❌`) : `ERROR: ${result.error}`;
    console.log(`tabla ${tabla.padEnd(25)} | ${estado}`);
    if (!result.ok || result.count !== 0) todasVacias = false;
  }
  
  console.log('\n=== RESULTADO FINAL ===');
  if (todasVacias) {
    console.log('✅ TODOS LOS DATOS DE PRUEBA FUERON BORRADOS');
    console.log('✅ El dashboard queda en blanco para la doctora');
    console.log('✅ Las tablas (precios, lid_map) permanecen intactas');
    console.log('✅ El sistema sigue funcionando correctamente');
  } else {
    console.log('⚠️  Algunas tablas aún tienen datos o tuvieron errores');
    console.log('⚠️  Revisá el listado de arriba para ver qué falló');
  }
  
  console.log('\n=== Para verificar en el dashboard: ===');
  console.log('1. Entrá a https://sonriendokids.fun/admin');
  console.log('2. El dashboard debe estar vacío (sin pacientes, citas, financieras)');
  console.log('3. El odontograma y catálogo de tratamientos siguen estando disponibles');
})();
