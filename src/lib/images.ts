import type { ImageMetadata } from "astro";

// Native Astro batch-import of every image moved from public/images into
// src/assets/images. Keys are re-keyed to the original public-style path
// (e.g. "/images/clinic/foo.jpeg", with any "?v=2" cache-buster stripped)
// so existing string references keep working.
const modules = import.meta.glob(
  "/src/assets/images/**/*.{jpeg,jpg,png,webp,avif,gif}",
  { eager: true, import: "default" }
) as Record<string, ImageMetadata>;

function toPublicPath(path: string): string {
  return path.replace("/src/assets", "").split("?")[0];
}

export const imageAssets: Record<string, ImageMetadata> = {};
for (const [path, asset] of Object.entries(modules)) {
  imageAssets[toPublicPath(path)] = asset;
}

export function getAsset(path: string): ImageMetadata {
  const asset = imageAssets[path] ?? imageAssets[path.split("?")[0]];
  if (!asset) {
    throw new Error(`[getAsset] Image not found: ${path}`);
  }
  return asset;
}
