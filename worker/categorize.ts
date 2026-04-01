// Content categorization for DramaRadar

import type { FeedItem, ShowDefinition, RawFeedEntry } from "./types";
import { shortHash } from "./fetch-feeds";

export const SHOW_TAGS: Record<string, ShowDefinition> = {
  "real-housewives-beverly-hills": {
    tag: "real-housewives-beverly-hills",
    label: "RHOBH",
    fullName: "The Real Housewives of Beverly Hills",
    keywords: [
      "rhobh", "beverly hills", "kyle richards", "dorit kemsley",
      "erika jayne", "garcelle beauvais", "sutton stracke", "crystal minkoff",
    ],
    color: "#C4A265",
  },
  "real-housewives-atlanta": {
    tag: "real-housewives-atlanta",
    label: "RHOA",
    fullName: "The Real Housewives of Atlanta",
    keywords: [
      "rhoa", "real housewives of atlanta", "kandi burruss", "kenya moore",
      "drew sidora", "sheree whitfield",
    ],
    color: "#E84393",
  },
  "real-housewives-new-jersey": {
    tag: "real-housewives-new-jersey",
    label: "RHONJ",
    fullName: "The Real Housewives of New Jersey",
    keywords: [
      "rhonj", "real housewives of new jersey", "teresa giudice",
      "melissa gorga", "margaret josephs",
    ],
    color: "#00B894",
  },
  "real-housewives-new-york": {
    tag: "real-housewives-new-york",
    label: "RHONY",
    fullName: "The Real Housewives of New York",
    keywords: [
      "rhony", "real housewives of new york", "brynn whitfield",
      "jenna lyons", "sai de silva", "ubah hassan", "erin lichy",
      "jessel taank",
    ],
    color: "#0984E3",
  },
  "real-housewives-salt-lake-city": {
    tag: "real-housewives-salt-lake-city",
    label: "RHOSLC",
    fullName: "The Real Housewives of Salt Lake City",
    keywords: [
      "rhoslc", "salt lake city", "lisa barlow", "heather gay",
      "meredith marks", "mary cosby",
    ],
    color: "#A29BFE",
  },
  "real-housewives-miami": {
    tag: "real-housewives-miami",
    label: "RHOM",
    fullName: "The Real Housewives of Miami",
    keywords: [
      "rhom", "real housewives of miami", "larsa pippen", "alexia nepola",
      "lisa hochstein", "guerdy abraira",
    ],
    color: "#FF7675",
  },
  "real-housewives-potomac": {
    tag: "real-housewives-potomac",
    label: "RHOP",
    fullName: "The Real Housewives of Potomac",
    keywords: [
      "rhop", "real housewives of potomac", "gizelle bryant", "karen huger",
      "ashley darby", "candiace dillard",
    ],
    color: "#6C5CE7",
  },
  "real-housewives-dubai": {
    tag: "real-housewives-dubai",
    label: "RHODubai",
    fullName: "The Real Housewives of Dubai",
    keywords: ["rhodubai", "real housewives of dubai"],
    color: "#FDCB6E",
  },
  "vanderpump-rules": {
    tag: "vanderpump-rules",
    label: "VPR",
    fullName: "Vanderpump Rules",
    keywords: [
      "vanderpump rules", "vanderpump", "tom sandoval", "ariana madix",
      "tom schwartz", "scheana shay", "lala kent", "katie maloney",
      "james kennedy",
    ],
    color: "#E17055",
  },
  "below-deck": {
    tag: "below-deck",
    label: "Below Deck",
    fullName: "Below Deck",
    keywords: [
      "below deck", "captain lee", "captain sandy", "below deck med",
      "below deck sailing", "below deck adventure",
    ],
    color: "#00CEC9",
  },
  "summer-house": {
    tag: "summer-house",
    label: "Summer House",
    fullName: "Summer House",
    keywords: [
      "summer house", "kyle cooke", "amanda batula", "carl radke",
      "lindsay hubbard", "paige desorbo", "ciara miller", "west wilson",
    ],
    color: "#55EFC4",
  },
  "the-valley": {
    tag: "the-valley",
    label: "The Valley",
    fullName: "The Valley",
    keywords: [
      "the valley", "jax taylor", "brittany cartwright", "kristen doute",
      "luke broderick",
    ],
    color: "#FAB1A0",
  },
  "southern-charm": {
    tag: "southern-charm",
    label: "Southern Charm",
    fullName: "Southern Charm",
    keywords: [
      "southern charm", "craig conover", "shep rose", "austen kroll",
      "madison lecroy",
    ],
    color: "#FFEAA7",
  },
  "bachelor-bachelorette": {
    tag: "bachelor-bachelorette",
    label: "Bachelor",
    fullName: "The Bachelor / The Bachelorette",
    keywords: [
      "the bachelor", "bachelorette", "bachelor in paradise",
      "golden bachelor", "rose ceremony", "final rose",
    ],
    color: "#FF3838",
  },
  "love-island": {
    tag: "love-island",
    label: "Love Island",
    fullName: "Love Island",
    keywords: ["love island", "love island usa", "love island uk"],
    color: "#FF9FF3",
  },
  "90-day-fiance": {
    tag: "90-day-fiance",
    label: "90 Day",
    fullName: "90 Day Fiance",
    keywords: [
      "90 day fiance", "90 day", "before the 90 days",
      "happily ever after", "the other way",
    ],
    color: "#F368E0",
  },
  "selling-sunset": {
    tag: "selling-sunset",
    label: "Selling Sunset",
    fullName: "Selling Sunset",
    keywords: [
      "selling sunset", "chrishell stause", "jason oppenheim",
      "mary fitzgerald", "selling the oc",
    ],
    color: "#FF6B6B",
  },
  "married-at-first-sight": {
    tag: "married-at-first-sight",
    label: "MAFS",
    fullName: "Married at First Sight",
    keywords: ["married at first sight", "mafs"],
    color: "#DFE6E9",
  },
};

export const RELEVANCE_KEYWORDS: string[] = [
  // General reality TV terms
  "reality tv", "reality show", "reality star", "reality television",
  "bravo", "bravolebrity", "bravo tv", "housewives", "real housewives",
  "reunion", "reunion episode", "tell all", "tell-all", "after show",
  "watch what happens live", "wwhl", "andy cohen",

  // Drama and gossip keywords
  "feud", "drama", "fight", "fired", "arrested", "lawsuit",
  "divorce", "breakup", "cheating", "affair", "scandal", "exposed",
  "confrontation", "shade", "clap back", "clapback", "diss", "beef",
  "falling out", "gossip",

  // Show-specific terms
  "cast shakeup", "new cast", "season premiere", "season finale",
  "trailer drop", "sneak peek", "exclusive clip", "casting news",
  "demoted", "friend of", "tagline", "confessional",
  "rose ceremony", "elimination", "contestant",

  // Celebrity and entertainment
  "celebrity", "celebrity gossip", "red carpet", "paparazzi",
  "instagram", "social media", "dating", "engaged", "wedding",
  "baby", "pregnant", "net worth", "fashion", "beauty", "glam",
  "tea", "receipts", "star", "famous",
  "season", "episode", "premiere", "finale", "trailer",
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
    "real-housewives-beverly-hills", "real-housewives-atlanta",
    "real-housewives-new-jersey", "real-housewives-new-york",
    "real-housewives-salt-lake-city", "real-housewives-miami",
    "real-housewives-potomac", "real-housewives-dubai",
  ];
  if (showTags.some((tag) => housewivesTags.includes(tag))) {
    if (!categories.includes("housewives")) {
      categories.push("housewives");
    }
  }

  // Determine if this is breaking news
  const breakingKeywords = [
    "breaking", "exclusive", "just in", "fired",
    "arrested", "divorce", "lawsuit",
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
