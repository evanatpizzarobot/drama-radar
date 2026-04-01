import { getAuthor } from "@/lib/authors";
import { AuthorAvatar } from "./AuthorAvatar";

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

  return (
    <div className="flex items-center gap-3">
      <AuthorAvatar author={author} size="sm" />

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
