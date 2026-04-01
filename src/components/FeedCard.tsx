import { timeAgo } from "@/lib/utils";
import { ShowTagPill } from "./ShowTagPill";
import type { FeedItem } from "@/lib/types";

interface FeedCardProps {
  item: FeedItem;
}

export function FeedCard({ item }: FeedCardProps) {
  return (
    <article className="group relative rounded-xl border border-[#1A1A2E] bg-[#1A1A2E]/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E84393]/40 hover:shadow-lg hover:shadow-[#E84393]/5">
      <div className="flex gap-4">
        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Source */}
          <div className="mb-1.5 flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#E84393]" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A0A0B0]">
              {item.source}
            </span>
          </div>

          {/* Title */}
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-1.5 block text-sm font-bold leading-snug text-[#F5F5F5] transition-colors duration-200 group-hover:text-[#E84393]"
          >
            {item.title}
          </a>

          {/* Description */}
          {item.description && (
            <p className="mb-2.5 line-clamp-2 text-xs leading-relaxed text-[#A0A0B0]">
              {item.description}
            </p>
          )}

          {/* Tags and time */}
          <div className="flex items-center gap-2">
            <div className="flex flex-wrap gap-1.5">
              {item.showTags.map((tag) => (
                <ShowTagPill key={tag} tag={tag} />
              ))}
            </div>
            <span className="ml-auto shrink-0 text-[10px] text-[#555568]">
              {timeAgo(item.publishedAt)}
            </span>
          </div>
        </div>

        {/* Thumbnail */}
        {item.imageUrl && (
          <div className="hidden shrink-0 sm:block">
            <img
              src={item.imageUrl}
              alt=""
              width={120}
              height={80}
              loading="lazy"
              className="h-20 w-[120px] rounded-lg object-cover"
            />
          </div>
        )}
      </div>
    </article>
  );
}
