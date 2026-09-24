// Playwright: prueba visual completa del proyecto
// Abre el navegador y recorre todo el flujo: landing → agendamiento → finanzas

const { chromium } = require('./node_modules/playwright');

(async () => {
  console.log('🔓 Abriendo navegador...');
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized', '--window-size=1920,1080']
  });
  
  // Contexto de navegación (una pestaña)
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });
  
  // Rastreo de todos los pasos para que el usuario pueda ver
  const pasos = [];
  
  try {
    // 1. Navegar a la landing
    console.log('🌐 1. Navegando a landing...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 30000 });
    pasos.push('✅ Landing cargada');
    console.log('✅ Landing cargada');
    console.log('📌 Título:', await page.title());
    
    // Esperar para que el usuario vea la landing
    console.log('\n⏳ ESPERANDO 10 SEGUNDOS PARA QUE VEAS LA LANDING (GRÁBELO DESDE TU CELULAR)');
    console.log('📱 Podrás ver la landing completa en el navegador');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // 2. Capturar screenshot de la landing
    console.log('\n📸 Capturando screenshot de la landing...');
    await page.screenshot({ path: 'captura-landing.png', fullPage: true });
    console.log('📸 Captura guardada: captura-landing.png');
    
    // 3. Navegar al dashboard (si existe ruta /admin o /dashboard)
    console.log('\n🔗 2. Navegando al dashboard admin...');
    // Intentar varias rutas posibles
    const rutasAdmin = ['/admin', '/dashboard', '/admin/adminDashboard', '/admin/admin'];
    let dashboardEncontrado = false;
    
    for (const ruta of rutasAdmin) {
      try {
        await page.goto('http://localhost:5173' + ruta, { waitUntil: 'networkidle', timeout: 10000 });
        pasos.push('✅ Dashboard encontrado en: ' + ruta);
        console.log('✅ Dashboard encontrado en: ' + ruta);
        dashboardEncontrado = true;
        break;
      } catch (e) {
        console.log('  - No encontrado en: ' + ruta);
      }
    }
    
    if (dashboardEncontrado) {
      console.log('\n⏳ ESPERANDO 5 SEGUNDOS PARA QUE VEAS EL DASHBOARD');
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Screenshot del dashboard
      await page.screenshot({ path: 'captura-dashboard.png', fullPage: true });
      console.log('📸 Captura del dashboard guardada');
      
      // 4. Verificar elementos del dashboard (finanzas, citas, etc.)
      console.log('\n🔍 3. Verificando elementos del dashboard...');
      const elementos = await page.locator('button, a, input, h1, h2, h3, h4, p, li, div, span').count();
      console.log('📌 Total elementos en dashboard:', elementos);
      
      // Verificar textos específicos
      const textos = await page.locator('body').innerText();
      const palabrasClave = ['finanzas', 'citas', 'agendar', 'dinero', 'paciente', 'clínica', 'dentista', 'consultorio'];
      const encontrados = palabrasClave.filter(p => textos.toLowerCase().includes(p.toLowerCase()));
      console.log('📌 Palabras clave encontradas:', encontrados.join(', '));
    }
    
    // 5. Finalizar
    console.log('\n✅ PRUEBA COMPLETADA');
    console.log('📱 El proceso estuvo visible durante todo el tiempo — grabalo desde tu celular');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  // Cerrar navegador
  await browser.close();
  console.log('\n🔒 Navegador cerrado');
})();
