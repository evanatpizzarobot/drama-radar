import Link from "next/link";
import { SHOW_TAGS } from "@/lib/constants";
import { DramaTracker } from "./DramaTracker";
import { AdUnit } from "./AdUnit";
import type { TrendingData } from "@/lib/types";

interface SidebarProps {
  trending: TrendingData | null;
}

const QUICK_SHOWS = Object.values(SHOW_TAGS).slice(0, 8);

export function Sidebar({ trending }: SidebarProps) {
  return (
    <aside className="hidden w-80 shrink-0 flex-col gap-5 lg:flex" aria-label="Sidebar">
      {/* Drama Tracker */}
      <DramaTracker data={trending} />

      {/* Sidebar ad */}
      <div className="sticky top-20">
        <AdUnit slot="sidebar" />
      </div>

      {/* Show Hub quick links */}
      <div className="rounded-xl border border-[#1A1A2E] bg-[#1A1A2E]/60 p-4">
        <h3 className="mb-3 text-sm font-bold text-[#F5F5F5]">Show Hub</h3>
        <div className="flex flex-wrap gap-2">
          {QUICK_SHOWS.map((show) => (
            <Link
              key={show.tag}
              href={`/shows/${show.tag}`}
              className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: `${show.color}20`,
                color: show.color,
              }}
            >
              {show.label}
            </Link>
          ))}
        </div>
        <Link
          href="/shows"
          className="mt-3 block text-[10px] font-semibold text-[#E84393] transition-opacity hover:opacity-80"
        >
          View all shows &rarr;
        </Link>
      </div>

      {/* About blurb */}
      <div className="rounded-xl border border-[#1A1A2E] bg-[#1A1A2E]/60 p-4">
        <h3 className="mb-2 text-sm font-bold text-[#F5F5F5]">About DramaRadar</h3>
        <p className="text-xs leading-relaxed text-[#A0A0B0]">
          Your real-time scanner for reality TV news, celebrity gossip, and Bravo drama.
          We aggregate stories from top sources so you never miss a moment.
        </p>
        <Link
          href="/about"
          className="mt-2 inline-block text-[10px] font-semibold text-[#E84393] transition-opacity hover:opacity-80"
        >
          Learn more &rarr;
        </Link>
      </div>
    </aside>
  );
}
