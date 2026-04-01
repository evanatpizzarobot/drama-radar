import { SHOW_TAGS } from "@/lib/constants";

interface ShowTagPillProps {
  tag: string;
  label?: string;
  color?: string;
}

export function ShowTagPill({ tag, label, color }: ShowTagPillProps) {
  const showDef = SHOW_TAGS[tag];
  const displayLabel = label || showDef?.label || tag.toUpperCase();
  const displayColor = color || showDef?.color || "rgb(var(--dr-pink))";

  return (
    <span
      className="inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide transition-opacity duration-200 hover:opacity-90 dark-pill"
      style={{
        backgroundColor: `${displayColor}33`,
        borderColor: `${displayColor}55`,
        color: displayColor,
      }}
      data-show-pill
    >
      {displayLabel}
    </span>
  );
}
