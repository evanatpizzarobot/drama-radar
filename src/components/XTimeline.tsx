"use client";

import { useEffect, useRef, useState } from "react";

export function XTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Read current theme
    const current = document.documentElement.getAttribute("data-theme") as "dark" | "light" | null;
    setTheme(current || "dark");

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const t = document.documentElement.getAttribute("data-theme") as "dark" | "light" | null;
      setTheme(t || "dark");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Load Twitter widget script
    const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // Re-render if script already loaded (theme change)
      const w = window as unknown as { twttr?: { widgets?: { load?: (el?: HTMLElement) => void } } };
      if (containerRef.current && w.twttr?.widgets?.load) {
        w.twttr.widgets.load(containerRef.current);
      }
    }
  }, [theme]);

  return (
    <div className="rounded-xl border border-dr-border bg-dr-surface/60 p-4">
      <div className="mb-3 flex items-center gap-2">
        <svg className="h-4 w-4 text-dr-text-muted" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <h3 className="text-sm font-bold text-dr-text">
          Latest from @DramaRadarHQ
        </h3>
      </div>
      <div ref={containerRef} className="overflow-hidden rounded-lg">
        <a
          className="twitter-timeline"
          href="https://twitter.com/DramaRadarHQ"
          data-height="400"
          data-theme={theme}
          data-chrome="noheader nofooter noborders transparent"
        >
          Loading tweets...
        </a>
      </div>
    </div>
  );
}
