import { useState } from "react";
import { MapPin, Clock, Play, X, ChevronRight } from "lucide-react";
import { videoTestimonials } from "../../data/videoTestimonials";

export default function VideoTestimonialGrid() {
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = videoTestimonials[selected];

  function selectItem(index: number) {
    if (index === selected) {
      setPlaying(true);
      return;
    }
    setSelected(index);
    setPlaying(true);
  }

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-accent font-semibold uppercase tracking-wide text-sm mb-3">Real Patients · Real Stories</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand mb-4">Hear It From Our Patients</h2>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Watch real patients talk about their experience at Mukhija Dental Clinic — in their own words, on camera.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Featured player */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="relative mx-auto h-[62vh] sm:h-[66vh] lg:h-[70vh] w-auto aspect-[9/16] max-w-full rounded-[2rem] overflow-hidden shadow-2xl bg-black border-4 border-accent/20">
              {playing ? (
                <video
                  key={selected}
                  src={current.videoSrc}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                  poster={current.poster}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 w-full h-full cursor-pointer"
                  aria-label={`Play testimonial from ${current.name}`}
                >
                  <img
                    src={current.poster}
                    alt={`${current.name} testimonial video`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-brand/30 group-hover:bg-brand/40 transition-colors" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-accent hover:bg-accent-light text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 relative">
                      <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-25" />
                      <Play className="w-8 h-8 ml-1 relative z-10 fill-current" />
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-1">Patient Testimonial</p>
                    <p className="font-display text-2xl font-bold text-white">{current.name}</p>
                  </div>
                </button>
              )}

              {playing && (
                <>
                  <button
                    type="button"
                    onClick={() => setPlaying(false)}
                    className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                    aria-label="Close video"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/75 to-transparent">
                    <p className="font-display text-lg font-bold text-white">{current.name}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Playlist */}
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-4">Choose a story</p>
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-4 lg:mx-0 px-4 lg:px-0">
              {videoTestimonials.map((t, i) => {
                const active = i === selected;
                return (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => selectItem(i)}
                    className={`group flex-none lg:flex-1 lg:w-full w-[80%] flex items-center gap-4 p-3 rounded-2xl border text-left transition-all duration-300 ${
                      active
                        ? "border-accent bg-accent/5 shadow-lg shadow-accent/10"
                        : "border-slate-200 bg-surface hover:border-accent/40 hover:bg-brand-dark/[0.02]"
                    }`}
                  >
                    <div className="relative flex-none w-20 aspect-[9/16] rounded-xl overflow-hidden bg-black shadow-md">
                      <img
                        src={t.poster}
                        alt={`${t.name} thumbnail`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-white/90 text-brand-dark flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-4 h-4 ml-0.5 fill-current" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 px-1.5 rounded bg-black/60 text-white text-[10px] font-medium">
                        {t.duration}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display font-bold text-brand-dark truncate">{t.name}</p>
                      <p className="text-sm text-accent font-medium truncate">{t.treatment}</p>
                      <p className="text-xs text-slate-500 inline-flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 flex-none" /> {t.location}
                      </p>
                    </div>
                    <ChevronRight
                      className={`flex-none w-5 h-5 transition-colors ${
                        active ? "text-accent" : "text-slate-300 group-hover:text-accent"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl bg-surface border border-slate-100 p-4 flex items-start gap-3">
              <Clock className="w-5 h-5 text-accent flex-none mt-0.5" />
              <p className="text-sm text-slate-600 leading-relaxed">
                These are real, unfiltered experiences shared by our patients. Tap a story to watch, then book your own visit with us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
