import { copyFileSync, existsSync } from 'node:fs';

if (!existsSync('dist/index.html')) {
  throw new Error('dist/index.html not found. Run Vite build first.');
}

copyFileSync('dist/index.html', 'dist/404.html');

console.log('SPA fallback created: dist/404.html');