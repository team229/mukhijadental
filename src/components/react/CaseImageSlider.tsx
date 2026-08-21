import { useState, useEffect, useCallback } from "react";

interface Props {
  images: { src: string; alt: string }[];
}

export default function CaseImageSlider({ images }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => setCurrent((p) => (p + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const go = useCallback((dir: number) => {
    setCurrent((p) => (p + dir + images.length) % images.length);
  }, [images.length]);

  if (!images.length) return null;

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-slate-100">
        <img
          src={images[current].src}
          alt={images[current].alt}
          className="w-full h-full object-contain"
        />
      </div>
      {images.length > 1 && (
        <>
          <button type="button" onClick={() => go(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow hover:bg-white" aria-label="Previous">‹</button>
          <button type="button" onClick={() => go(1)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow hover:bg-white" aria-label="Next">›</button>
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <button key={i} type="button" onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all ${i === current ? "bg-accent w-6" : "bg-slate-300 w-2"}`} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
