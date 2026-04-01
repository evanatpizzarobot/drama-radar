"use client";

import { useState, useEffect } from "react";
import { fetchBreaking, fetchTrending, fetchArticles, fetchFeed } from "@/lib/api";
import { BreakingBanner } from "@/components/BreakingBanner";
import { CategoryFilter } from "@/components/CategoryFilter";
import { FeaturedArticles } from "@/components/FeaturedArticles";
import { ArticleCard } from "@/components/ArticleCard";
import { FeedList } from "@/components/FeedList";
import { Sidebar } from "@/components/Sidebar";
import { DramaDeskChat } from "@/components/DramaDeskChat";
import type { FeedItem, EditorialArticle, TrendingData } from "@/lib/types";

function HomeSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Featured skeleton */}
      <div className="mb-10">
        <div className="mb-4 h-5 w-48 animate-pulse rounded bg-[#2A2A3E]" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-[#1A1A2E] bg-[#1A1A2E]/60"
            >
              <div className="h-44 w-full rounded-t-xl bg-[#2A2A3E]" />
              <div className="p-4">
                <div className="mb-2 h-4 w-3/4 rounded bg-[#2A2A3E]" />
                <div className="mb-1 h-3 w-full rounded bg-[#2A2A3E]" />
                <div className="h-3 w-1/2 rounded bg-[#2A2A3E]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest from the Drama Desk skeleton */}
      <div className="mb-10">
        <div className="mb-4 h-5 w-56 animate-pulse rounded bg-[#2A2A3E]" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-[#1A1A2E] bg-[#1A1A2E]/60"
            >
              <div className="h-36 w-full rounded-t-xl bg-[#2A2A3E]" />
              <div className="p-4">
                <div className="mb-2 h-3 w-3/4 rounded bg-[#2A2A3E]" />
                <div className="h-2 w-1/2 rounded bg-[#2A2A3E]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category filter skeleton */}
      <div className="mb-6 flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-8 w-20 animate-pulse rounded-full bg-[#2A2A3E]" />
        ))}
      </div>

      {/* Feed skeleton */}
      <div className="flex gap-8">
        <div className="min-w-0 flex-1">
          <div className="mb-4 h-5 w-40 animate-pulse rounded bg-[#2A2A3E]" />
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border border-[#1A1A2E] bg-[#1A1A2E]/60 p-4"
              >
                <div className="mb-2 h-2.5 w-20 rounded bg-[#2A2A3E]" />
                <div className="mb-1.5 h-4 w-3/4 rounded bg-[#2A2A3E]" />
                <div className="mb-1 h-3 w-full rounded bg-[#2A2A3E]" />
                <div className="mb-3 h-3 w-2/3 rounded bg-[#2A2A3E]" />
                <div className="flex gap-2">
                  <div className="h-5 w-14 rounded-full bg-[#2A2A3E]" />
                  <div className="h-5 w-14 rounded-full bg-[#2A2A3E]" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden w-80 shrink-0 lg:block">
          <div className="h-96 animate-pulse rounded-xl border border-[#1A1A2E] bg-[#1A1A2E]/60" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [breakingItems, setBreakingItems] = useState<FeedItem[]>([]);
  const [trending, setTrending] = useState<TrendingData | null>(null);
  const [featuredArticles, setFeaturedArticles] = useState<EditorialArticle[]>([]);
  const [recentArticles, setRecentArticles] = useState<EditorialArticle[]>([]);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // Initial data load
  useEffect(() => {
    async function loadInitialData() {
      setLoading(true);
      const [breakingRes, trendingRes, featuredRes, recentRes, feedRes] =
        await Promise.all([
          fetchBreaking(),
          fetchTrending(),
          fetchArticles({ featured: true, limit: 4 }),
          fetchArticles({ limit: 8 }),
          fetchFeed({ limit: 20 }),
        ]);

      setBreakingItems(breakingRes.items);
      setTrending(trendingRes);
      setFeaturedArticles(featuredRes.articles);

      // Filter out featured articles from the recent list so there is no overlap
      const featuredSlugs = new Set(featuredRes.articles.map((a) => a.slug));
      const nonFeatured = recentRes.articles.filter(
        (a) => !featuredSlugs.has(a.slug)
      );
      setRecentArticles(nonFeatured.slice(0, 4));

      setFeedItems(feedRes.items);
      setLoading(false);
    }

    loadInitialData();
  }, []);

  // Refetch feed when category changes
  useEffect(() => {
    if (loading) return;

    async function loadCategoryFeed() {
      const res = await fetchFeed({
        category: activeCategory === "all" ? undefined : activeCategory,
        limit: 20,
      });
      setFeedItems(res.items);
    }

    loadCategoryFeed();
  }, [activeCategory, loading]);

  return (
    <>
      {/* 1. Breaking Tea Banner */}
      <BreakingBanner items={breakingItems} />

      {loading ? (
        <HomeSkeleton />
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          {/* 2. Featured Editorial Section (above the fold for AdSense reviewers) */}
          {featuredArticles.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#F5F5F5]">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[#E84393]"
                  aria-hidden="true"
                />
                Featured Stories
              </h2>
              <FeaturedArticles articles={featuredArticles} />
            </section>
          )}

          {/* 3. Latest from the Drama Desk */}
          {recentArticles.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#F5F5F5]">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[#A855F7]"
                  aria-hidden="true"
                />
                Latest from the Drama Desk
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {recentArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </section>
          )}

          {/* 4. Category Filter Bar (below editorial content) */}
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* 5. Live Feed: RSS aggregated feed + sidebar */}
          <div className="mt-6 flex gap-8">
            {/* Feed column */}
            <div className="min-w-0 flex-1">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#F5F5F5]">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[#E84393]"
                  aria-hidden="true"
                />
                What&apos;s Buzzing Now
              </h2>
              <FeedList initialItems={feedItems} category={activeCategory} />
            </div>

            {/* Sidebar */}
            <Sidebar trending={trending} />
          </div>
        </div>
      )}

      {/* Drama Desk Chat floating widget */}
      <DramaDeskChat />
    </>
  );
}
