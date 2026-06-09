const { join } = require('path');

/**
 * Mantém o Chromium dentro de node_modules/.cache para que o cache de build
 * do Netlify o reaproveite e o prerender funcione no deploy.
 */
module.exports = {
  cacheDirectory: join(__dirname, 'node_modules', '.cache', 'puppeteer'),
};
