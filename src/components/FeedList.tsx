"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { fetchFeed } from "@/lib/api";
import { FeedCard } from "./FeedCard";
import { AdUnit } from "./AdUnit";
import type { FeedItem } from "@/lib/types";

interface FeedListProps {
  initialItems: FeedItem[];
  category?: string;
  showTag?: string;
}

const PAGE_SIZE = 20;

function FeedSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-[#1A1A2E] bg-[#1A1A2E]/60 p-4">
      <div className="flex gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-2 h-2.5 w-20 rounded bg-[#2A2A3E]" />
          <div className="mb-1.5 h-4 w-3/4 rounded bg-[#2A2A3E]" />
          <div className="mb-1 h-3 w-full rounded bg-[#2A2A3E]" />
          <div className="mb-3 h-3 w-2/3 rounded bg-[#2A2A3E]" />
          <div className="flex gap-2">
            <div className="h-5 w-14 rounded-full bg-[#2A2A3E]" />
            <div className="h-5 w-14 rounded-full bg-[#2A2A3E]" />
          </div>
        </div>
        <div className="hidden h-20 w-[120px] rounded-lg bg-[#2A2A3E] sm:block" />
      </div>
    </div>
  );
}

export function FeedList({ initialItems, category, showTag }: FeedListProps) {
  const [items, setItems] = useState<FeedItem[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(initialItems.length);

  // Reset when filters change
  useEffect(() => {
    setItems(initialItems);
    offsetRef.current = initialItems.length;
    setHasMore(true);
  }, [initialItems]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const res = await fetchFeed({
      category: category === "all" ? undefined : category,
      show: showTag,
      limit: PAGE_SIZE,
      offset: offsetRef.current,
    });

    if (res.items.length === 0) {
      setHasMore(false);
    } else {
      setItems((prev) => [...prev, ...res.items]);
      offsetRef.current += res.items.length;
      setHasMore(res.hasMore);
    }

    setLoading(false);
  }, [loading, hasMore, category, showTag]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const node = observerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <div key={item.id}>
          <FeedCard item={item} />
          {/* Insert an AdUnit after every 8th item */}
          {(index + 1) % 8 === 0 && (
            <div className="my-3">
              <AdUnit slot={`feed-${Math.floor(index / 8)}`} />
            </div>
          )}
        </div>
      ))}

      {/* Loading skeletons */}
      {loading && (
        <div className="flex flex-col gap-3">
          <FeedSkeleton />
          <FeedSkeleton />
          <FeedSkeleton />
        </div>
      )}

      {/* Sentinel for intersection observer */}
      {hasMore && <div ref={observerRef} className="h-4" aria-hidden="true" />}

      {/* End of feed */}
      {!hasMore && items.length > 0 && (
        <p className="py-6 text-center text-xs text-[#555568]">
          You have reached the end of the feed.
        </p>
      )}

      {/* Empty state */}
      {!hasMore && items.length === 0 && !loading && (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <p className="text-sm text-[#A0A0B0]">No stories found.</p>
          <p className="text-xs text-[#555568]">Check back soon for new drama.</p>
        </div>
      )}
    </div>
  );
}
