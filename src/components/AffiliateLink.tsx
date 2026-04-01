export function AffiliateLink({
  url,
  text,
  source,
}: {
  url: string;
  text: string;
  source?: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="nofollow sponsored"
      className="inline-flex items-center gap-1 text-dr-pink transition-opacity hover:opacity-80"
      {...(source ? { "data-source": source } : {})}
    >
      <span>{text}</span>
      <svg
        className="inline h-3.5 w-3.5 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    </a>
  );
}
