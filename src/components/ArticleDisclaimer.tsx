import Link from "next/link";

export function ArticleDisclaimer() {
  return (
    <p className="mt-6 text-[11px] leading-relaxed text-dr-text-dim">
      DramaRadar may earn a small commission from qualifying purchases. This
      does not affect our editorial coverage.{" "}
      <Link
        href="/disclosure"
        className="underline underline-offset-2 transition-opacity hover:opacity-80"
      >
        Learn more
      </Link>
      .
    </p>
  );
}
