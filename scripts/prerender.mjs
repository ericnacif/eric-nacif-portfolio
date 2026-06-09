import { preview } from 'vite';
import puppeteer from 'puppeteer';
import { writeFileSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Rotas a serem pré-renderizadas (a 404 fica como SPA / noindex).
const ROUTES = ['/'];

const log = (msg) => console.log(`[prerender] ${msg}`);

const run = async () => {
  const server = await preview({
    root,
    preview: { port: 4179, host: '127.0.0.1' },
    logLevel: 'warn',
  });

  const base = server.resolvedUrls?.local?.[0] || 'http://127.0.0.1:4179/';
  log(`preview em ${base}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      const url = new URL(route, base).href;

      await page.goto(url, { waitUntil: 'networkidle0', timeout: 45000 });
      // Garante que as seções lazy (About/Projects/Footer) já montaram.
      await page.waitForSelector('footer#contato', { timeout: 30000 });

      const html = await page.content();

      const fileName = route === '/' ? 'index.html' : `${route.replace(/^\/+|\/+$/g, '')}.html`;
      const outPath = resolve(root, 'dist', fileName);
      writeFileSync(outPath, html, 'utf8');

      // Remove versões comprimidas obsoletas (geradas antes do prerender).
      for (const ext of ['.br', '.gz']) {
        rmSync(`${outPath}${ext}`, { force: true });
      }

      log(`gerado ${fileName} (${(html.length / 1024).toFixed(1)} kB)`);

      await page.close();
    }
  } finally {
    await browser.close();
    await server.httpServer?.close();
  }
};

run()
  .then(() => {
    log('concluído');
    process.exit(0);
  })
  .catch((err) => {
    console.error('[prerender] FALHOU:', err);
    process.exit(1);
  });
