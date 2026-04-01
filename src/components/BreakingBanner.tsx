import { decodeHtmlEntities } from "@/lib/utils";
import type { FeedItem } from "@/lib/types";

interface BreakingBannerProps {
  items: FeedItem[];
}

export function BreakingBanner({ items }: BreakingBannerProps) {
  if (!items.length) return null;

  const first = items[0];

  return (
    <div className="w-full bg-gradient-to-r from-dr-red via-dr-pink to-dr-purple">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 sm:px-6">
        {/* Breaking badge with radar icon */}
        <span className="flex shrink-0 items-center gap-1.5 animate-pulse">
          <svg
            className="h-4 w-4 text-white"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
            <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
            <line x1="12" y1="12" x2="18" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          </svg>
          <span className="text-xs font-black uppercase tracking-widest text-white">
            Breaking
          </span>
        </span>

        {/* Title */}
        <a
          href={first.url}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 flex-1 truncate text-sm font-bold text-white transition-opacity hover:opacity-80"
          aria-label={`Breaking news: ${first.title}`}
        >
          {decodeHtmlEntities(first.title)}
        </a>
      </div>
    </div>
  );
}
