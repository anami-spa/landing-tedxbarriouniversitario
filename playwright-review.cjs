/**
 * Revisión visual por sección — TEDxBarrioUniversitario
 * Captura screenshots de cada sección en 1280px para comparar contra WEB.pdf
 */
const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots-review');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR);

const SECTIONS = [
  { id: 'inicio',        label: 'S1-hero' },
  { id: 'equipo',        label: 'S2-colaboracion' },
  { id: 'que-es-tedx',  label: 'S3-que-es-tedx' },
  { id: 'tedxwomen',    label: 'S4-por-que-tedxwomen' },
  { id: 'concepto',     label: 'S5-alzar-el-vuelo' },
  { id: 'evento',       label: 'S6-ficha-tecnica' },
  { id: 'auspiciadores', label: 'S7-auspiciador' },
  { id: 'beneficios',   label: 'S8-beneficios' },
  { id: 'speakers',     label: 'S9-convocatoria' },
  { id: 'partners',     label: 'S10-partners' },
  { id: 'contacto',     label: 'S11-contacto' },
];

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

  // Pre-scroll por TODA la página para activar todos los IntersectionObservers
  // (scroll reveal, count-up counters, etc.)
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const steps = Math.ceil(pageHeight / 600);
  for (let i = 0; i <= steps; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * 600);
    await page.waitForTimeout(80);
  }
  // Volver al inicio
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // Captura full-page completa
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '00-fullpage.png'),
    fullPage: true,
  });
  console.log('✅ Full-page screenshot guardado');

  // Captura de cada sección individualmente (con animaciones ya activas)
  for (const section of SECTIONS) {
    const el = await page.$(`#${section.id}`);
    if (!el) {
      console.log(`⚠️  #${section.id} no encontrado`);
      continue;
    }
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200); // esperar transiciones CSS (0.6s típico)

    await el.screenshot({
      path: path.join(SCREENSHOTS_DIR, `${section.label}.png`),
    });
    console.log(`✅ ${section.label}`);
  }

  // Footer
  const footer = await page.$('footer');
  if (footer) {
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await footer.screenshot({ path: path.join(SCREENSHOTS_DIR, 'S12-footer.png') });
    console.log('✅ S12-footer');
  }

  await browser.close();
  console.log(`\n📁 Screenshots en: ${SCREENSHOTS_DIR}`);
})();
