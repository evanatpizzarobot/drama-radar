"use client";

import { useState, useEffect } from "react";
import { fetchShows } from "@/lib/api";
import { ShowCard } from "@/components/ShowCard";

interface ShowData {
  tag: string;
  label: string;
  fullName: string;
  color: string;
  articleCount: number;
}

function ShowsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-[#1A1A2E] bg-[#1A1A2E]/60"
        >
          <div className="h-1.5 w-full rounded-t-xl bg-[#2A2A3E]" />
          <div className="p-5">
            <div className="mb-3 h-6 w-20 rounded-full bg-[#2A2A3E]" />
            <div className="mb-2 h-4 w-3/4 rounded bg-[#2A2A3E]" />
            <div className="h-3 w-24 rounded bg-[#2A2A3E]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ShowsPage() {
  const [shows, setShows] = useState<ShowData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadShows() {
      setLoading(true);
      const res = await fetchShows();
      setShows(res.shows);
      setLoading(false);
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
      </div>

      {loading ? (
        <ShowsSkeleton />
      ) : shows.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shows.map((show) => (
            <ShowCard key={show.tag} show={show} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <p className="text-sm text-[#A0A0B0]">No shows available yet.</p>
          <p className="text-xs text-[#555568]">Check back soon for new show hubs.</p>
        </div>
      )}
    </div>
  );
}
