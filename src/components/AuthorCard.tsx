import Link from "next/link";
import type { Author } from "@/lib/authors";

interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  const initial = author.displayName.charAt(0).toUpperCase();

  return (
    <Link
      href={`/team/${author.key}`}
      className="group rounded-xl border border-dr-border bg-dr-surface/60 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-dr-pink/40 hover:shadow-lg hover:shadow-dr-pink/5"
      aria-label={`View profile for ${author.displayName}`}
    >
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-dr-pink to-dr-purple text-xl font-bold text-white transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          {initial}
        </div>

        {/* Name */}
        <h3 className="mb-1 text-base font-bold text-dr-text transition-colors duration-200 group-hover:text-dr-pink">
          {author.displayName}
        </h3>

        {/* Role */}
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-dr-text-dim">
          {author.role}
        </p>

        {/* Bio */}
        <p className="line-clamp-3 text-sm leading-relaxed text-dr-text-muted">
          {author.bio}
        </p>
      </div>
    </Link>
  );
}
