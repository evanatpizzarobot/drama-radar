import Link from "next/link";
import { SHOW_TAGS } from "@/lib/constants";
import type { CastMember } from "@/lib/types";

interface CastCardProps {
  member: CastMember;
  compact?: boolean;
}

function CastInitialAvatar({
  name,
  showColor,
  size = "md",
}: {
  name: string;
  showColor: string;
  size?: "sm" | "md" | "lg";
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const sizeClasses = {
    sm: "h-10 w-10 text-sm",
    md: "h-16 w-16 text-xl",
    lg: "h-24 w-24 text-3xl",
  };

  return (
    <div
      className={`${sizeClasses[size]} flex shrink-0 items-center justify-center rounded-full font-black text-white`}
      style={{ backgroundColor: showColor }}
    >
      {initials}
    </div>
  );
}

export function CastCard({ member, compact }: CastCardProps) {
  const primaryShow = member.shows[0];
  const showDef = SHOW_TAGS[primaryShow];
  const showColor = showDef?.color || "#E84393";

  const statusLabel =
    member.status === "friend-of"
      ? "Friend Of"
      : member.status === "former"
        ? "Former"
        : "Current";

  const statusClasses =
    member.status === "current"
      ? "bg-emerald-500/20 text-emerald-400"
      : member.status === "friend-of"
        ? "bg-amber-500/20 text-amber-400"
        : "bg-dr-text-dim/20 text-dr-text-dim";

  if (compact) {
    return (
      <Link
        href={`/cast/${member.slug}`}
        className="group flex items-center gap-3 rounded-xl border border-dr-border bg-dr-surface/60 p-3 transition-all hover:-translate-y-0.5 hover:border-dr-border-hover hover:shadow-md"
      >
        <CastInitialAvatar name={member.displayName} showColor={showColor} size="sm" />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-dr-text group-hover:text-dr-pink">
            {member.displayName}
          </p>
          <p className="text-[10px] text-dr-text-muted">
            {showDef?.label || primaryShow}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/cast/${member.slug}`}
      className="group flex flex-col rounded-xl border border-dr-border bg-dr-surface/60 p-4 transition-all hover:-translate-y-0.5 hover:border-dr-border-hover hover:shadow-md"
    >
      {/* Top: avatar + name */}
      <div className="mb-3 flex items-center gap-3">
        <CastInitialAvatar name={member.displayName} showColor={showColor} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-dr-text group-hover:text-dr-pink">
            {member.displayName}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
              style={{
                backgroundColor: `${showColor}20`,
                color: showColor,
              }}
            >
              {showDef?.label || primaryShow}
            </span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusClasses}`}>
              {statusLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Bio excerpt */}
      <p className="mb-3 line-clamp-3 text-xs leading-relaxed text-dr-text-muted">
        {member.bio}
      </p>

      {/* Bottom: hometown + age */}
      <div className="mt-auto flex items-center gap-2 text-[10px] text-dr-text-dim">
        {member.hometown && <span>{member.hometown}</span>}
        {member.hometown && member.age > 0 && <span>&middot;</span>}
        {member.age > 0 && <span>Age {member.age}</span>}
      </div>
    </Link>
  );
}

export { CastInitialAvatar };
