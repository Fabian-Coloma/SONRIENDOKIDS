import { chromium } from 'playwright';

(async () => {
  console.log('🔓 Abriendo navegador visible...');
  const browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  try {
    console.log('🌐 Navegando a landing...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('✅ Landing cargada');
    console.log('📌 Título:', await page.title());
    
    console.log('\n⏳ ESPERANDO 8 segundos - VE EL NAVEGADOR (no cierres la ventana)');
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    console.log('\n🔍 Capturando elementos...');
    const title = await page.locator('h1').first().textContent().catch(() => 'no encontrado');
    console.log('📌 H1:', title);
    
    const btn = await page.getByRole('button', { name: /reservar|agendar|cita|dar/i }).count();
    console.log('📌 Botones de cita/reservar:', btn);
    
    console.log('\n✅ LISTO - navegador cerrado');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  await browser.close();
})();
