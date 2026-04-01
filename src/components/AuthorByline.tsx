import { getAuthor } from "@/lib/authors";

interface AuthorBylineProps {
  authorKey: string;
  date: string;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function AuthorByline({ authorKey, date }: AuthorBylineProps) {
  const author = getAuthor(authorKey);
  const initial = author.displayName.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-3">
      {/* Avatar circle with gradient and initial */}
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-dr-pink to-dr-purple text-xs font-bold text-white"
        aria-hidden="true"
      >
        {initial}
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-dr-text">
            {author.displayName}
          </span>
          <span className="text-xs text-dr-text-dim">{author.role}</span>
        </div>
        <time
          dateTime={date}
          className="text-xs text-dr-text-muted"
        >
          {formatDate(date)}
        </time>
      </div>
    </div>
  );
}
