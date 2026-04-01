import Link from "next/link";

interface ShowCardProps {
  show: {
    tag: string;
    label: string;
    fullName: string;
    color: string;
    articleCount: number;
  };
}

export function ShowCard({ show }: ShowCardProps) {
  return (
    <Link
      href={`/shows/${show.tag}`}
      className="group relative overflow-hidden rounded-xl border border-[#1A1A2E] bg-[#1A1A2E]/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E84393]/40 hover:shadow-lg hover:shadow-[#E84393]/5"
    >
      {/* Color accent bar */}
      <div
        className="h-1.5 w-full transition-all duration-300 group-hover:h-2"
        style={{ backgroundColor: show.color }}
      />

      <div className="p-5">
        {/* Label pill */}
        <span
          className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider"
          style={{
            backgroundColor: `${show.color}20`,
            color: show.color,
          }}
        >
          {show.label}
        </span>

        {/* Full name */}
        <h3 className="mb-2 text-sm font-bold leading-snug text-[#F5F5F5] transition-colors duration-200 group-hover:text-white">
          {show.fullName}
        </h3>

        {/* Article count */}
        <p className="text-[10px] text-[#555568]">
          {show.articleCount} {show.articleCount === 1 ? "article" : "articles"}
        </p>
      </div>
    </Link>
  );
}
