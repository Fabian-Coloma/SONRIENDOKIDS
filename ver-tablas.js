// ver-tablas.js — Verifica tablas y contenido de Supabase
// Lee .env correctamente y consulta la API REST

const fs = require('fs');
const https = require('https');

// Leer .env correctamente (sin shell pipe issues)
const envRaw = fs.readFileSync('.env', 'utf8');
const urlMatch = envRaw.match(/^VITE_SUPABASE_URL=(.+)$/m);
const keyMatch = envRaw.match(/^SUPABASE_SERVICE_KEY=(.+)$/m);

if (!urlMatch || !keyMatch) {
  console.error('❌ No se encontró VITE_SUPABASE_URL o SUPABASE_SERVICE_KEY en .env');
  process.exit(1);
}

const URL = urlMatch[1].trim();
const KEY = keyMatch[1].trim();

console.log('✅ URL:', URL.replace(/\/rest\/v1.*/, ''));
console.log('🔑 Service Key: OK (longitud:', KEY.length, ')');
console.log('');

// Función para hacer query a Supabase REST API
function querySupabase(endpoint, query = '') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: new URL(URL).hostname,
      port: 443,
      path: `/rest/v1/${endpoint}${query ? '?' + query : ''}`,
      method: 'GET',
      headers: {
        'apikey': KEY,
        'Authorization': `Bearer ${KEY}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
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
    }
    console.log('');

    console.log('=== Contenido de precios (order by precio asc) ===');
    const precios = await querySupabase('precios?order=precio.asc,nulls_first');
    if (Array.isArray(precios) && precios.length > 0) {
      console.log(`📦 ${precios.length} tratamientos registrados:\n`);
      precios.forEach((p, i) => {
        const precio = p.precio !== null && p.precio !== undefined ? `S/ ${p.precio}` : '—';
        const id = p.id ?? '—';
        const nombre = p.nombre ?? '—';
        console.log(`${i + 1}. [id: ${id}] ${nombre} — ${precio}`);
      });
    } else {
      console.log('⚠️ No hay tratamientos en la tabla precios.');
    }
    console.log('');

    // Verificar tablas de datos
    const tablesToCheck = ['pacientes', 'citas', 'finanzas_ingresos', 'finanzas_egresos', 'historias_clinicas', 'notas_evolucion', 'odontogramas_sesion', 'historial_medico', 'lid_map'];
    console.log('=== Cantidad de datos por tabla (tablas de información, NO catálogo) ===');
    for (const table of tablesToCheck) {
      try {
        const result = await querySupabase(`${table}?select=count&id=eq.0`);
        const count = Array.isArray(result) ? result.length : '—';
        console.log(`  ${table}: ${count}`);
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
