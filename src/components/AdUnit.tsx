"use client";

/**
 * Flip ADSENSE_ACTIVE to true and fill in ADSENSE_PUB_ID once approved.
 */
const ADSENSE_ACTIVE = false;
const ADSENSE_PUB_ID = "";

type AdSlotType =
  | "leaderboard"
  | "sidebar"
  | "in-feed"
  | "mid-article"
  | "bottom-anchor"
  | "between-sections";

interface AdUnitProps {
  slot: AdSlotType;
  className?: string;
}

const SLOT_CONFIG: Record<
  AdSlotType,
  { width: string; height: string; hideOn?: "mobile" | "desktop"; format: string; style?: string }
> = {
  leaderboard: {
    width: "w-full",
    height: "h-[90px]",
    format: "horizontal",
  },
  sidebar: {
    width: "w-[300px]",
    height: "h-[250px]",
    hideOn: "mobile",
    format: "rectangle",
  },
  "in-feed": {
    width: "w-full",
    height: "h-[120px]",
    format: "fluid",
    style: "in-feed",
  },
  "mid-article": {
    width: "w-full",
    height: "h-[250px]",
    format: "auto",
  },
  "bottom-anchor": {
    width: "w-full",
    height: "h-[50px]",
    hideOn: "desktop",
    format: "auto",
  },
  "between-sections": {
    width: "w-full",
    height: "h-[90px]",
    format: "auto",
  },
};

export function AdUnit({ slot, className = "" }: AdUnitProps) {
  const config = SLOT_CONFIG[slot];

  const visibilityClass =
    config.hideOn === "mobile"
      ? "hidden lg:block"
      : config.hideOn === "desktop"
        ? "lg:hidden"
        : "";

  const wrapperClass = [
    config.width,
    config.height,
    visibilityClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (!ADSENSE_ACTIVE || !ADSENSE_PUB_ID) {
    return null;
  }

  // Active AdSense rendering
  return (
    <div className={`overflow-hidden ${wrapperClass}`} aria-label="Advertisement">
      <ins
        className="adsbygoogle block h-full w-full"
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot={slot}
        data-ad-format={config.format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

/**
 * Mobile-only sticky bottom anchor ad.
 * Rendered at the layout level, fixed to the bottom of the viewport.
 */
export function BottomAnchorAd() {
  const config = SLOT_CONFIG["bottom-anchor"];

  if (!ADSENSE_ACTIVE || !ADSENSE_PUB_ID) {
    return null; // Don't show placeholder for anchor ads
  }

  return (
    <div
      className="fixed bottom-0 left-0 z-40 w-full lg:hidden"
      aria-label="Advertisement"
    >
      <ins
        className="adsbygoogle block h-[50px] w-full"
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot="bottom-anchor"
        data-ad-format={config.format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
