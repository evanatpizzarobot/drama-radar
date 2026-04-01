"use client";

import { useState, useEffect } from "react";
import { SHOW_TAGS } from "@/lib/constants";
import { fetchShows } from "@/lib/api";
import { ShowCard } from "@/components/ShowCard";

interface ShowData {
  tag: string;
  label: string;
  fullName: string;
  color: string;
  articleCount: number;
}

/**
 * Build the show list from local SHOW_TAGS constant.
 * This ensures the page always renders even if the API is unavailable.
 */
function getLocalShows(): ShowData[] {
  return Object.entries(SHOW_TAGS).map(([tag, show]) => ({
    tag,
    label: show.label,
    fullName: show.fullName,
    color: show.color,
    articleCount: 0,
  }));
}

export default function ShowsPage() {
  const [shows, setShows] = useState<ShowData[]>(getLocalShows());

  // Try to enrich with article counts from API, but the page works without it
  useEffect(() => {
    async function loadShows() {
      const res = await fetchShows();
      if (res.shows.length > 0) {
        setShows(res.shows);
      }
    }

    loadShows();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-extrabold text-[#F5F5F5]">
          Show Hubs
        </h1>
        <p className="text-sm text-[#A0A0B0]">
          Browse all tracked shows. Tap a show to see the latest news, gossip, and stories.
        </p>
        <div
          className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#E84393] to-[#A855F7]"
          aria-hidden="true"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shows.map((show) => (
          <ShowCard key={show.tag} show={show} />
        ))}
      </div>
    </div>
  );
}
