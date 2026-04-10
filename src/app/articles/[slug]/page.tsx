import { ArticleDetailClient } from "./ArticleDetailClient";

// All known article slugs for static generation.
// When new articles are added, include them here and rebuild.
const KNOWN_SLUGS = [
  "scamanda-podcast-reality-tv-pipeline",
  "team-ciara-summer-house-internet-rallies",
  "summer-house-season-10-cast-guide",
  "vanderpump-rules-reboot-survival",
  "real-housewives-franchise-rankings-2026",
  "below-deck-down-under-season-4-messiest-moments",
  "real-housewives-rhode-island-what-we-know",
  "rhobh-season-15-last-supper-finale",
  "ladies-of-london-new-reign-sleeper-hit",
  "reality-tv-glossary-50-terms",
  "the-valley-season-3-lala-kent-tom-schwartz",
  "summer-house-reunion-most-watched-bravo-history",
  "rhoa-season-17-pinky-cole-k-michelle-cast-shakeup",
  "bravo-spring-2026-complete-viewing-guide",
  "10-bravo-moments-defined-reality-tv-forever",
  "guide-watching-real-housewives-first-time-2026",
  "southern-charm-season-11-reunion-single-charleston",
  "how-deuxmoi-became-most-powerful-force-reality-tv-gossip",
  "90-day-fiance-universe-complete-guide-every-spinoff",
  "love-island-usa-vs-uk-which-version-watching",
  "ciara-video-amanda-west",
  "kyle-cooke-wild-betrayal-hero",
  "summer-house-cast-sides-guide",
  "rhoa-season-17-premiere-night",
  "amanda-batula-brand-deals-disappearing",
  "carls-a-mess-uber-eats-summer-house",
  "bravo-in-the-city-summer-house-spinoff",
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
