// Twitter/X posting module for DramaRadar
// Uses OAuth 1.0a to post tweets via the X API v2

import type { Env, FeedItem, EditorialArticle } from "./types";
import { SHOW_TAGS } from "./categorize";

const X_API_URL = "https://api.x.com/2/tweets";

// ============================================================
// OAuth 1.0a Signature Generation
// ============================================================

function percentEncode(str: string): string {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

function generateNonce(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let nonce = "";
  const values = new Uint8Array(32);
  crypto.getRandomValues(values);
  for (const v of values) {
    nonce += chars[v % chars.length];
  }
  return nonce;
}

async function hmacSha1(key: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

async function generateOAuthHeader(
  method: string,
  url: string,
  env: Env
): Promise<string> {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = generateNonce();

  const oauthParams: Record<string, string> = {
    oauth_consumer_key: env.X_API_KEY,
    oauth_nonce: nonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: timestamp,
    oauth_token: env.X_ACCESS_TOKEN,
    oauth_version: "1.0",
  };

  // Build parameter string (sorted)
  const paramString = Object.keys(oauthParams)
    .sort()
    .map((k) => `${percentEncode(k)}=${percentEncode(oauthParams[k])}`)
    .join("&");

  // Build signature base string
  const baseString = `${method.toUpperCase()}&${percentEncode(url)}&${percentEncode(paramString)}`;

  // Build signing key
  const signingKey = `${percentEncode(env.X_API_SECRET)}&${percentEncode(env.X_ACCESS_TOKEN_SECRET)}`;

  // Generate signature
  const signature = await hmacSha1(signingKey, baseString);
  oauthParams.oauth_signature = signature;

  // Build Authorization header
  const authHeader = Object.keys(oauthParams)
    .sort()
    .map((k) => `${percentEncode(k)}="${percentEncode(oauthParams[k])}"`)
    .join(", ");

  return `OAuth ${authHeader}`;
}

// ============================================================
// Tweet Posting
// ============================================================

async function postTweet(text: string, env: Env): Promise<{ success: boolean; tweetId?: string; error?: string }> {
  if (!env.X_API_KEY || !env.X_API_SECRET || !env.X_ACCESS_TOKEN || !env.X_ACCESS_TOKEN_SECRET) {
    return { success: false, error: "X API credentials not configured" };
  }

  try {
    const authHeader = await generateOAuthHeader("POST", X_API_URL, env);

    const res = await fetch(X_API_URL, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
        "User-Agent": "DramaRadar/1.0",
      },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`X API error ${res.status}: ${errorBody}`);
      return { success: false, error: `X API returned ${res.status}: ${errorBody}` };
    }

    const data = (await res.json()) as { data?: { id: string } };
    return { success: true, tweetId: data.data?.id };
  } catch (err) {
    console.error("Tweet posting failed:", err);
    return { success: false, error: String(err) };
  }
}

// ============================================================
// Tweet Formatting
// ============================================================

const SHOW_HASHTAGS: Record<string, string> = {
  "real-housewives-beverly-hills": "#RHOBH",
  "real-housewives-atlanta": "#RHOA",
  "real-housewives-new-jersey": "#RHONJ",
  "real-housewives-new-york": "#RHONY",
  "real-housewives-salt-lake-city": "#RHOSLC",
  "real-housewives-miami": "#RHOM",
  "real-housewives-potomac": "#RHOP",
  "real-housewives-dubai": "#RHODubai",
  "vanderpump-rules": "#PumpRules",
  "below-deck": "#BelowDeck",
  "summer-house": "#SummerHouse",
  "the-valley": "#TheValley",
  "southern-charm": "#SouthernCharm",
  "bachelor-bachelorette": "#TheBachelor",
  "love-island": "#LoveIsland",
  "90-day-fiance": "#90DayFiance",
  "selling-sunset": "#SellingSunset",
  "married-at-first-sight": "#MAFS",
};

function buildShowHashtags(showTags: string[]): string {
  const tags = showTags
    .map((t) => SHOW_HASHTAGS[t])
    .filter(Boolean)
    .slice(0, 3);
  return tags.join(" ");
}

function formatArticleTweet(article: EditorialArticle): string {
  const hashtags = buildShowHashtags(article.showTags);
  const base = article.isExclusive ? "EXCLUSIVE" : "NEW";
  const url = `https://dramaradar.com/articles/view?slug=${article.slug}`;

  // Keep under 280 chars
  let tweet = `${base}: ${article.title}\n\n${url}`;
  if (hashtags) {
    tweet += `\n\n${hashtags} #BravoTV #DramaRadar`;
  } else {
    tweet += "\n\n#BravoTV #RealityTV #DramaRadar";
  }

  if (tweet.length > 280) {
    // Truncate title if needed
    const maxTitle = 280 - (tweet.length - article.title.length) - 3;
    const shortTitle = article.title.slice(0, maxTitle) + "...";
    tweet = `${base}: ${shortTitle}\n\n${url}`;
    if (hashtags) {
      tweet += `\n\n${hashtags} #DramaRadar`;
    } else {
      tweet += "\n\n#DramaRadar";
    }
  }

  return tweet;
}

const FEED_TEMPLATES = [
  (item: FeedItem) => `${item.title}\n\nvia ${item.source}\n${item.url}`,
  (item: FeedItem) => `BREAKING: ${item.title}\n\n${item.url}\n\nvia ${item.source}`,
  (item: FeedItem) => `The latest from ${item.source}:\n\n${item.title}\n\n${item.url}`,
];

function formatFeedTweet(item: FeedItem): string {
  const template = FEED_TEMPLATES[Math.floor(Math.random() * FEED_TEMPLATES.length)];
  let tweet = template(item);

  const hashtags = buildShowHashtags(item.showTags);
  if (hashtags) {
    tweet += `\n\n${hashtags}`;
  }

  // Trim to 280
  if (tweet.length > 280) {
    tweet = tweet.slice(0, 277) + "...";
  }

  return tweet;
}

// ============================================================
// Dedup Tracking
// ============================================================

async function hasBeenPosted(key: string, env: Env): Promise<boolean> {
  const result = await env.DRAMARADAR_CACHE.get(`posted:${key}`);
  return result !== null;
}

async function markAsPosted(key: string, env: Env): Promise<void> {
  // 7-day TTL for dedup tracking
  await env.DRAMARADAR_CACHE.put(`posted:${key}`, "1", {
    expirationTtl: 7 * 24 * 60 * 60,
  });
}

// ============================================================
// Auto-posting Logic (called from cron)
// ============================================================

export async function autoPost(env: Env): Promise<void> {
  // Skip if credentials not set
  if (!env.X_API_KEY) return;

  // Only post ~15% of cron runs (roughly 10-20 tweets per day from 144 daily cron runs)
  if (Math.random() > 0.15) return;

  // Try posting a new article first, then fall back to a feed item
  const posted = await tryPostArticle(env) || await tryPostFeedItem(env);

  if (posted) {
    console.log("Auto-posted tweet successfully");
  }
}

async function tryPostArticle(env: Env): Promise<boolean> {
  const indexRaw = await env.DRAMARADAR_ARTICLES.get("articles:index");
  if (!indexRaw) return false;

  const slugs: string[] = JSON.parse(indexRaw);

  for (const slug of slugs) {
    const key = `article:${slug}`;
    if (await hasBeenPosted(key, env)) continue;

    const raw = await env.DRAMARADAR_ARTICLES.get(`article:${slug}`, "json");
    if (!raw) continue;

    const article = raw as EditorialArticle;
    const tweet = formatArticleTweet(article);
    const result = await postTweet(tweet, env);

    if (result.success) {
      await markAsPosted(key, env);
      return true;
    }
  }

  return false;
}

async function tryPostFeedItem(env: Env): Promise<boolean> {
  const indexRaw = await env.DRAMARADAR_CACHE.get("feed:index");
  if (!indexRaw) return false;

  const keys: string[] = JSON.parse(indexRaw);
  // Look at the 20 most recent items
  const recentKeys = keys.slice(0, 20);

  for (const itemKey of recentKeys) {
    if (await hasBeenPosted(itemKey, env)) continue;

    const raw = await env.DRAMARADAR_NEWS.get(itemKey, "json");
    if (!raw) continue;

    const item = raw as FeedItem;
    // Prefer higher priority items
    if (item.priority > 2) continue;

    const tweet = formatFeedTweet(item);
    const result = await postTweet(tweet, env);

    if (result.success) {
      await markAsPosted(itemKey, env);
      return true;
    }
  }

  return false;
}

// ============================================================
// Manual Tweet Endpoint Handler
// ============================================================

export async function handleManualTweet(
  request: Request,
  env: Env
): Promise<Response> {
  let body: { text?: string; slug?: string; type?: string };
  try {
    body = (await request.json()) as { text?: string; slug?: string; type?: string };
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body", status: 400 }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  let tweetText: string;

  if (body.text) {
    // Direct text tweet
    tweetText = body.text;
  } else if (body.slug) {
    // Tweet an article by slug
    const raw = await env.DRAMARADAR_ARTICLES.get(`article:${body.slug}`, "json");
    if (!raw) {
      return new Response(
        JSON.stringify({ error: "Article not found", status: 404 }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    tweetText = formatArticleTweet(raw as EditorialArticle);
  } else {
    return new Response(
      JSON.stringify({ error: "Provide either 'text' or 'slug' in the request body", status: 400 }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (tweetText.length > 280) {
    tweetText = tweetText.slice(0, 277) + "...";
  }

  const result = await postTweet(tweetText, env);

  if (result.success) {
    if (body.slug) {
      await markAsPosted(`article:${body.slug}`, env);
    }
    return new Response(
      JSON.stringify({ message: "Tweet posted", tweetId: result.tweetId, text: tweetText }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ error: result.error, status: 500 }),
    { status: 500, headers: { "Content-Type": "application/json" } }
  );
}
