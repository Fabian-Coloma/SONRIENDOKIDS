import { chromium } from 'playwright';

(async () => {
  console.log('🔓 Abriendo navegador visible...');
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized', '--window-size=1920,1080']
  });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  try {
    console.log('🌐 Navegando a landing page...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('✅ Landing cargada');
    console.log('📌 Título:', await page.title());
    
    console.log('\n⏳ Esperando 5 segundos para que veas la landing...');
    await page.waitForTimeout(5000);
    
    console.log('\n🔍 Capturando elementos clave...');
    const heroTitle = await page.locator('h1').first().textContent().catch(() => 'no encontrado');
    console.log('📌 Título hero:', heroTitle);
    
    const btnReservar = await page.getByRole('button', { name: /reservar|agendar|cita/i }).count();
    console.log('📌 Botones de reservar/agendar:', btnReservar);
    
    const inputs = await page.locator('input').count();
    console.log('📌 Total inputs en la página:', inputs);
    
    console.log('\n✅ Landing verificada correctamente');
    
  } catch (error) {
    console.error('❌ Error navegando landing:', error.message);
  }
  
  console.log('\n🔒 El navegador se queda abierto hasta que presiones Enter...');
  await new Promise(resolve => process.stdin.on('data', resolve));
  await browser.close();
  console.log('🔒 Navegador cerrado');
})();
