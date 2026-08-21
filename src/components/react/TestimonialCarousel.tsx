import { useState, useEffect } from "react";
import { testimonials } from "../../data/site";

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-slate-100 min-h-[220px]">
        <div className="flex gap-1 mb-4">
          {Array.from({ length: t.rating }).map((_, i) => (
            <span key={i} className="text-yellow-400 text-xl">★</span>
          ))}
        </div>
        <p className="text-slate-600 text-lg leading-relaxed mb-6 italic">"{t.text}"</p>
        <div>
          <p className="font-semibold text-brand-dark">{t.name}</p>
          <p className="text-sm text-muted">{t.location}</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          type="button"
          onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
          className="p-2 rounded-full border border-slate-200 hover:bg-surface transition-colors"
          aria-label="Previous testimonial"
        >
          ←
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-accent w-6" : "bg-slate-300"}`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
          className="p-2 rounded-full border border-slate-200 hover:bg-surface transition-colors"
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>
    </div>
  );
}
