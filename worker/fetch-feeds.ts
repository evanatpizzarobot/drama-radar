// RSS feed fetching and parsing for DramaRadar

import type { Env, FeedSource, RawFeedEntry } from "./types";

// Tier 1: High priority, major entertainment outlets
export const TIER1_FEEDS: FeedSource[] = [
  {
    name: "People Magazine",
    url: "https://people.com/tag/reality-tv/feed/",
    categories: ["reality-tv", "celebrity"],
    priority: 1,
  },
  {
    name: "Us Weekly",
    url: "https://www.usmagazine.com/feed/",
    categories: ["celebrity", "reality-tv"],
    priority: 1,
  },
  {
    name: "E! News",
    url: "https://www.eonline.com/syndication/feeds/rssfeeds/topstories.xml",
    categories: ["celebrity", "reality-tv"],
    priority: 1,
  },
  {
    name: "TMZ",
    url: "https://www.tmz.com/rss.xml",
    categories: ["celebrity", "breaking"],
    priority: 1,
  },
  {
    name: "Page Six",
    url: "https://pagesix.com/feed/",
    categories: ["celebrity", "reality-tv"],
    priority: 1,
  },
  {
    name: "Entertainment Tonight",
    url: "https://www.etonline.com/rss",
    categories: ["celebrity", "reality-tv"],
    priority: 1,
  },
  {
    name: "Bravo TV",
    url: "https://www.bravotv.com/rss.xml",
    categories: ["bravo", "housewives", "reality-tv"],
    priority: 1,
  },
];

// Tier 2: Mid priority, reality TV focused blogs and outlets
export const TIER2_FEEDS: FeedSource[] = [
  {
    name: "Reality Blurb",
    url: "https://realityblurb.com/feed/",
    categories: ["reality-tv", "housewives", "bravo"],
    priority: 2,
  },
  {
    name: "Reality Tea",
    url: "https://www.realitytea.com/feed/",
    categories: ["reality-tv", "housewives", "bravo"],
    priority: 2,
  },
  {
    name: "All About The Real Housewives",
    url: "https://www.allabouttrh.com/feed/",
    categories: ["housewives", "bravo"],
    priority: 2,
  },
  {
    name: "Screen Rant Reality TV",
    url: "https://screenrant.com/category/reality-tv/feed/",
    categories: ["reality-tv"],
    priority: 2,
  },
  {
    name: "Vulture",
    url: "https://www.vulture.com/rss/tags/reality-tv.xml",
    categories: ["reality-tv", "celebrity"],
    priority: 2,
  },
  {
    name: "The Daily Dish (Bravo)",
    url: "https://www.bravotv.com/the-daily-dish/rss.xml",
    categories: ["bravo", "housewives"],
    priority: 2,
  },
  {
    name: "Just Jared",
    url: "https://www.justjared.com/feed/",
    categories: ["celebrity"],
    priority: 2,
  },
  {
    name: "Variety Reality TV",
    url: "https://variety.com/v/tv/feed/",
    categories: ["reality-tv", "celebrity"],
    priority: 2,
  },
];

// Tier 3: Lower priority, supplemental sources
export const TIER3_FEEDS: FeedSource[] = [
  {
    name: "Decider",
    url: "https://decider.com/feed/",
    categories: ["reality-tv"],
    priority: 3,
  },
  {
    name: "Deadline Reality",
    url: "https://deadline.com/category/reality-tv/feed/",
    categories: ["reality-tv"],
    priority: 3,
  },
  {
    name: "The Hollywood Reporter",
    url: "https://www.hollywoodreporter.com/e/feed/",
    categories: ["celebrity", "reality-tv"],
    priority: 3,
  },
  {
    name: "Entertainment Weekly",
    url: "https://ew.com/feed/",
    categories: ["celebrity", "reality-tv"],
    priority: 3,
  },
  {
    name: "Daily Mail TV",
    url: "https://www.dailymail.co.uk/tvshowbiz/index.rss",
    categories: ["celebrity", "reality-tv"],
    priority: 3,
  },
  {
    name: "Cosmopolitan Entertainment",
    url: "https://www.cosmopolitan.com/entertainment/celebs/rss/all.xml/",
    categories: ["celebrity", "fashion"],
    priority: 3,
  },
  {
    name: "BuzzFeed Celebrity",
    url: "https://www.buzzfeed.com/celebrity.xml",
    categories: ["celebrity"],
    priority: 3,
  },
];

export const ALL_FEEDS: FeedSource[] = [
  ...TIER1_FEEDS,
  ...TIER2_FEEDS,
  ...TIER3_FEEDS,
];

/**
 * Generate a short hash from a string using SHA-256 via Web Crypto API.
 * Returns the first 8 hex characters.
 */
async function shortHash(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex.substring(0, 8);
}

/**
 * Extract text content from an XML tag.
 * Handles CDATA sections and encoded entities.
 */
function extractTag(xml: string, tagName: string): string {
  const patterns = [
    new RegExp(`<${tagName}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tagName}>`, "i"),
    new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`, "i"),
  ];

  for (const pattern of patterns) {
    const match = xml.match(pattern);
    if (match && match[1]) {
      return decodeEntities(match[1].trim());
    }
  }
  return "";
}

/**
 * Decode HTML/XML entities including numeric and named entities.
 */
function decodeEntities(text: string): string {
  return text
    // Named entities
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "...")
    .replace(/&mdash;/g, "\u2014")
    .replace(/&ndash;/g, "\u2013")
    .replace(/&lsquo;/g, "\u2018")
    .replace(/&rsquo;/g, "\u2019")
    .replace(/&ldquo;/g, "\u201C")
    .replace(/&rdquo;/g, "\u201D")
    // Decimal numeric entities (&#039; &#8217; etc.)
    .replace(/&#(\d+);/g, (_match, dec) => String.fromCharCode(parseInt(dec, 10)))
    // Hex numeric entities (&#x27; &#x2019; etc.)
    .replace(/&#x([0-9a-fA-F]+);/g, (_match, hex) => String.fromCharCode(parseInt(hex, 16)));
}

/**
 * Strip HTML tags from a string.
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

/**
 * Extract image URL from item XML.
 * Checks media:content, media:thumbnail, enclosure, and img tags in description.
 */
function extractImage(itemXml: string): string | null {
  // Check media:content or media:thumbnail
  const mediaMatch = itemXml.match(
    /<media:(?:content|thumbnail)[^>]*url=["']([^"']+)["']/i
  );
  if (mediaMatch) return mediaMatch[1];

  // Check enclosure with image type
  const enclosureMatch = itemXml.match(
    /<enclosure[^>]*type=["']image\/[^"']*["'][^>]*url=["']([^"']+)["']/i
  );
  if (enclosureMatch) return enclosureMatch[1];

  // Check enclosure url (even without type, sometimes used for images)
  const enclosureUrlMatch = itemXml.match(
    /<enclosure[^>]*url=["']([^"']+\.(?:jpg|jpeg|png|gif|webp)[^"']*)["']/i
  );
  if (enclosureUrlMatch) return enclosureUrlMatch[1];

  // Check for img tag in description/content
  const imgMatch = itemXml.match(/<img[^>]*src=["']([^"']+)["']/i);
  if (imgMatch) return imgMatch[1];

  return null;
}

/**
 * Parse a single RSS/Atom feed XML string into raw feed entries.
 */
function parseFeedXml(xml: string, source: FeedSource): RawFeedEntry[] {
  const entries: RawFeedEntry[] = [];

  // Try RSS <item> elements first
  const itemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;
  let foundItems = false;

  while ((match = itemRegex.exec(xml)) !== null) {
    foundItems = true;
    const itemXml = match[1];

    const title = extractTag(itemXml, "title");
    const link =
      extractTag(itemXml, "link") || extractTag(itemXml, "guid");
    const description = stripHtml(
      extractTag(itemXml, "description") || extractTag(itemXml, "content:encoded")
    );
    const pubDate =
      extractTag(itemXml, "pubDate") || extractTag(itemXml, "dc:date");
    const imageUrl = extractImage(itemXml);

    if (title && link) {
      entries.push({
        title,
        link,
        description: description.substring(0, 500),
        pubDate,
        imageUrl,
        sourceName: source.name,
        sourceUrl: source.url,
        sourceCategories: source.categories,
        sourcePriority: source.priority,
      });
    }
  }

  // If no RSS items found, try Atom <entry> elements
  if (!foundItems) {
    const entryRegex = /<entry[\s>]([\s\S]*?)<\/entry>/gi;

    while ((match = entryRegex.exec(xml)) !== null) {
      const entryXml = match[1];

      const title = extractTag(entryXml, "title");

      // Atom links use href attribute
      const linkMatch = entryXml.match(
        /<link[^>]*href=["']([^"']+)["'][^>]*rel=["']alternate["']/i
      );
      const linkMatchFallback = entryXml.match(
        /<link[^>]*href=["']([^"']+)["']/i
      );
      const link = linkMatch
        ? linkMatch[1]
        : linkMatchFallback
          ? linkMatchFallback[1]
          : "";

      const description = stripHtml(
        extractTag(entryXml, "summary") || extractTag(entryXml, "content")
      );
      const pubDate =
        extractTag(entryXml, "published") || extractTag(entryXml, "updated");
      const imageUrl = extractImage(entryXml);

      if (title && link) {
        entries.push({
          title,
          link,
          description: description.substring(0, 500),
          pubDate,
          imageUrl,
          sourceName: source.name,
          sourceUrl: source.url,
          sourceCategories: source.categories,
          sourcePriority: source.priority,
        });
      }
    }
  }

  return entries;
}

/**
 * Fetch and parse all RSS feeds.
 * Deduplicates items against DRAMARADAR_CACHE seen:{hash} keys.
 * Returns an array of new (not previously seen) raw feed entries.
 */
export async function fetchAndParseFeeds(env: Env): Promise<RawFeedEntry[]> {
  const fetchPromises = ALL_FEEDS.map(async (source) => {
    try {
      const response = await fetch(source.url, {
        headers: {
          "User-Agent": "DramaRadar/1.0 (https://dramaradar.com)",
          Accept: "application/rss+xml, application/xml, text/xml, application/atom+xml",
        },
        cf: { cacheTtl: 300 },
      });

      if (!response.ok) {
        console.error(
          `Failed to fetch ${source.name}: HTTP ${response.status}`
        );
        return [];
      }

      const xml = await response.text();
      return parseFeedXml(xml, source);
    } catch (error) {
      console.error(
        `Error fetching ${source.name}: ${error instanceof Error ? error.message : String(error)}`
      );
      return [];
    }
  });

  const results = await Promise.allSettled(fetchPromises);

  const allEntries: RawFeedEntry[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      allEntries.push(...result.value);
    }
  }

  // Deduplicate against previously seen items
  const newEntries: RawFeedEntry[] = [];
  const sevenDaysInSeconds = 7 * 24 * 60 * 60;

  for (const entry of allEntries) {
    const hash = await shortHash(entry.link);
    const cacheKey = `seen:${hash}`;

    const existing = await env.DRAMARADAR_CACHE.get(cacheKey);
    if (!existing) {
      // Mark as seen with 7-day TTL
      await env.DRAMARADAR_CACHE.put(cacheKey, "1", {
        expirationTtl: sevenDaysInSeconds,
      });
      newEntries.push(entry);
    }
  }

  console.log(
    `Fetched ${allEntries.length} total entries, ${newEntries.length} are new`
  );

  return newEntries;
}

export { shortHash };
