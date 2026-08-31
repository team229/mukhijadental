import { useState, useRef, type MouseEvent, type TouchEvent } from "react";

interface Props {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before (Spacing & Alignment Issues)",
  afterLabel = "After (Perfect Smile Makeover)"
}: Props) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDraggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDraggingRef.current) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-3xl mx-auto aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white select-none cursor-ew-resize bg-slate-900 touch-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={() => { isDraggingRef.current = true; }}
      onTouchStart={() => { isDraggingRef.current = true; }}
      onMouseUp={() => { isDraggingRef.current = false; }}
      onMouseLeave={() => { isDraggingRef.current = false; }}
      onTouchEnd={() => { isDraggingRef.current = false; }}
      onTouchCancel={() => { isDraggingRef.current = false; }}
    >
      {/* After Image (Background) */}
      <img 
        src={afterImage} 
        alt="After Treatment" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
      />
      <div className="absolute right-4 bottom-4 bg-emerald-600/90 backdrop-blur-sm text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-lg shadow-md z-20 uppercase tracking-wider">
        {afterLabel}
      </div>

      {/* Before Image (Foreground, clipped) */}
      <img 
        src={beforeImage} 
        alt="Before Treatment" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      />
      <div 
        className="absolute left-4 bottom-4 bg-brand/90 backdrop-blur-sm text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-lg shadow-md z-20 uppercase tracking-wider transition-opacity duration-200"
        style={{ opacity: sliderPosition > 15 ? 1 : 0 }}
      >
        {beforeLabel}
      </div>

      {/* Slider Line & Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 shadow-2xl"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-accent hover:bg-accent-light text-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white transition-all duration-150 scale-100 hover:scale-110 active:scale-95">
          <span className="text-xl font-bold select-none">↔</span>
        </div>
      </div>
    </div>
  );
}
