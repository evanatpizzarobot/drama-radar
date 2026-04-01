import type { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";
import { getAllAuthors } from "@/lib/authors";
import { AuthorCard } from "@/components/AuthorCard";

export const metadata: Metadata = generateSEOMetadata({
  title: "Meet the Team",
  description:
    "Meet the writers, analysts, and chaos agents behind DramaRadar. The voices behind the drama.",
  canonicalUrl: "https://dramaradar.com/team",
});

export default function TeamPage() {
  const authors = getAllAuthors();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="mb-3 text-3xl font-extrabold text-[#F5F5F5]">
          Meet the Team
        </h1>
        <div
          className="mb-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#E84393] to-[#A855F7]"
          aria-hidden="true"
        />
        <p className="text-sm text-[#A0A0B0]">
          The voices behind the drama.
        </p>
      </div>

      {/* Author grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {authors.map((author) => (
          <AuthorCard key={author.key} author={author} />
        ))}
      </div>
    </div>
  );
}
