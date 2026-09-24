import { chromium } from 'playwright';

async function runTest() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));
  
  console.log('🔍 Abriendo landing...');
  await page.goto('http://localhost:5173/');
  await page.waitForLoadState('networkidle');
  
  const title = await page.title();
  console.log('📌 Título:', title);
  
  console.log('🔍 Buscando elementos clave...');
  const hero = await page.locator('h1');
  const heroText = await hero.textContent();
  console.log('📌 Título principal:', heroText);
  
  const botonesReservar = await page.locator('button:has-text("Reservar"), a:has-text("Reservar"), button:has-text("Agendar")').count();
  console.log('📌 Botones de reservar:', botonesReservar);
  
  const formulario = await page.locator('form, input[type="tel"], input[type="email"]').count();
  console.log('📌 Elementos de formulario:', formulario);
  
  if (errors.length > 0) {
    console.log('🚨 Errorres de consola:');
    errors.forEach(e => console.log('   -', e));
    process.exit(1);
  }
  
  console.log('✅ Landing OK - sin errores de consola');
  await browser.close();
  process.exit(0);
}

runTest().catch(e => { console.error('❌ Test falló:', e.message); process.exit(1); });
