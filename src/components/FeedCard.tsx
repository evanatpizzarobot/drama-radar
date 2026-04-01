import { timeAgo, decodeHtmlEntities } from "@/lib/utils";
import { ShowTagPill } from "./ShowTagPill";
import type { FeedItem } from "@/lib/types";

interface FeedCardProps {
  item: FeedItem;
}

export function FeedCard({ item }: FeedCardProps) {
  return (
    <article className="group relative rounded-xl border border-dr-border bg-dr-surface/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-dr-pink/40 hover:shadow-lg hover:shadow-dr-pink/5">
      <div className="flex gap-4">
        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Source */}
          <div className="mb-1.5 flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-dr-pink" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-dr-text-muted">
              {item.source}
            </span>
          </div>

          {/* Title */}
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-1.5 block text-sm font-bold leading-snug text-dr-text transition-colors duration-200 group-hover:text-dr-pink"
          >
            {decodeHtmlEntities(item.title)}
          </a>

          {/* Description */}
          {item.description && (
            <p className="mb-2.5 line-clamp-2 text-xs leading-relaxed text-dr-text-muted">
              {decodeHtmlEntities(item.description)}
            </p>
          )}

          {/* Tags and time */}
          <div className="flex items-center gap-2">
            <div className="flex flex-wrap gap-1.5">
              {item.showTags.map((tag) => (
                <ShowTagPill key={tag} tag={tag} />
              ))}
            </div>
            <span className="ml-auto shrink-0 text-[10px] text-dr-text-dim">
              {timeAgo(item.publishedAt)}
            </span>
          </div>
        </div>

        {/* Thumbnail */}
        {item.imageUrl && (
          <div className="hidden shrink-0 overflow-hidden rounded-lg sm:block sm:h-20 sm:w-[120px]">
            <img
              src={item.imageUrl}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    </article>
  );
}
