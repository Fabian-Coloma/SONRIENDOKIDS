// ver-tablas.cjs — Verifica tablas y contenido de Supabase
// Lee .env correctamente y consulta la API REST

const fs = require('fs');
const https = require('https');

// Leer .env correctamente
const envRaw = fs.readFileSync('.env', 'utf8');
const urlMatch = envRaw.match(/^VITE_SUPABASE_URL=(.+)$/m);
const keyMatch = envRaw.match(/^SUPABASE_SERVICE_KEY=(.+)$/m);

if (!urlMatch || !keyMatch) {
  console.error('❌ No se encontró VITE_SUPABASE_URL o SUPABASE_SERVICE_KEY en .env');
  process.exit(1);
}

const BASE_URL = urlMatch[1].trim();
const KEY = keyMatch[1].trim();

// Extraer hostname del URL
const hostnameMatch = BASE_URL.match(/https?:\/\/([^/]+)/);
const HOSTNAME = hostnameMatch ? hostnameMatch[1] : BASE_URL;

console.log('✅ URL:', BASE_URL);
console.log('  Hostname:', HOSTNAME);
console.log('🔑 Service Key: OK (longitud:', KEY.length, ')');
console.log('');

// Función para hacer query a Supabase REST API
function querySupabase(endpoint, query = '') {
  return new Promise((resolve, reject) => {
    const fullPath = `/rest/v1/${endpoint}${query ? '?' + query : ''}`;
    const options = {
      hostname: HOSTNAME,
      port: 443,
      path: fullPath,
      method: 'GET',
      headers: {
        'apikey': KEY,
        'Authorization': `Bearer ${KEY}`,
        'Content-Type': 'application/json'
      },
      rejectUnauthorized: false
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (e) {
          resolve(data);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  try {
    console.log('=== Tablas en public schema ===');
    const tables = await querySupabase('tables?select=table_name&schema=public');
    if (Array.isArray(tables)) {
      tables.forEach(t => console.log('  -', t.table_name));
    } else {
      console.log('  (resultado no es array:', typeof tables, ')');
    }
    console.log('');

    console.log('=== Contenido de precios (order by precio asc) ===');
    const precios = await querySupabase('precios?order=precio.asc,nulls_first');
    if (Array.isArray(precios) && precios.length > 0) {
      console.log(`📦 ${precios.length} tratamientos registrados:\n`);
      precios.forEach((p, i) => {
        const precio = (p.precio !== null && p.precio !== undefined && p.precio !== '') ? `S/ ${p.precio}` : '—';
        const id = p.id ?? '—';
        const nombre = p.nombre ?? '—';
        console.log(`${i + 1}. [id: ${id}] ${nombre} — ${precio}`);
      });
    } else {
      console.log('⚠️ No hay tratamientos en la tabla precios o resultado no es array.');
      if (precios) console.log('  (tipo:', typeof precios, ')');
    }
    console.log('');

    // Verificar tablas de datos
    const tablesToCheck = ['pacientes', 'citas', 'finanzas_ingresos', 'finanzas_egresos', 'historias_clinicas', 'notas_evolucion', 'odontogramas_sesion', 'historial_medico', 'lid_map'];
    console.log('=== Cantidad de datos por tabla (tablas de información, NO catálogo) ===');
    for (const table of tablesToCheck) {
      try {
        const result = await querySupabase(`${table}?select=id`);
        const count = Array.isArray(result) ? result.length : '—';
        console.log(`  ${table}: ${count} registros`);
      } catch (e) {
        console.log(`  ${table}: error (${e.message || 'desconocido'})`);
      }
    }
    console.log('');
    console.log('✅ Verificación completada.');
  } catch (e) {
    console.error('❌ Error:', e.message);
    process.exit(1);
  }
}

main();
