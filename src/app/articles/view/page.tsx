"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

function ArticleViewRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get("slug");

  useEffect(() => {
    if (slug) {
      router.replace(`/articles/${slug}/`);
    } else {
      router.replace("/articles/");
    }
  }, [slug, router]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="animate-pulse">
        <div className="mb-4 h-64 w-full rounded-xl bg-dr-surface-hover" />
        <div className="mb-3 h-8 w-3/4 rounded bg-dr-surface-hover" />
        <div className="mb-2 h-5 w-full rounded bg-dr-surface-hover" />
      </div>
    </div>
  );
}

export default function ArticleViewPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <div className="animate-pulse">
            <div className="mb-4 h-64 w-full rounded-xl bg-dr-surface-hover" />
            <div className="mb-3 h-8 w-3/4 rounded bg-dr-surface-hover" />
            <div className="mb-2 h-5 w-full rounded bg-dr-surface-hover" />
          </div>
        </div>
      }
    >
      <ArticleViewRedirect />
    </Suspense>
  );
}
