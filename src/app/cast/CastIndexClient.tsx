"use client";

import { useState, useEffect, useMemo } from "react";
import { SHOW_TAGS } from "@/lib/constants";
import { fetchCast } from "@/lib/api";
import { CastCard } from "@/components/CastCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { SITE_URL } from "@/lib/constants";
import { AdUnit } from "@/components/AdUnit";
import type { CastMember } from "@/lib/types";

function CastSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-dr-border bg-dr-surface/60 p-4"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-16 w-16 rounded-full bg-dr-surface-hover" />
            <div className="flex-1">
              <div className="mb-2 h-4 w-2/3 rounded bg-dr-surface-hover" />
              <div className="h-3 w-1/3 rounded bg-dr-surface-hover" />
            </div>
          </div>
          <div className="mb-1 h-3 w-full rounded bg-dr-surface-hover" />
          <div className="mb-1 h-3 w-5/6 rounded bg-dr-surface-hover" />
          <div className="h-3 w-2/3 rounded bg-dr-surface-hover" />
        </div>
      ))}
    </div>
  );
}

export function CastIndexClient() {
  const [allCast, setAllCast] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeShow, setActiveShow] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetchCast({ limit: 500 });
      setAllCast(res.cast);
      setLoading(false);
    }
    load();
  }, []);

  // Get shows that have cast members
  const showsWithCast = useMemo(() => {
    const showSet = new Set<string>();
    allCast.forEach((m) => m.shows.forEach((s) => showSet.add(s)));
    return Array.from(showSet)
      .map((tag) => ({
        tag,
        label: SHOW_TAGS[tag]?.label || tag,
        color: SHOW_TAGS[tag]?.color || "#888",
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [allCast]);

  const filteredCast = useMemo(() => {
    let result = allCast;

    if (activeShow !== "all") {
      result = result.filter((m) => m.shows.includes(activeShow));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.displayName.toLowerCase().includes(q) ||
          m.fullName.toLowerCase().includes(q) ||
          m.bio.toLowerCase().includes(q) ||
          m.hometown.toLowerCase().includes(q)
      );
    }

    return result;
  }, [allCast, activeShow, searchQuery]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Cast", url: `${SITE_URL}/cast` },
        ]}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cast" }]} />

      {/* Page header */}
      <div className="mb-8">
        <div className="mb-4 h-1.5 w-full rounded-full bg-gradient-to-r from-dr-pink to-dr-purple" />
        <h1 className="text-3xl font-extrabold text-dr-text">
          Cast Members
        </h1>
        <p className="mt-2 text-sm text-dr-text-muted">
          Every reality TV cast member tracked by DramaRadar. Full profiles, show history, key
          storylines, and social links.
        </p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search cast members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-dr-border bg-dr-surface px-4 py-2.5 text-sm text-dr-text placeholder-dr-text-dim outline-none transition-colors focus:border-dr-pink"
        />
      </div>

      {/* Show filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveShow("all")}
          className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
            activeShow === "all"
              ? "bg-dr-pink text-white"
              : "bg-dr-surface text-dr-text-muted hover:bg-dr-surface-hover"
          }`}
        >
          All ({allCast.length})
        </button>
        {showsWithCast.map((show) => (
          <button
            key={show.tag}
            onClick={() => setActiveShow(show.tag)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
              activeShow === show.tag
                ? "text-white"
                : "text-dr-text-muted hover:bg-dr-surface-hover"
            }`}
            style={
              activeShow === show.tag
                ? { backgroundColor: show.color }
                : { backgroundColor: `${show.color}15` }
            }
          >
            {show.label}
          </button>
        ))}
      </div>

      {/* Leaderboard ad */}
      <div className="mb-6">
        <AdUnit slot="leaderboard" />
      </div>

      {/* Results count */}
      {!loading && (
        <p className="mb-4 text-xs text-dr-text-dim">
          {filteredCast.length} cast member{filteredCast.length !== 1 ? "s" : ""}
          {activeShow !== "all" ? ` in ${SHOW_TAGS[activeShow]?.label || activeShow}` : ""}
          {searchQuery.trim() ? ` matching "${searchQuery}"` : ""}
        </p>
      )}

      {/* Cast grid */}
      {loading ? (
        <CastSkeleton />
      ) : filteredCast.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCast.map((member) => (
            <CastCard key={member.slug} member={member} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dr-border bg-dr-surface/60 p-8 text-center">
          <p className="text-sm text-dr-text-muted">
            No cast members found. Try a different search or filter.
          </p>
        </div>
      )}
    </div>
  );
}
