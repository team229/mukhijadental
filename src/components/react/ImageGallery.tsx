import { useState, useEffect, useCallback } from "react";
import { clinicImages, galleryCategories, type ClinicImage } from "../../data/images";

interface ImageGalleryProps {
  images?: ClinicImage[];
  showFilters?: boolean;
  columns?: 2 | 3 | 4;
}

export default function ImageGallery({ images = clinicImages, showFilters = true, columns = 3 }: ImageGalleryProps) {
  const [filter, setFilter] = useState<string>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "all" ? images : images.filter((img) => img.category === filter);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const goNext = useCallback(() => {
    setLightbox((prev) => (prev !== null ? (prev + 1) % filtered.length : null));
  }, [filtered.length]);
  const goPrev = useCallback(() => {
    setLightbox((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null));
  }, [filtered.length]);

  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, closeLightbox, goNext, goPrev]);

  const colClass = { 2: "grid-cols-1 sm:grid-cols-2", 3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", 4: "grid-cols-2 lg:grid-cols-4" }[columns];

  return (
    <>
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat.id
                  ? "bg-accent text-white"
                  : "bg-surface text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      <div className={`grid ${colClass} gap-4`}>
        {filtered.map((img, index) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setLightbox(index)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/30 transition-colors flex items-end">
              <p className="text-white text-sm font-medium p-3 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                {img.alt}
              </p>
            </div>
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl z-10"
            aria-label="Close"
          >
            ×
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl z-10 p-2"
            aria-label="Previous"
          >
            ‹
          </button>
          <div className="max-w-5xl max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <p className="text-white/80 text-center mt-3 text-sm">{filtered[lightbox].alt}</p>
            <p className="text-white/50 text-center text-xs mt-1">{lightbox + 1} / {filtered.length}</p>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl z-10 p-2"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
