"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SHOW_TAGS } from "@/lib/constants";
import { fetchFeed } from "@/lib/api";
import { FeedList } from "@/components/FeedList";
import { AdUnit } from "@/components/AdUnit";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShowSchema, BreadcrumbSchema } from "@/components/StructuredData";
import { SITE_URL } from "@/lib/constants";
import type { FeedItem } from "@/lib/types";

interface ShowHubClientProps {
  showTag: string;
}

function ShowFeedSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-dr-border bg-dr-surface/60 p-4"
        >
          <div className="mb-2 h-2.5 w-20 rounded bg-dr-surface-hover" />
          <div className="mb-1.5 h-4 w-3/4 rounded bg-dr-surface-hover" />
          <div className="mb-1 h-3 w-full rounded bg-dr-surface-hover" />
          <div className="mb-3 h-3 w-2/3 rounded bg-dr-surface-hover" />
          <div className="flex gap-2">
            <div className="h-5 w-14 rounded-full bg-dr-surface-hover" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ShowHubClient({ showTag }: ShowHubClientProps) {
  const showDef = SHOW_TAGS[showTag];

  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!showDef) {
      setLoading(false);
      return;
    }

    async function loadShowFeed() {
      setLoading(true);
      const res = await fetchFeed({ show: showTag, limit: 20 });
      setFeedItems(res.items);
      setLoading(false);
    }

    loadShowFeed();
  }, [showTag, showDef]);

  // Show not found state
  if (!showDef) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
        <div className="mx-auto max-w-md">
          <h1 className="mb-3 text-2xl font-extrabold text-dr-text">
            Show Not Found
          </h1>
          <p className="mb-6 text-sm text-dr-text-muted">
            We could not find a show with that tag. It may have been removed or the URL may be incorrect.
          </p>
          <Link
            href="/shows"
            className="inline-block rounded-full bg-dr-pink px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Browse All Shows
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Show header */}
      <div className="mb-8">
        {/* Color accent bar */}
        <div
          className="mb-6 h-1.5 w-full rounded-full"
          style={{ backgroundColor: showDef.color }}
        />

        {/* Structured data */}
        <ShowSchema show={showDef} />
        <BreadcrumbSchema items={[
          { name: "Home", url: SITE_URL },
          { name: "Shows", url: `${SITE_URL}/shows` },
          { name: showDef.fullName, url: `${SITE_URL}/shows/${showTag}` },
        ]} />

        {/* Breadcrumb */}
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Shows", href: "/shows" },
          { label: showDef.fullName },
        ]} />

        {/* Show pill, status, and title */}
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider"
            style={{
              backgroundColor: `${showDef.color}20`,
              color: showDef.color,
            }}
          >
            {showDef.label}
          </span>
          {showDef.status === "airing" && (
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Now Airing
            </span>
          )}
          {showDef.status === "upcoming" && (
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Upcoming
            </span>
          )}
          {showDef.status === "between-seasons" && (
            <span className="rounded-full bg-dr-text-dim/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-dr-text-dim">
              Between Seasons
            </span>
          )}
        </div>
        <h1 className="mt-3 text-3xl font-extrabold text-dr-text">
          {showDef.fullName}
        </h1>

        {/* Air schedule */}
        {showDef.airDay && (
          <p className="mt-1 text-xs font-medium text-dr-text-muted">
            {showDef.airDay} on {showDef.network}
            {showDef.currentSeason ? ` \u00B7 Season ${showDef.currentSeason}` : ""}
          </p>
        )}
        {!showDef.airDay && showDef.currentSeason && (
          <p className="mt-1 text-xs font-medium text-dr-text-muted">
            {showDef.network} \u00B7 Season {showDef.currentSeason}
          </p>
        )}

        {/* Intro paragraph */}
        <p className="mt-3 text-sm leading-relaxed text-dr-text-muted">
          {showDef.intro}
        </p>
      </div>

      {/* Leaderboard ad */}
      <div className="mb-6">
        <AdUnit slot="leaderboard" />
      </div>

      {/* Feed */}
      {loading ? (
        <ShowFeedSkeleton />
      ) : (
        <FeedList initialItems={feedItems} showTag={showTag} />
      )}
    </div>
  );
}
