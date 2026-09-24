// agregar-sellantes.cjs — Agrega sellantes de S/ 50 para niños y adultos en la tabla precios
// Versión que limpia bien el hostname del .env (quita comillas y espacios)

const fs = require('fs');
const https = require('https');

const envRaw = fs.readFileSync('.env', 'utf8');
const urlMatch = envRaw.match(/^VITE_SUPABASE_URL=(.*)$/m);
const keyMatch = envRaw.match(/^SUPABASE_SERVICE_KEY=(.*)$/m);

if (!urlMatch || !keyMatch) { console.error('❌ Falen credenciales'); process.exit(1); }

let BASE_URL = urlMatch[1].trim();
let KEY = keyMatch[1].trim();

// Limpiar comillas si las hay
if ((BASE_URL.startsWith('"') && BASE_URL.endsWith('"')) || (BASE_URL.startsWith("'") && BASE_URL.endsWith("'"))) {
  BASE_URL = BASE_URL.slice(1, -1);
}
if ((KEY.startsWith('"') && KEY.endsWith('"')) || (KEY.startsWith("'") && KEY.endsWith("'"))) {
  KEY = KEY.slice(1, -1);
}

// Extraer hostname limpio
const hostnameMatch = BASE_URL.match(/https?:\/\/([^\s\/]+)/i);
let HOSTNAME = hostnameMatch ? hostnameMatch[1].trim() : null;

if (!HOSTNAME) {
  console.error('❌ No pude extraer el hostname del URL:', BASE_URL);
  process.exit(1);
}

console.log('✅ URL base:', BASE_URL);
console.log('  Hostname limpio:', HOSTNAME);
console.log('🔑 Service Key: OK (longitud:', KEY.length, ')');
console.log('');

function insertPrecios(data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const options = {
      hostname: HOSTNAME, port: 443,
      path: '/rest/v1/precios',
      method: 'POST', headers: {
        'apikey': KEY, 'Authorization': `Bearer ${KEY}`,
        'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates'
      }, rejectUnauthorized: false
    };
    const req = https.request(options, res => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => {
        try { const parsed = JSON.parse(d); resolve(parsed); } catch { resolve(d); }
      });
    });
    req.on('error', reject); req.write(body); req.end();
  });
}

async function main() {
  console.log('🔍 Verificando conexión a Supabase...');
  try {
    const test = await new Promise((res, rej) => {
      const opts = { hostname: HOSTNAME, port: 443, path: '/rest/v1/precios?limit=1', method: 'GET',
        headers: { 'apikey': KEY, 'Authorization': `Bearer ${KEY}`, 'Accept': 'application/json' }, rejectUnauthorized: false };
      const r = https.request(opts, resp => { let d=''; resp.on('data',c=>d+=c); resp.on('end',()=>{try{res(JSON.parse(d))}catch{re(d)}}); });
      r.on('error', rej); r.end();
    });
    console.log('✅ Conexión OK.');
  } catch(e) { console.log('⚠️', e.message || e); }

  // Los 2 sellantes a insertar
  const sellantes = [
    { nombre: 'Sellante (Niños)', descripcion: 'Sellante de fosas y fisuras para niños — preventivo caries', precio: 50, categoria: 'Sellantes', etiquetas: 'niños, preventivo, caries, sellador' },
    { nombre: 'Sellante (Adultos)', descripcion: 'Sellante de fosas y fisuras para adultos — preventivo caries', precio: 50, categoria: 'Sellantes', etiquetas: 'adultos, preventivo, caries, sellador' }
  ];

  console.log(`\n📦 Insertando ${sellantes.length} sellantes a S/ 50...`);

  for (const s of sellantes) {
    try {
      const result = await insertPrecios([s]);
      console.log(`✅ ${s.nombre} — insertado (rpta: ${typeof result === 'string' ? result.slice(0,120) : JSON.stringify(result).slice(0,120)})`);
    } catch(err) {
      console.error(`❌ ${s.nombre} — ERROR:`, err.message || err);
    }
  }

  console.log('\n✅ Script completado.');
}

main().catch(e => { console.error('Error fatal:', e); process.exit(1); });
