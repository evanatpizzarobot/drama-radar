// Trending calculations for DramaRadar

import type { Env, FeedItem, TrendingData } from "./types";
import { SHOW_TAGS } from "./categorize";

// Notable cast members mapped to their primary show tag (full slug format)
const CAST_MEMBERS: Record<string, string> = {
  // RHOBH
  "kyle richards": "real-housewives-beverly-hills",
  "lisa rinna": "real-housewives-beverly-hills",
  "erika jayne": "real-housewives-beverly-hills",
  "dorit kemsley": "real-housewives-beverly-hills",
  "garcelle beauvais": "real-housewives-beverly-hills",
  "sutton stracke": "real-housewives-beverly-hills",
  "crystal kung minkoff": "real-housewives-beverly-hills",
  "brandi glanville": "real-housewives-beverly-hills",

  // RHOA
  "kenya moore": "real-housewives-atlanta",
  "kandi burruss": "real-housewives-atlanta",
  "sheree whitfield": "real-housewives-atlanta",
  "drew sidora": "real-housewives-atlanta",
  "nene leakes": "real-housewives-atlanta",
  "porsha williams": "real-housewives-atlanta",

  // RHONJ
  "teresa giudice": "real-housewives-new-jersey",
  "melissa gorga": "real-housewives-new-jersey",
  "joe gorga": "real-housewives-new-jersey",
  "margaret josephs": "real-housewives-new-jersey",
  "jennifer aydin": "real-housewives-new-jersey",
  "dolores catania": "real-housewives-new-jersey",

  // RHONY
  "jenna lyons": "real-housewives-new-york",
  "brynn whitfield": "real-housewives-new-york",
  "sai de silva": "real-housewives-new-york",
  "ubah hassan": "real-housewives-new-york",
  "erin lichy": "real-housewives-new-york",

  // RHOSLC
  "lisa barlow": "real-housewives-salt-lake-city",
  "heather gay": "real-housewives-salt-lake-city",
  "meredith marks": "real-housewives-salt-lake-city",
  "whitney rose": "real-housewives-salt-lake-city",
  "mary cosby": "real-housewives-salt-lake-city",
  "jen shah": "real-housewives-salt-lake-city",

  // RHOM
  "larsa pippen": "real-housewives-miami",
  "alexia nepola": "real-housewives-miami",
  "lisa hochstein": "real-housewives-miami",
  "guerdy abraira": "real-housewives-miami",

  // RHOP
  "gizelle bryant": "real-housewives-potomac",
  "karen huger": "real-housewives-potomac",
  "ashley darby": "real-housewives-potomac",
  "candiace dillard": "real-housewives-potomac",

  // VPR
  "tom sandoval": "vanderpump-rules",
  "ariana madix": "vanderpump-rules",
  "tom schwartz": "vanderpump-rules",
  "katie maloney": "vanderpump-rules",
  "scheana shay": "vanderpump-rules",
  "lala kent": "vanderpump-rules",
  "james kennedy": "vanderpump-rules",
  "raquel leviss": "vanderpump-rules",
  "rachel leviss": "vanderpump-rules",
  "lisa vanderpump": "vanderpump-rules",

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
  "west wilson": "summer-house",

  // The Valley
  "jax taylor": "the-valley",
  "brittany cartwright": "the-valley",
  "kristen doute": "the-valley",

  // Bachelor
  "joey graziadei": "bachelor-bachelorette",

  // Selling Sunset
  "chrishell stause": "selling-sunset",
  "jason oppenheim": "selling-sunset",
  "mary fitzgerald": "selling-sunset",

  // General
  "andy cohen": "bravo",
};

/**
 * Determine trend direction by comparing current count to previous count.
 * Up if current is 10%+ higher, down if 10%+ lower, otherwise stable.
 */
function getTrend(
  current: number,
  previous: number | undefined
): "up" | "down" | "stable" {
  if (previous === undefined || previous === 0) return "stable";
  const change = (current - previous) / previous;
  if (change >= 0.1) return "up";
  if (change <= -0.1) return "down";
  return "stable";
}

/**
 * Calculate trending data from recent feed items.
 * Compares current mention counts against the previous cycle stored in KV
 * to determine trend direction (up, down, stable).
 */
export async function calculateTrending(
  items: FeedItem[],
  env: Env
): Promise<TrendingData> {
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

  // Load previous cycle counts for trend comparison
  const prevRaw = await env.DRAMARADAR_CACHE.get("trending:previous", "json");
  const previousCounts: Record<string, number> = prevRaw
    ? (prevRaw as Record<string, number>)
    : {};

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
        trend: getTrend(count, previousCounts[tag]),
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

  // Find the hot story
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

  // Store current counts as previous for next cycle
  await env.DRAMARADAR_CACHE.put(
    "trending:previous",
    JSON.stringify(showCounts),
    { expirationTtl: 48 * 60 * 60 }
  );

  return {
    updatedAt: new Date().toISOString(),
    topShows,
    topPeople,
    hotStory,
  };
}
