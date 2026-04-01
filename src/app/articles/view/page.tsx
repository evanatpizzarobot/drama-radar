"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ArticleDetailClient } from "../[slug]/ArticleDetailClient";

function ArticleViewInner() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  if (!slug) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
        <div className="mx-auto max-w-md">
          <h1 className="mb-3 text-2xl font-extrabold text-[#F5F5F5]">
            Article Not Found
          </h1>
          <p className="mb-6 text-sm text-[#A0A0B0]">
            No article specified. Browse our originals to find what you are looking for.
          </p>
          <a
            href="/articles"
            className="inline-block rounded-full bg-[#E84393] px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Browse Originals
          </a>
        </div>
      </div>
    );
  }

  return <ArticleDetailClient slug={slug} />;
}

export default function ArticleViewPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <div className="animate-pulse">
            <div className="mb-4 h-64 w-full rounded-xl bg-[#2A2A3E]" />
            <div className="mb-3 h-8 w-3/4 rounded bg-[#2A2A3E]" />
            <div className="mb-2 h-5 w-full rounded bg-[#2A2A3E]" />
          </div>
        </div>
      }
    >
      <ArticleViewInner />
    </Suspense>
  );
}
