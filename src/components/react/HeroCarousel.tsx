import { useState, useEffect, useCallback } from "react";
import { heroSlides, type HeroSlide } from "../../data/images";

interface Props {
  slides?: HeroSlide[];
}

export default function HeroCarousel({ slides = heroSlides }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.subtitle}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand/90 via-brand/70 to-brand/40" />
          <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
            <div className="max-w-2xl text-white">
              <p className="text-accent-light font-medium mb-2 tracking-wide uppercase text-sm">{slide.subtitle}</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">{slide.title}</h1>
              <p className="text-lg text-white/85 mb-8 leading-relaxed">{slide.description}</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={slide.ctaLink}
                  className="inline-flex px-8 py-3.5 bg-white text-brand font-semibold rounded-full hover:bg-surface transition-colors shadow-lg"
                >
                  {slide.cta}
                </a>
                <a
                  href="/services/"
                  className="inline-flex px-8 py-3.5 border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
                >
                  View Treatments
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrent(index)}
            className={`h-3 rounded-full transition-all ${
              index === current ? "bg-white w-8" : "bg-white/40 hover:bg-white/60 w-3"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
