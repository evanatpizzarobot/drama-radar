import { ArticleDetailClient } from "./ArticleDetailClient";

// All known article slugs for static generation.
// When new articles are added, include them here and rebuild.
const KNOWN_SLUGS = [
  "scamanda-summer-house-scandal",
  "team-ciara-internet-rallies",
  "summer-house-s10-cast-guide",
  "vpr-reboot-survival",
  "housewives-rankings-2026",
  "below-deck-s4-messiest-moments",
  "rhode-island-housewives-preview",
  "rhobh-last-supper-finale",
  "ladies-of-london-sleeper-hit",
  "reality-tv-glossary",
  "valley-s3-lala-schwartz",
  "summer-house-reunion-prediction",
  "rhoa-s17-cast-shakeup",
  "bravo-spring-2026-guide",
  "10-bravo-moments-forever",
  "housewives-beginners-guide",
  "southern-charm-s11-reunion",
  "how-deuxmoi-changed-gossip",
  "90-day-fiance-spinoff-guide",
  "love-island-usa-vs-uk",
];

export async function generateStaticParams() {
  return KNOWN_SLUGS.map((slug) => ({ slug }));
}

interface ArticleDetailPageProps {
  params: { slug: string };
}

export default function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  return <ArticleDetailClient slug={params.slug} />;
}
