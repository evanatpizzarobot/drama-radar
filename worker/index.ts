// Main Worker entry point for DramaRadar

import type {
  Env,
  FeedItem,
  FeedResponse,
  BreakingResponse,
  TrendingData,
  EditorialArticle,
  ArticlesResponse,
  ShowsResponse,
  Prediction,
  PredictionsResponse,
} from "./types";
import { fetchAndParseFeeds, shortHash } from "./fetch-feeds";
import {
  isRelevantContent,
  categorizeItem,
  SHOW_TAGS,
} from "./categorize";
import { calculateTrending } from "./trending";
import { handleAdminRequest } from "./admin";
import { handleDramaDesk } from "./drama-desk";
import { autoPost, handleManualTweet, forcePost, botStatus } from "./twitter";
import { handleSubscribe, handleUnsubscribe, sendBreakingAlerts } from "./email";

// CORS headers applied to every response
const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function jsonResponse(data: unknown, status: number = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
    },
  });
}

function errorResponse(message: string, status: number): Response {
  return jsonResponse({ error: message, status }, status);
}

// ============================================================
// API Route Handlers
// ============================================================

/**
 * GET /api/feed
 * Paginated feed with optional filters: category, show, limit, offset, priority.
 */
async function handleFeed(
  url: URL,
  env: Env
): Promise<Response> {
  const category = url.searchParams.get("category") || undefined;
  const show = url.searchParams.get("show") || undefined;
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "20", 10), 100);
  const offset = parseInt(url.searchParams.get("offset") || "0", 10);
  const priorityParam = url.searchParams.get("priority");
  const priority = priorityParam ? parseInt(priorityParam, 10) : undefined;

  // Try to read from a cached feed index for faster lookups
  let indexKey = "feed:index";
  if (show) {
    indexKey = `feed:index:show:${show}`;
  } else if (category && category !== "all") {
    indexKey = `feed:index:${category}`;
  }

  const indexRaw = await env.DRAMARADAR_CACHE.get(indexKey);
  let itemKeys: string[] = [];

  if (indexRaw) {
    itemKeys = JSON.parse(indexRaw);
  } else {
    // Fallback: list all item keys from KV (slower path)
    const listResult = await env.DRAMARADAR_NEWS.list({ prefix: "item:" });
    itemKeys = listResult.keys.map((k) => k.name);
    // Sort by key (which includes timestamp) in reverse chronological order
    itemKeys.sort().reverse();
  }

  // Apply priority filter on the key list if needed (requires loading items)
  // Fetch the paginated slice plus a few extra for filtering
  const fetchStart = offset;
  const fetchEnd = priority !== undefined ? itemKeys.length : offset + limit;
  const keysSlice = itemKeys.slice(fetchStart, fetchEnd);

  // Batch load items from KV
  const items: FeedItem[] = [];
  for (const key of keysSlice) {
    const raw = await env.DRAMARADAR_NEWS.get(key, "json");
    if (raw) {
      const item = raw as FeedItem;

      // Apply priority filter
      if (priority !== undefined && item.priority !== priority) {
        continue;
      }

      items.push(item);

      // Stop once we have enough items (for priority-filtered queries)
      if (priority !== undefined && items.length >= limit) {
        break;
      }
    }
  }

  // If no priority filter, we already sliced correctly; just take the limit
  const paginatedItems = priority !== undefined ? items.slice(0, limit) : items.slice(0, limit);
  const total = itemKeys.length;

  const response: FeedResponse = {
    items: paginatedItems,
    total,
    hasMore: offset + limit < total,
  };

  return jsonResponse(response);
}

/**
 * GET /api/feed/breaking
 * Items from the last 2 hours with priority 1.
 */
async function handleBreaking(env: Env): Promise<Response> {
  const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;

  // Read the main feed index
  const indexRaw = await env.DRAMARADAR_CACHE.get("feed:index");
  let itemKeys: string[] = [];

  if (indexRaw) {
    itemKeys = JSON.parse(indexRaw);
  } else {
    const listResult = await env.DRAMARADAR_NEWS.list({ prefix: "item:" });
    itemKeys = listResult.keys.map((k) => k.name).sort().reverse();
  }

  const breakingItems: FeedItem[] = [];

  for (const key of itemKeys) {
    // Extract timestamp from key format item:{timestamp}:{hash}
    const parts = key.split(":");
    if (parts.length >= 2) {
      const timestamp = parseInt(parts[1], 10);
      // Skip items older than 2 hours based on key timestamp
      if (timestamp < twoHoursAgo) break;
    }

    const raw = await env.DRAMARADAR_NEWS.get(key, "json");
    if (raw) {
      const item = raw as FeedItem;
      if (item.priority === 1 && item.isBreaking) {
        breakingItems.push(item);
      }
    }
  }

  const response: BreakingResponse = {
    items: breakingItems,
    count: breakingItems.length,
  };

  return jsonResponse(response);
}

/**
 * GET /api/trending
 * Returns current trending data from cache.
 */
async function handleTrending(env: Env): Promise<Response> {
  const raw = await env.DRAMARADAR_CACHE.get("trending:current", "json");

  if (raw) {
    return jsonResponse(raw);
  }

  // Return empty trending data if none cached yet
  const empty: TrendingData = {
    updatedAt: new Date().toISOString(),
    topShows: [],
    topPeople: [],
    hotStory: null,
  };

  return jsonResponse(empty);
}

/**
 * GET /api/articles
 * List editorial articles with optional filters.
 */
async function handleArticles(
  url: URL,
  env: Env
): Promise<Response> {
  const featured = url.searchParams.get("featured");
  const show = url.searchParams.get("show");
  const author = url.searchParams.get("author");
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "20", 10), 100);

  // Read article index
  const indexRaw = await env.DRAMARADAR_ARTICLES.get("articles:index");
  const slugs: string[] = indexRaw ? JSON.parse(indexRaw) : [];

  const articles: EditorialArticle[] = [];

  for (const slug of slugs) {
    const raw = await env.DRAMARADAR_ARTICLES.get(`article:${slug}`, "json");
    if (!raw) continue;

    const article = raw as EditorialArticle;

    // Apply filters
    if (featured === "true" && !article.isFeatured) continue;
    if (show && !article.showTags.includes(show)) continue;
    if (author && article.author !== author) continue;

    articles.push(article);
  }

  // Sort by publishedAt descending
  articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const limited = articles.slice(0, limit);

  const response: ArticlesResponse = {
    articles: limited,
    total: articles.length,
  };

  return jsonResponse(response);
}

/**
 * GET /api/articles/:slug
 * Single article by slug.
 */
async function handleArticleBySlug(
  slug: string,
  env: Env
): Promise<Response> {
  const raw = await env.DRAMARADAR_ARTICLES.get(`article:${slug}`, "json");

  if (!raw) {
    return errorResponse("Article not found", 404);
  }

  return jsonResponse(raw);
}

/**
 * GET /api/shows
 * Show definitions with article counts.
 */
async function handleShows(env: Env): Promise<Response> {
  // Count articles per show tag
  const indexRaw = await env.DRAMARADAR_ARTICLES.get("articles:index");
  const slugs: string[] = indexRaw ? JSON.parse(indexRaw) : [];

  const tagCounts: Record<string, number> = {};

  for (const slug of slugs) {
    const raw = await env.DRAMARADAR_ARTICLES.get(`article:${slug}`, "json");
    if (!raw) continue;

    const article = raw as EditorialArticle;
    for (const tag of article.showTags) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  }

  const shows = Object.entries(SHOW_TAGS).map(([tag, show]) => ({
    tag,
    label: show.label,
    fullName: show.fullName,
    color: show.color,
    articleCount: tagCounts[tag] || 0,
  }));

  const response: ShowsResponse = { shows };
  return jsonResponse(response);
}

/**
 * GET /api/agent
 * AI agent discovery endpoint. Returns structured metadata about available APIs and tracked shows.
 */
function handleAgent(env: Env): Response {
  return jsonResponse({
    name: "DramaRadar",
    description: "Real-time reality TV and celebrity gossip aggregator with original editorial content",
    url: "https://dramaradar.com",
    feeds: {
      all: "/api/feed",
      breaking: "/api/feed/breaking",
      articles: "/api/articles",
      predictions: "/api/predictions",
      trending: "/api/trending",
      horoscope: "/api/horoscope?sign={sign}&period={daily|weekly|monthly}",
    },
    shows: Object.keys(SHOW_TAGS),
    updated: new Date().toISOString(),
  });
}

/**
 * GET /api/health
 * Basic health check endpoint.
 */
function handleHealth(env: Env): Response {
  return jsonResponse({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: env.ENVIRONMENT || "production",
  });
}

/**
 * GET /api/predictions
 * List predictions with optional status filter.
 */
async function handlePredictions(
  url: URL,
  env: Env
): Promise<Response> {
  const statusFilter = url.searchParams.get("status") || undefined;

  const indexRaw = await env.DRAMARADAR_ARTICLES.get("predictions:index");
  const ids: string[] = indexRaw ? JSON.parse(indexRaw) : [];

  const predictions: Prediction[] = [];

  for (const id of ids) {
    const raw = await env.DRAMARADAR_ARTICLES.get(`prediction:${id}`, "json");
    if (!raw) continue;

    const prediction = raw as Prediction;

    if (statusFilter && prediction.status !== statusFilter) continue;

    predictions.push(prediction);
  }

  // Sort newest first by createdAt
  predictions.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const response: PredictionsResponse = {
    predictions,
    total: predictions.length,
  };

  return jsonResponse(response);
}

/**
 * GET /api/horoscope?sign={sign}&period={daily|weekly|monthly}
 * Fetches horoscope data with caching layer.
 */
async function handleHoroscope(
  url: URL,
  env: Env
): Promise<Response> {
  const sign = url.searchParams.get("sign");
  const period = url.searchParams.get("period") || "daily";

  if (!sign) {
    return errorResponse("Missing required parameter: sign", 400);
  }

  const validSigns = [
    "aries", "taurus", "gemini", "cancer", "leo", "virgo",
    "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
  ];
  const validPeriods = ["daily", "weekly", "monthly"];

  if (!validSigns.includes(sign.toLowerCase())) {
    return errorResponse("Invalid sign", 400);
  }
  if (!validPeriods.includes(period)) {
    return errorResponse("Invalid period. Use daily, weekly, or monthly.", 400);
  }

  const cacheKey = `horoscope:${sign.toLowerCase()}:${period}`;

  // Try cache first
  const cached = await env.DRAMARADAR_CACHE.get(cacheKey, "json");
  if (cached) {
    return jsonResponse({ data: cached, cached: true });
  }

  // Fetch from external API
  const apiUrl = `https://freehoroscopeapi.com/api/v1/get-horoscope/${period}?sign=${encodeURIComponent(sign)}`;

  try {
    const apiRes = await fetch(apiUrl, {
      headers: { "User-Agent": "DramaRadar/1.0" },
    });

    if (!apiRes.ok) {
      throw new Error(`Horoscope API returned ${apiRes.status}`);
    }

    const apiData = (await apiRes.json()) as { data: Record<string, unknown> };

    // Cache with TTL based on period
    const ttlMap: Record<string, number> = {
      daily: 6 * 60 * 60,       // 6 hours
      weekly: 24 * 60 * 60,     // 24 hours
      monthly: 48 * 60 * 60,    // 48 hours
    };

    await env.DRAMARADAR_CACHE.put(
      cacheKey,
      JSON.stringify(apiData.data),
      { expirationTtl: ttlMap[period] }
    );

    return jsonResponse({ data: apiData.data, cached: false });
  } catch (err) {
    // If external API fails, try to serve stale cache from a broader search
    const staleKey = `horoscope:${sign.toLowerCase()}:${period}`;
    const stale = await env.DRAMARADAR_CACHE.get(staleKey, "json");
    if (stale) {
      return jsonResponse({ data: stale, cached: true, stale: true });
    }

    console.error("Horoscope fetch failed:", err);
    return errorResponse("Horoscope data temporarily unavailable", 503);
  }
}

// ============================================================
// Fetch Handler (HTTP requests)
// ============================================================

async function handleFetchRequest(
  request: Request,
  env: Env
): Promise<Response> {
  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS,
    });
  }

  const url = new URL(request.url);
  const path = url.pathname;

  // Route matching
  if (path === "/api/feed" && request.method === "GET") {
    return handleFeed(url, env);
  }

  if (path === "/api/feed/breaking" && request.method === "GET") {
    return handleBreaking(env);
  }

  if (path === "/api/trending" && request.method === "GET") {
    return handleTrending(env);
  }

  if (path === "/api/articles" && request.method === "GET") {
    return handleArticles(url, env);
  }

  if (path.startsWith("/api/articles/") && request.method === "GET") {
    const slug = path.replace("/api/articles/", "");
    return handleArticleBySlug(slug, env);
  }

  if (path === "/api/shows" && request.method === "GET") {
    return handleShows(env);
  }

  if (path === "/api/predictions" && request.method === "GET") {
    return handlePredictions(url, env);
  }

  if (path === "/api/horoscope" && request.method === "GET") {
    return handleHoroscope(url, env);
  }

  if (path === "/api/agent" && request.method === "GET") {
    return handleAgent(env);
  }

  if (path === "/api/xbot/status" && request.method === "GET") {
    return botStatus(env);
  }

  if (path === "/api/xbot/force" && request.method === "POST") {
    return forcePost(env);
  }

  if (path === "/api/subscribe" && request.method === "POST") {
    return handleSubscribe(request, env);
  }

  if (path === "/api/unsubscribe" && request.method === "GET") {
    return handleUnsubscribe(url, env);
  }

  if (path === "/api/health" && request.method === "GET") {
    return handleHealth(env);
  }

  // Drama Desk AI chat
  if (path === "/api/drama-desk" && request.method === "POST") {
    return handleDramaDesk(request, env);
  }

  // Admin routes
  if (path.startsWith("/api/admin/")) {
    return handleAdminRequest(request, env);
  }

  return errorResponse("Not found", 404);
}

// ============================================================
// Scheduled Handler (Cron)
// ============================================================

async function handleScheduled(
  _controller: ScheduledController,
  env: Env,
  _ctx: ExecutionContext
): Promise<void> {
  console.log("Starting scheduled feed fetch...");

  // Step 1: Fetch all RSS feeds
  const rawEntries = await fetchAndParseFeeds(env);
  console.log(`Fetched ${rawEntries.length} new entries from RSS feeds`);

  // Step 2: Filter irrelevant content
  const relevant = rawEntries.filter((entry) =>
    isRelevantContent(entry.title, entry.description)
  );
  console.log(`${relevant.length} entries passed relevance filter`);

  // Step 3: Categorize items
  const categorizedItems: FeedItem[] = [];
  for (const entry of relevant) {
    const item = await categorizeItem(entry);
    categorizedItems.push(item);
  }

  // Step 4: Write new items to DRAMARADAR_NEWS
  const thirtyDaysInSeconds = 30 * 24 * 60 * 60;
  for (const item of categorizedItems) {
    const timestamp = new Date(item.publishedAt).getTime();
    const key = `item:${timestamp}:${item.id}`;
    await env.DRAMARADAR_NEWS.put(key, JSON.stringify(item), {
      expirationTtl: thirtyDaysInSeconds,
    });
  }

  // Step 5: Update feed indexes in DRAMARADAR_CACHE
  await updateFeedIndexes(env);

  // Step 6: Calculate and store trending data (with historical comparison)
  const allRecentItems = await loadRecentItems(env);
  const trending = await calculateTrending(allRecentItems, env);
  await env.DRAMARADAR_CACHE.put(
    "trending:current",
    JSON.stringify(trending),
    { expirationTtl: 24 * 60 * 60 }
  );

  // Step 7: Send breaking alerts to email subscribers
  await sendBreakingAlerts(categorizedItems, env);

  // Step 8: Auto-post to X (scheduled, ~15-20 tweets per day)
  await autoPost(env);

  console.log(
    `Scheduled job complete: ${categorizedItems.length} items processed, trending updated`
  );
}

/**
 * Rebuild feed index keys in DRAMARADAR_CACHE.
 * Creates indexes for: all items, per category, and per show tag.
 */
async function updateFeedIndexes(env: Env): Promise<void> {
  const listResult = await env.DRAMARADAR_NEWS.list({ prefix: "item:" });
  const allKeys = listResult.keys.map((k) => k.name);

  // Sort reverse chronological (keys contain timestamps)
  allKeys.sort().reverse();

  // Store the main index
  const oneDayTtl = 24 * 60 * 60;
  await env.DRAMARADAR_CACHE.put(
    "feed:index",
    JSON.stringify(allKeys),
    { expirationTtl: oneDayTtl }
  );

  // Build category and show indexes by loading each item
  const categoryIndexes: Record<string, string[]> = {};
  const showIndexes: Record<string, string[]> = {};

  for (const key of allKeys) {
    const raw = await env.DRAMARADAR_NEWS.get(key, "json");
    if (!raw) continue;

    const item = raw as FeedItem;

    for (const cat of item.categories) {
      if (!categoryIndexes[cat]) categoryIndexes[cat] = [];
      categoryIndexes[cat].push(key);
    }

    for (const tag of item.showTags) {
      if (!showIndexes[tag]) showIndexes[tag] = [];
      showIndexes[tag].push(key);
    }
  }

  // Write category indexes
  for (const [cat, keys] of Object.entries(categoryIndexes)) {
    await env.DRAMARADAR_CACHE.put(
      `feed:index:${cat}`,
      JSON.stringify(keys),
      { expirationTtl: oneDayTtl }
    );
  }

  // Write show indexes
  for (const [tag, keys] of Object.entries(showIndexes)) {
    await env.DRAMARADAR_CACHE.put(
      `feed:index:show:${tag}`,
      JSON.stringify(keys),
      { expirationTtl: oneDayTtl }
    );
  }
}

/**
 * Load recent items from DRAMARADAR_NEWS for trending calculation.
 */
async function loadRecentItems(env: Env): Promise<FeedItem[]> {
  const listResult = await env.DRAMARADAR_NEWS.list({ prefix: "item:" });
  const items: FeedItem[] = [];

  for (const key of listResult.keys) {
    const raw = await env.DRAMARADAR_NEWS.get(key.name, "json");
    if (raw) {
      items.push(raw as FeedItem);
    }
  }

  return items;
}

// ============================================================
// Worker Export
// ============================================================

export default {
  fetch: handleFetchRequest,
  scheduled: handleScheduled,
} satisfies ExportedHandler<Env>;
