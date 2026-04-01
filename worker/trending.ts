// Trending calculations for DramaRadar

import type { FeedItem, TrendingData } from "./types";
import { SHOW_TAGS } from "./categorize";

// Notable cast members mapped to their primary show tag
const CAST_MEMBERS: Record<string, string> = {
  // RHOBH
  "kyle richards": "rhobh",
  "lisa rinna": "rhobh",
  "erika jayne": "rhobh",
  "dorit kemsley": "rhobh",
  "garcelle beauvais": "rhobh",
  "sutton stracke": "rhobh",
  "crystal kung minkoff": "rhobh",
  "brandi glanville": "rhobh",

  // RHOA
  "kenya moore": "rhoa",
  "kandi burruss": "rhoa",
  "sheree whitfield": "rhoa",
  "drew sidora": "rhoa",
  "nene leakes": "rhoa",
  "porsha williams": "rhoa",

  // RHONJ
  "teresa giudice": "rhonj",
  "melissa gorga": "rhonj",
  "joe gorga": "rhonj",
  "margaret josephs": "rhonj",
  "jennifer aydin": "rhonj",
  "dolores catania": "rhonj",

  // RHONY
  "jenna lyons": "rhony",
  "brynn whitfield": "rhony",
  "sai de silva": "rhony",
  "ubah hassan": "rhony",
  "erin lichy": "rhony",

  // RHOSLC
  "lisa barlow": "rhoslc",
  "heather gay": "rhoslc",
  "meredith marks": "rhoslc",
  "whitney rose": "rhoslc",
  "mary cosby": "rhoslc",
  "jen shah": "rhoslc",

  // VPR
  "tom sandoval": "vpr",
  "ariana madix": "vpr",
  "tom schwartz": "vpr",
  "katie maloney": "vpr",
  "scheana shay": "vpr",
  "lala kent": "vpr",
  "james kennedy": "vpr",
  "raquel leviss": "vpr",
  "rachel leviss": "vpr",
  "lisa vanderpump": "vpr",

  // Below Deck
  "captain lee": "below-deck",
  "captain sandy": "below-deck",
  "kate chastain": "below-deck",

  // Southern Charm
  "craig conover": "southern-charm",
  "austen kroll": "southern-charm",
  "shep rose": "southern-charm",
  "madison lecroy": "southern-charm",

  // Summer House
  "carl radke": "summer-house",
  "lindsay hubbard": "summer-house",
  "kyle cooke": "summer-house",
  "amanda batula": "summer-house",
  "paige desorbo": "summer-house",
  "ciara miller": "summer-house",

  // General
  "andy cohen": "bravo",
};

/**
 * Calculate trending data from recent feed items.
 * Analyzes items from the last 24 hours to determine top shows,
 * top people, and the hottest story.
 */
export function calculateTrending(items: FeedItem[]): TrendingData {
  const now = Date.now();
  const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;

  // Filter to last 24 hours
  const recentItems = items.filter((item) => {
    const itemTime = new Date(item.publishedAt).getTime();
    return itemTime >= twentyFourHoursAgo;
  });

  // Count show mentions
  const showCounts: Record<string, number> = {};
  for (const item of recentItems) {
    for (const tag of item.showTags) {
      showCounts[tag] = (showCounts[tag] || 0) + 1;
    }
  }

  // Build top shows (sorted by mention count, top 10)
  const topShows = Object.entries(showCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag, count]) => {
      const show = SHOW_TAGS[tag];
      return {
        showTag: tag,
        label: show ? show.label : tag,
        mentionCount: count,
        // Without historical data, default to "stable"
        trend: "stable" as const,
      };
    });

  // Count cast member mentions
  const peopleCounts: Record<string, { count: number; showTag: string }> = {};
  for (const item of recentItems) {
    const text = `${item.title} ${item.description}`.toLowerCase();
    for (const [name, showTag] of Object.entries(CAST_MEMBERS)) {
      if (text.includes(name)) {
        if (!peopleCounts[name]) {
          peopleCounts[name] = { count: 0, showTag };
        }
        peopleCounts[name].count += 1;
      }
    }
  }

  // Build top people (sorted by mention count, top 10)
  const topPeople = Object.entries(peopleCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10)
    .map(([name, data]) => ({
      name: name
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      mentionCount: data.count,
      showTag: data.showTag,
    }));

  // Find the hot story: the item with the most show tag overlap
  // and highest priority, preferring breaking items
  let hotStory: TrendingData["hotStory"] = null;
  if (recentItems.length > 0) {
    const scored = recentItems
      .map((item) => {
        let score = item.showTags.length * 2;
        if (item.isBreaking) score += 5;
        if (item.priority === 1) score += 3;
        if (item.priority === 2) score += 1;
        return { item, score };
      })
      .sort((a, b) => b.score - a.score);

    const top = scored[0];
    if (top) {
      hotStory = {
        itemId: top.item.id,
        title: top.item.title,
        source: top.item.source,
        url: top.item.url,
      };
    }
  }

  return {
    updatedAt: new Date().toISOString(),
    topShows,
    topPeople,
    hotStory,
  };
}
