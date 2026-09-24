const { chromium } = require('./node_modules/playwright');
(async () => {
  console.log('🔓 Abriendo navegador visible...');
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized', '--window-size=1920,1080']
  });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });
  try {
    console.log('🌐 Navegando a http://localhost:5173/ ...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('✅ Landing cargada exitosamente');
    console.log('📌 Título:', await page.title());

    console.log('\n⏳ ESPERANDO 10 SEGUNDOS — VE EL NAVEGADOR (NO LO CIERRES)');
    console.log('📱 Tú puedes grabar la pantalla desde tu celular ahora');
    await new Promise(resolve => setTimeout(resolve, 10000));

    console.log('\n🔍 Verificando contenido...');
    const h1 = await page.locator('h1').first().textContent().catch(() => 'no encontrado');
    console.log('📌 H1 principal:', h1);

    const botones = await page.locator('button').count();
    console.log('📌 Total botones:', botones);

    const enlaces = await page.locator('a').count();
    console.log('📌 Total enlaces:', enlaces);

    await page.screenshot({ path: 'captura-landing.png', fullPage: true });
    console.log('📸 Captura guardada en: captura-landing.png');

    console.log('\n✅ PRUEBA COMPLETADA');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  await browser.close();
})();
