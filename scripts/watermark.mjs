#!/usr/bin/env node
/**
 * Post-build watermarker.
 *
 * Walks the built `dist/` directory and stamps the Mukhija brand logo onto
 * every raster photo/image so the watermark is baked into the actual files
 * (also visible in full-screen lightbox views).
 *
 * Excluded (never watermarked):
 *   - site's own brand assets (logo*, favicon*, apple-touch-icon*)
 *   - videos / audio (.mp4, .webm, .mov, .mp3)
 *
 * Placement: logo scaled to ~15% of the target image width, 50% opacity,
 * anchored to the bottom-right corner with a small margin.
 *
 * Usage:  node scripts/watermark.mjs [distDir]
 *         (defaults to ./dist)
 */
import { readFile, readdir, stat, writeFile, mkdir } from "node:fs/promises";
import { extname, join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = dirname(fileURLToPath(import.meta.url));
const distDir = process.argv[2]
  ? (process.argv[2].startsWith("/")
      ? process.argv[2]
      : join(process.cwd(), process.argv[2]))
  : join(ROOT, "..", "dist");
const LOGO_PATH = join(ROOT, "mukhija-watermark-logo.webp");

// Tuning knobs
const WIDTH_RATIO = 0.15; // watermark width = 15% of image width
const OPACITY = 0.5; // 50% opacity
const MARGIN = 0.02; // 2% of image dimensions (min ~15px)

const IMAGE_EXT = new Set([".jpeg", ".jpg", ".png", ".webp", ".avif"]);
const SKIP_NAMES = /^(logo|favicon|apple-touch-icon)/i;
const SKIP_EXT = new Set([".mp4", ".webm", ".mov", ".mp3", ".ogg"]);

async function *walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield * walk(full);
    } else {
      yield full;
    }
  }
}

let logoBuffer;
let logoMeta;
async function getLogo() {
  if (!logoBuffer) {
    logoBuffer = await readFile(LOGO_PATH);
    logoMeta = await sharp(logoBuffer).metadata();
  }
  return logoMeta;
}

async function watermarkedBuffer(srcPath) {
  const meta = await sharp(srcPath).metadata();
  const width = meta.width || 1200;

  await getLogo();

  const wmWidth = Math.max(48, Math.round(width * WIDTH_RATIO));
  const wmHeight = Math.round((wmWidth / logoMeta.width) * logoMeta.height);
  const margin = Math.max(12, Math.round(Math.min(width, meta.height || width) * MARGIN));

  const overlay = await sharp(logoBuffer)
    .resize(wmWidth, wmHeight, { fit: "inside" })
    .composite([
      {
        input: Buffer.from([
          255, 255, 255, Math.round(OPACITY * 255),
        ]),
        raw: { width: 1, height: 1, channels: 4 },
        tile: true,
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

  return sharp(srcPath)
    .composite([
      {
        input: overlay,
        gravity: "southeast",
        left: margin,
        top: margin,
      },
    ])
    .toBuffer();
}

async function main() {
  const baseStats = await stat(distDir).catch(() => null);
  if (!baseStats || !baseStats.isDirectory()) {
    console.error(`dist directory not found: ${distDir}`);
    process.exit(1);
  }

  let processed = 0;
  for await (const file of walk(distDir)) {
    const ext = extname(file).toLowerCase();
    const name = basename(file);

    if (SKIP_EXT.has(ext) || SKIP_NAMES.test(name)) {
      continue;
    }
    if (!IMAGE_EXT.has(ext)) {
      continue;
    }

    const src = await readFile(file).catch(() => null);
    if (!src) continue;

    const out = await watermarkedBuffer(file);
    if (out && !out.equals(src)) {
      await writeFile(file, out);
      processed++;
      if (processed % 10 === 0) console.log(`  watermarking... ${processed}`);
    }
  }

  console.log(`Watermarked ${processed} images in ${distDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
