interface AdUnitProps {
  slot: string;
  format?: string;
  className?: string;
}

export function AdUnit({ slot, format = "auto", className = "" }: AdUnitProps) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-lg border border-[#1A1A2E] bg-[#12121A] ${className}`}
      aria-label="Advertisement"
    >
      <ins
        className="adsbygoogle block w-full"
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID || ""}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      {/* Placeholder shown before ads initialize */}
      <noscript>
        <div className="flex h-24 w-full items-center justify-center text-xs text-[#555568]">
          Ad
        </div>
      </noscript>
    </div>
  );
}
