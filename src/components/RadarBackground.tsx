"use client";

/**
 * RadarBackground - A full CSS radar scene illustration for the DramaRadar homepage.
 * Renders a large radar scope with concentric rings, a rotating sweep beam,
 * and gossip-themed blip icons (wine glass, diamond, rose, microphone, crown)
 * that pulse as the beam passes over them.
 *
 * Pure CSS animations, no JS runtime cost. Positioned as an absolute background
 * behind the hero/featured content area.
 */
export function RadarBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Radar scope container - centered, large */}
      <div className="absolute left-1/2 top-[625px] -translate-x-1/2 -translate-y-1/2">
        <div className="radar-scope relative h-[700px] w-[700px] sm:h-[800px] sm:w-[800px] lg:h-[900px] lg:w-[900px]">
          {/* Concentric rings */}
          <div className="radar-ring radar-ring-1" />
          <div className="radar-ring radar-ring-2" />
          <div className="radar-ring radar-ring-3" />
          <div className="radar-ring radar-ring-4" />

          {/* Crosshair lines */}
          <div className="radar-crosshair radar-crosshair-h" />
          <div className="radar-crosshair radar-crosshair-v" />

          {/* Center dot */}
          <div className="radar-center" />

          {/* Sweep beam */}
          <div className="radar-sweep-container">
            <div className="radar-sweep-beam" />
            <div className="radar-sweep-trail" />
          </div>

          {/* Blip: Wine Glass - top right area */}
          <div className="radar-blip" style={{ top: "18%", left: "68%" }}>
            <svg viewBox="0 0 24 24" className="radar-blip-icon">
              <path d="M8 2h8l-1 9H9L8 2z" fill="currentColor" opacity="0.8" />
              <path d="M12 11v6" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M9 17h6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          {/* Blip: Diamond - upper left */}
          <div className="radar-blip radar-blip-delay-1" style={{ top: "25%", left: "22%" }}>
            <svg viewBox="0 0 24 24" className="radar-blip-icon">
              <path d="M12 2L2 12l10 10 10-10L12 2z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 2l4 10-4 10-4-10 4-10z" fill="currentColor" opacity="0.3" />
            </svg>
          </div>

          {/* Blip: Rose - right center */}
          <div className="radar-blip radar-blip-delay-2" style={{ top: "42%", left: "78%" }}>
            <svg viewBox="0 0 24 24" className="radar-blip-icon">
              <circle cx="12" cy="10" r="5" fill="currentColor" opacity="0.5" />
              <path d="M12 15v7" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M10 10c0-3 2-5 2-5s2 2 2 5" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          {/* Blip: Microphone - bottom left */}
          <div className="radar-blip radar-blip-delay-3" style={{ top: "65%", left: "28%" }}>
            <svg viewBox="0 0 24 24" className="radar-blip-icon">
              <rect x="9" y="2" width="6" height="10" rx="3" fill="currentColor" opacity="0.6" />
              <path d="M5 10a7 7 0 0014 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M9 21h6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          {/* Blip: Crown - top center */}
          <div className="radar-blip radar-blip-delay-4" style={{ top: "12%", left: "45%" }}>
            <svg viewBox="0 0 24 24" className="radar-blip-icon">
              <path d="M2 18L5 8l5 4 2-6 2 6 5-4 3 10H2z" fill="currentColor" opacity="0.5" />
              <path d="M2 18h20" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          {/* Blip: Heart - bottom right */}
          <div className="radar-blip radar-blip-delay-5" style={{ top: "60%", left: "72%" }}>
            <svg viewBox="0 0 24 24" className="radar-blip-icon">
              <path d="M12 21C12 21 3 13.5 3 8.5 3 5.4 5.4 3 8.5 3c1.7 0 3.4.8 3.5 2.1C12.1 3.8 13.8 3 15.5 3 18.6 3 21 5.4 21 8.5 21 13.5 12 21 12 21z" fill="currentColor" opacity="0.5" />
            </svg>
          </div>

          {/* Blip: Star/sparkle - mid left */}
          <div className="radar-blip radar-blip-delay-6" style={{ top: "38%", left: "15%" }}>
            <svg viewBox="0 0 24 24" className="radar-blip-icon">
              <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7l2-7z" fill="currentColor" opacity="0.5" />
            </svg>
          </div>

          {/* Small dot blips for depth */}
          <div className="radar-dot" style={{ top: "30%", left: "55%" }} />
          <div className="radar-dot radar-dot-delay-1" style={{ top: "50%", left: "35%" }} />
          <div className="radar-dot radar-dot-delay-2" style={{ top: "70%", left: "60%" }} />
          <div className="radar-dot radar-dot-delay-3" style={{ top: "20%", left: "40%" }} />
          <div className="radar-dot radar-dot-delay-4" style={{ top: "55%", left: "50%" }} />
        </div>
      </div>

      {/* Gradient fade at bottom so content blends in */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{ background: "linear-gradient(to top, rgb(var(--dr-bg)), transparent)" }}
      />
    </div>
  );
}
