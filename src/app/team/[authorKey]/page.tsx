import type { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";
import { AUTHORS, getAuthor } from "@/lib/authors";
import { AuthorPageClient } from "./AuthorPageClient";

interface AuthorPageProps {
  params: { authorKey: string };
}

export function generateStaticParams() {
  return Object.keys(AUTHORS).map((key) => ({
    authorKey: key,
  }));
}

export function generateMetadata({ params }: AuthorPageProps): Metadata {
  const author = getAuthor(params.authorKey);

  return generateSEOMetadata({
    title: `${author.displayName} | Team`,
    description: author.bio,
    canonicalUrl: `https://dramaradar.com/team/${params.authorKey}`,
  });
}

export default function AuthorPage({ params }: AuthorPageProps) {
  return <AuthorPageClient authorKey={params.authorKey} />;
}
