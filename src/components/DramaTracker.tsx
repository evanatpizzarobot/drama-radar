import { decodeHtmlEntities } from "@/lib/utils";
import type { TrendingData } from "@/lib/types";

interface DramaTrackerProps {
  data: TrendingData | null;
}

function TrendIndicator({ trend }: { trend: "up" | "down" | "stable" }) {
  if (trend === "up") {
    return (
      <span className="ml-1 text-[11px] text-[#00B894]" aria-label="Trending up">
        ▲
      </span>
    );
  }
  if (trend === "down") {
    return (
      <span className="ml-1 text-[11px] text-[#FF3838]" aria-label="Trending down">
        ▼
      </span>
    );
  }
  return (
    <span className="ml-1 text-[8px] text-[#555568]" aria-label="Stable">
      ●
    </span>
  );
}

export function DramaTracker({ data }: DramaTrackerProps) {
  if (!data) {
    return (
      <div className="rounded-xl border border-[#1A1A2E] bg-[#1A1A2E]/60 p-4">
        <p className="text-xs text-[#555568]">Loading drama tracker...</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#1A1A2E] bg-[#1A1A2E]/60 p-4">
      {/* Heading */}
      <div className="mb-4 flex items-center gap-2">
        <svg className="h-4 w-4 text-[#E84393]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
          <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
          <line x1="12" y1="12" x2="18" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        </svg>
        <h3 className="text-sm font-bold text-[#F5F5F5]">Drama Tracker</h3>
      </div>

      {/* Trending shows */}
      {data.topShows.length > 0 && (
        <div className="mb-4">
          <h4 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#A0A0B0]">
            Trending Shows
          </h4>
          <ul className="flex flex-col gap-1.5">
            {data.topShows.map((show) => (
              <li
                key={show.showTag}
                className="flex items-center justify-between rounded-lg bg-[#0D0D0F]/60 px-3 py-2"
              >
                <span className="text-xs font-semibold text-[#F5F5F5]">{show.label}</span>
                <span className="flex items-center text-[10px] text-[#A0A0B0]">
                  {show.mentionCount} mentions
                  <TrendIndicator trend={show.trend} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Trending people */}
      {data.topPeople.length > 0 && (
        <div className="mb-4">
          <h4 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#A0A0B0]">
            Trending People
          </h4>
          <ul className="flex flex-col gap-1.5">
            {data.topPeople.map((person) => (
              <li
                key={person.name}
                className="flex items-center justify-between rounded-lg bg-[#0D0D0F]/60 px-3 py-2"
              >
                <span className="text-xs font-semibold text-[#F5F5F5]">{person.name}</span>
                <span className="text-[10px] text-[#A0A0B0]">
                  {person.mentionCount} mentions
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hot story */}
      {data.hotStory && (
        <div className="rounded-lg border border-[#FF3838]/20 bg-[#FF3838]/5 p-3">
          <p className="mb-1 text-[10px] font-black uppercase tracking-wider text-[#FF3838]">
            Hot Story
          </p>
          <a
            href={data.hotStory.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold leading-snug text-[#F5F5F5] transition-colors duration-200 hover:text-[#E84393]"
          >
            {decodeHtmlEntities(data.hotStory.title)}
          </a>
          <p className="mt-1 text-[10px] text-[#555568]">{data.hotStory.source}</p>
        </div>
      )}
    </div>
  );
}
