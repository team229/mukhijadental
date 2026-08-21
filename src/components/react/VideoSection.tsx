import { useState, useRef } from "react";

interface Props {
  poster: string;
  videoSrc: string;
  label?: string;
  title: string;
  description: string;
}

export default function VideoSection({ poster, videoSrc, label, title, description }: Props) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePlay() {
    setPlaying(true);
    setTimeout(() => videoRef.current?.play(), 50);
  }

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          {label && <p className="text-accent font-semibold uppercase tracking-wide text-sm mb-3">{label}</p>}
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand mb-4">{title}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">{description}</p>
        </div>

        <div className="relative max-w-4xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl aspect-video bg-black border-4 border-accent/20 hover:border-accent/40 transition-all duration-300">
          {!playing ? (
            <button
              type="button"
              onClick={handlePlay}
              className="group absolute inset-0 w-full h-full cursor-pointer"
              aria-label="Play clinic video"
            >
              <img src={poster} alt="Clinic video thumbnail" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand/35 group-hover:bg-brand/45 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-accent hover:bg-accent-light text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 relative">
                  <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-25" />
                  <span className="text-3xl ml-1 relative z-10">▶</span>
                </div>
              </div>
            </button>
          ) : (
            <video
              ref={videoRef}
              src={videoSrc}
              controls
              className="w-full h-full"
              poster={poster}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </section>
  );
}
