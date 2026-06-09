import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.resolve(__dirname, '../src/assets/images');

const MAX_WIDTH = 1600;
const QUALITY = 80;

const targets = ['.png', '.jpg', '.jpeg'];

const files = await readdir(imagesDir);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!targets.includes(ext)) continue;

  const input = path.join(imagesDir, file);
  const output = path.join(imagesDir, `${path.basename(file, ext)}.webp`);

  const before = (await stat(input)).size;

  await sharp(input)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(output);

  const after = (await stat(output)).size;

  console.log(
    `${file} -> ${path.basename(output)}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
  );
}

console.log('Done.');
