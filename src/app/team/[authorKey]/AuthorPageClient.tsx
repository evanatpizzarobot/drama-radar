"use client";

import Link from "next/link";
import { AUTHORS } from "@/lib/authors";

interface AuthorPageClientProps {
  authorKey: string;
}

export function AuthorPageClient({ authorKey }: AuthorPageClientProps) {
  const author = AUTHORS[authorKey];

  if (!author) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-xl border border-dr-border bg-dr-surface/60 p-8 text-center">
          <p className="mb-2 text-lg font-bold text-dr-text">
            Author not found
          </p>
          <p className="mb-6 text-sm text-dr-text-muted">
            We could not find a team member with that name.
          </p>
          <Link
            href="/team"
            className="inline-block rounded-lg bg-gradient-to-r from-dr-pink to-dr-purple px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            View the full team
          </Link>
        </div>
      </div>
    );
  }

  const initial = author.displayName.charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Back link */}
      <Link
        href="/team"
        className="mb-8 inline-flex items-center gap-1.5 text-xs font-medium text-dr-text-muted transition-colors hover:text-dr-pink"
        aria-label="Back to team page"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Back to Team
      </Link>

      {/* Author profile */}
      <div className="mb-10 flex flex-col items-center text-center">
        {/* Large avatar */}
        <div
          className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-dr-pink to-dr-purple text-3xl font-bold text-white"
          aria-hidden="true"
        >
          {initial}
        </div>

        {/* Name */}
        <h1 className="mb-1 text-2xl font-extrabold text-dr-text">
          {author.displayName}
        </h1>

        {/* Role */}
        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-dr-text-dim">
          {author.role}
        </p>

        {/* Bio */}
        <p className="max-w-lg text-sm leading-relaxed text-dr-text-muted">
          {author.bio}
        </p>

        {/* Signoff */}
        {author.signoff && (
          <p className="mt-4 text-sm font-semibold italic text-dr-pink">
            &ldquo;{author.signoff}&rdquo;
          </p>
        )}
      </div>

      {/* Articles section (empty state) */}
      <div className="rounded-xl border border-dr-border bg-dr-surface/60 p-8 text-center">
        <p className="mb-1 text-sm font-bold text-dr-text">
          Articles by {author.displayName}
        </p>
        <p className="text-xs text-dr-text-muted">
          Coming soon. Check back for their latest takes and analysis.
        </p>
      </div>
    </div>
  );
}
