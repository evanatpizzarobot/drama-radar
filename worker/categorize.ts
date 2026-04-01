// Content categorization for DramaRadar

import type { FeedItem, ShowDefinition, RawFeedEntry } from "./types";
import { shortHash } from "./fetch-feeds";

export const SHOW_TAGS: Record<string, ShowDefinition> = {
  rhobh: {
    tag: "rhobh",
    label: "RHOBH",
    fullName: "The Real Housewives of Beverly Hills",
    keywords: ["rhobh", "beverly hills", "real housewives of beverly hills"],
    color: "#D4AF37",
  },
  rhoa: {
    tag: "rhoa",
    label: "RHOA",
    fullName: "The Real Housewives of Atlanta",
    keywords: ["rhoa", "atlanta", "real housewives of atlanta"],
    color: "#E85D75",
  },
  rhonj: {
    tag: "rhonj",
    label: "RHONJ",
    fullName: "The Real Housewives of New Jersey",
    keywords: ["rhonj", "new jersey", "real housewives of new jersey"],
    color: "#4A90D9",
  },
  rhony: {
    tag: "rhony",
    label: "RHONY",
    fullName: "The Real Housewives of New York City",
    keywords: ["rhony", "new york", "real housewives of new york"],
    color: "#50C878",
  },
  rhoslc: {
    tag: "rhoslc",
    label: "RHOSLC",
    fullName: "The Real Housewives of Salt Lake City",
    keywords: ["rhoslc", "salt lake city", "real housewives of salt lake"],
    color: "#9B59B6",
  },
  rhom: {
    tag: "rhom",
    label: "RHOM",
    fullName: "The Real Housewives of Miami",
    keywords: ["rhom", "miami", "real housewives of miami"],
    color: "#FF6B6B",
  },
  rhop: {
    tag: "rhop",
    label: "RHOP",
    fullName: "The Real Housewives of Potomac",
    keywords: ["rhop", "potomac", "real housewives of potomac"],
    color: "#2ECC71",
  },
  rhodubai: {
    tag: "rhodubai",
    label: "RHODubai",
    fullName: "The Real Housewives of Dubai",
    keywords: ["rhodubai", "dubai", "real housewives of dubai"],
    color: "#C9A84C",
  },
  vpr: {
    tag: "vpr",
    label: "VPR",
    fullName: "Vanderpump Rules",
    keywords: ["vpr", "vanderpump rules", "vanderpump"],
    color: "#E74C3C",
  },
  "below-deck": {
    tag: "below-deck",
    label: "Below Deck",
    fullName: "Below Deck",
    keywords: ["below deck", "below deck med", "below deck sailing"],
    color: "#3498DB",
  },
  "summer-house": {
    tag: "summer-house",
    label: "Summer House",
    fullName: "Summer House",
    keywords: ["summer house"],
    color: "#F39C12",
  },
  "the-valley": {
    tag: "the-valley",
    label: "The Valley",
    fullName: "The Valley",
    keywords: ["the valley"],
    color: "#8E44AD",
  },
  "southern-charm": {
    tag: "southern-charm",
    label: "Southern Charm",
    fullName: "Southern Charm",
    keywords: ["southern charm", "charleston"],
    color: "#1ABC9C",
  },
  bachelor: {
    tag: "bachelor",
    label: "Bachelor",
    fullName: "The Bachelor / The Bachelorette",
    keywords: ["bachelor", "bachelorette", "bachelor in paradise"],
    color: "#E91E63",
  },
  "love-island": {
    tag: "love-island",
    label: "Love Island",
    fullName: "Love Island",
    keywords: ["love island"],
    color: "#FF5722",
  },
  "90-day": {
    tag: "90-day",
    label: "90 Day",
    fullName: "90 Day Fiance",
    keywords: ["90 day fiance", "90 day", "90day"],
    color: "#00BCD4",
  },
  "selling-sunset": {
    tag: "selling-sunset",
    label: "Selling Sunset",
    fullName: "Selling Sunset",
    keywords: ["selling sunset", "oppenheim"],
    color: "#FF9800",
  },
  mafs: {
    tag: "mafs",
    label: "MAFS",
    fullName: "Married at First Sight",
    keywords: ["mafs", "married at first sight"],
    color: "#9C27B0",
  },
};

export const RELEVANCE_KEYWORDS: string[] = [
  // General reality TV terms
  "reality tv",
  "reality show",
  "reality star",
  "reality television",
  "bravo",
  "bravolebrity",
  "bravo tv",
  "housewives",
  "real housewives",
  "reunion",
  "reunion episode",
  "tell all",
  "tell-all",
  "after show",
  "watch what happens live",
  "wwhl",
  "andy cohen",

  // Drama and gossip keywords
  "feud",
  "drama",
  "fight",
  "fired",
  "arrested",
  "lawsuit",
  "divorce",
  "breakup",
  "cheating",
  "affair",
  "scandal",
  "exposed",
  "confrontation",
  "shade",
  "clap back",
  "clapback",
  "diss",
  "beef",
  "falling out",

  // Show-specific terms
  "cast shakeup",
  "new cast",
  "season premiere",
  "season finale",
  "trailer drop",
  "sneak peek",
  "exclusive clip",
  "casting news",
  "demoted",
  "friend of",
  "tagline",

  // Celebrity and entertainment
  "celebrity gossip",
  "red carpet",
  "paparazzi",
  "instagram",
  "social media",
  "dating",
  "engaged",
  "wedding",
  "baby",
  "pregnant",
  "net worth",
  "plastic surgery",
  "cosmetic",
];

/**
 * Detect which shows are referenced in the title and description.
 * Returns an array of matching show tag strings.
 */
export function detectShowTags(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const matchedTags: string[] = [];

  for (const [tag, show] of Object.entries(SHOW_TAGS)) {
    for (const keyword of show.keywords) {
      if (text.includes(keyword.toLowerCase())) {
        matchedTags.push(tag);
        break;
      }
    }
  }

  return matchedTags;
}

/**
 * Check if content is relevant to reality TV, celebrity gossip, or tracked shows.
 * Returns true if the content matches any relevance keyword or show keyword.
 */
export function isRelevantContent(title: string, description: string): boolean {
  const text = `${title} ${description}`.toLowerCase();

  // Check show keywords first
  for (const show of Object.values(SHOW_TAGS)) {
    for (const keyword of show.keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return true;
      }
    }
  }

  // Check general relevance keywords
  for (const keyword of RELEVANCE_KEYWORDS) {
    if (text.includes(keyword.toLowerCase())) {
      return true;
    }
  }

  return false;
}

/**
 * Build a complete FeedItem from a raw feed entry and its source metadata.
 */
export async function categorizeItem(
  entry: RawFeedEntry
): Promise<FeedItem> {
  const hash = await shortHash(entry.link);
  const now = new Date().toISOString();
  const showTags = detectShowTags(entry.title, entry.description);

  // Determine categories from source plus detected content
  const categories = [...new Set(entry.sourceCategories)];

  // Add "housewives" category if any housewives show is tagged
  const housewivesTags = [
    "rhobh", "rhoa", "rhonj", "rhony", "rhoslc", "rhom", "rhop", "rhodubai",
  ];
  if (showTags.some((tag) => housewivesTags.includes(tag))) {
    if (!categories.includes("housewives")) {
      categories.push("housewives");
    }
  }

  // Determine if this is breaking news
  const breakingKeywords = [
    "breaking",
    "exclusive",
    "just in",
    "fired",
    "arrested",
    "divorce",
    "lawsuit",
  ];
  const titleLower = entry.title.toLowerCase();
  const isBreaking =
    entry.sourcePriority === 1 &&
    breakingKeywords.some((kw) => titleLower.includes(kw));

  if (isBreaking && !categories.includes("breaking")) {
    categories.push("breaking");
  }

  // Parse published date, fall back to now
  let publishedAt = now;
  if (entry.pubDate) {
    const parsed = new Date(entry.pubDate);
    if (!isNaN(parsed.getTime())) {
      publishedAt = parsed.toISOString();
    }
  }

  return {
    id: hash,
    title: entry.title,
    description: entry.description,
    url: entry.link,
    source: entry.sourceName,
    sourceUrl: entry.sourceUrl,
    imageUrl: entry.imageUrl,
    publishedAt,
    fetchedAt: now,
    categories,
    showTags,
    priority: entry.sourcePriority,
    isBreaking,
  };
}
