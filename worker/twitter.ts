// Twitter/X posting bot for DramaRadar
// Full scheduled posting strategy: 15-20 tweets/day across article, news, prediction, and engagement types

import type { Env, FeedItem, EditorialArticle, Prediction } from "./types";
import { SHOW_TAGS } from "./categorize";

const X_API_URL = "https://api.x.com/2/tweets";

// ============================================================
// Eastern Time Helpers
// ============================================================

function getEasternNow(): { date: string; hour: number; minute: number } {
  const now = new Date();
  // EDT is UTC-4 (spring/summer)
  const etMs = now.getTime() - 4 * 60 * 60 * 1000;
  const et = new Date(etMs);
  return {
    date: et.toISOString().slice(0, 10),
    hour: et.getUTCHours(),
    minute: et.getUTCMinutes(),
  };
}

// ============================================================
// Posting Schedule (Eastern Time)
// ============================================================

type TweetType = "article" | "breaking" | "tier2" | "prediction" | "engagement";

interface PostSlot {
  hour: number;
  minute: number;
  type: TweetType;
  id: string;
}

const POSTING_SCHEDULE: PostSlot[] = [
  { hour: 7,  minute: 0,  type: "article",    id: "07-00-article" },
  { hour: 9,  minute: 0,  type: "breaking",   id: "09-00-breaking" },
  { hour: 10, minute: 30, type: "tier2",       id: "10-30-tier2" },
  { hour: 12, minute: 0,  type: "article",    id: "12-00-article" },
  { hour: 13, minute: 30, type: "breaking",   id: "13-30-breaking" },
  { hour: 15, minute: 0,  type: "tier2",       id: "15-00-tier2" },
  { hour: 15, minute: 15, type: "prediction", id: "15-15-prediction" },
  { hour: 16, minute: 30, type: "article",    id: "16-30-article" },
  { hour: 18, minute: 0,  type: "breaking",   id: "18-00-breaking" },
  { hour: 19, minute: 30, type: "engagement", id: "19-30-engagement" },
  { hour: 20, minute: 0,  type: "breaking",   id: "20-00-breaking" },
  { hour: 20, minute: 30, type: "tier2",       id: "20-30-tier2" },
  { hour: 21, minute: 0,  type: "breaking",   id: "21-00-breaking" },
  { hour: 21, minute: 30, type: "article",    id: "21-30-article" },
  { hour: 22, minute: 30, type: "breaking",   id: "22-30-breaking" },
  { hour: 23, minute: 30, type: "breaking",   id: "23-30-breaking" },
];

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

  const paramString = Object.keys(oauthParams)
    .sort()
    .map((k) => `${percentEncode(k)}=${percentEncode(oauthParams[k])}`)
    .join("&");

  const baseString = `${method.toUpperCase()}&${percentEncode(url)}&${percentEncode(paramString)}`;
  const signingKey = `${percentEncode(env.X_API_SECRET)}&${percentEncode(env.X_ACCESS_TOKEN_SECRET)}`;
  const signature = await hmacSha1(signingKey, baseString);
  oauthParams.oauth_signature = signature;

  const authHeader = Object.keys(oauthParams)
    .sort()
    .map((k) => `${percentEncode(k)}="${percentEncode(oauthParams[k])}"`)
    .join(", ");

  return `OAuth ${authHeader}`;
}

// ============================================================
// Core Tweet Posting
// ============================================================

async function postTweet(
  text: string,
  env: Env
): Promise<{ success: boolean; tweetId?: string; error?: string }> {
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
// Show Hashtag Mapping
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

function buildShowHashtags(showTags: string[], limit: number = 2): string {
  return showTags
    .map((t) => SHOW_HASHTAGS[t])
    .filter(Boolean)
    .slice(0, limit)
    .join(" ");
}

// Author display names for tweet bylines
const AUTHOR_NAMES: Record<string, string> = {
  carly: "Carly",
  bb: "BB",
  "bbs-assistant": "BB's Assistant",
  betsy: "Betsy",
  felicia: "Felicia",
  "the-drama-desk": "The Drama Desk",
  guest: "Guest Contributor",
};

// ============================================================
// Tweet Formatters (by type)
// ============================================================

function formatArticleTweet(article: EditorialArticle): string {
  const authorName = AUTHOR_NAMES[article.author] || "The Drama Desk";
  const showTags = buildShowHashtags(article.showTags);
  const url = `https://dramaradar.com/articles/${article.slug}`;

  let tweet = `\u{1F525} NEW on DramaRadar: ${article.title}\n\nBy ${authorName}\n\n\u{1F449} ${url}\n\n`;

  if (showTags) {
    tweet += `${showTags} #BravoTV #RealityTV #DramaRadar`;
  } else {
    tweet += "#BravoTV #RealityTV #DramaRadar";
  }

  // Trim to 280
  if (tweet.length > 280) {
    const maxTitle = article.title.length - (tweet.length - 280) - 3;
    if (maxTitle > 20) {
      const shortTitle = article.title.slice(0, maxTitle) + "...";
      tweet = `\u{1F525} NEW on DramaRadar: ${shortTitle}\n\nBy ${authorName}\n\n\u{1F449} ${url}\n\n`;
      tweet += showTags ? `${showTags} #DramaRadar` : "#DramaRadar";
    }
  }

  return tweet.slice(0, 280);
}

function formatBreakingTweet(item: FeedItem): string {
  const showTags = buildShowHashtags(item.showTags);

  let tweet = `\u{1F6A8} ${item.title}\n\n\u{1F4E1} Source: ${item.source}\n\nFull story + more drama: https://dramaradar.com\n\n`;

  if (showTags) {
    tweet += `${showTags} #BravoTV #RealityTV`;
  } else {
    tweet += "#BravoTV #RealityTV #CelebGossip";
  }

  if (tweet.length > 280) {
    const maxTitle = item.title.length - (tweet.length - 280) - 3;
    if (maxTitle > 20) {
      tweet = `\u{1F6A8} ${item.title.slice(0, maxTitle)}...\n\n\u{1F4E1} ${item.source}\n\nhttps://dramaradar.com\n\n`;
      tweet += showTags ? `${showTags} #BravoTV` : "#BravoTV #RealityTV";
    }
  }

  return tweet.slice(0, 280);
}

function formatTier2Tweet(item: FeedItem): string {
  const showTags = buildShowHashtags(item.showTags);

  let tweet = `\u{1F4FA} ${item.title}\n\n\u{1F4E1} Source: ${item.source}\n\nFull story + more drama: https://dramaradar.com\n\n`;

  if (showTags) {
    tweet += `${showTags} #BravoTV #RealityTV`;
  } else {
    tweet += "#RealityTV #BravoTV";
  }

  if (tweet.length > 280) {
    const maxTitle = item.title.length - (tweet.length - 280) - 3;
    if (maxTitle > 20) {
      tweet = `\u{1F4FA} ${item.title.slice(0, maxTitle)}...\n\n\u{1F4E1} ${item.source}\n\nhttps://dramaradar.com\n\n`;
      tweet += showTags ? `${showTags} #BravoTV` : "#RealityTV";
    }
  }

  return tweet.slice(0, 280);
}

function formatPredictionTweet(prediction: Prediction): string {
  const authorName = AUTHOR_NAMES[prediction.authorKey] || "The Drama Desk";
  const showTags = buildShowHashtags(prediction.showTags);

  let tweet = `\u{1F4E1} DramaRadar PREDICTION:\n\n${prediction.prediction}\n\n-- ${authorName}\n\nAll predictions: https://dramaradar.com/predictions\n\n`;

  if (showTags) {
    tweet += `${showTags} #DramaRadar`;
  } else {
    tweet += "#BravoTV #DramaRadar";
  }

  if (tweet.length > 280) {
    const maxPred = prediction.prediction.length - (tweet.length - 280) - 3;
    if (maxPred > 30) {
      tweet = `\u{1F4E1} DramaRadar PREDICTION:\n\n${prediction.prediction.slice(0, maxPred)}...\n\n-- ${authorName}\n\nhttps://dramaradar.com/predictions\n\n#DramaRadar`;
    }
  }

  return tweet.slice(0, 280);
}

// Pre-written engagement tweets (no links, designed for interaction)
const ENGAGEMENT_POOL: string[] = [
  "\u2615 DramaRadar wants to know:\n\nWho's handling the Summer House drama worst?\n\n\u{1F501} RT for Amanda\n\u2764\uFE0F Like for West\n\n#SummerHouse #BravoTV",
  "\u{1F4E1} The radar is picking up MAJOR activity tonight. Who else is watching? Drop your show below \u{1F447}\n\n#BravoTV #RealityTV",
  "\u2615 Hot take time:\n\nWhat's the most underrated Real Housewives franchise right now?\n\n#RealHousewives #BravoTV #DramaRadar",
  "\u{1F4E1} Quick poll: Best Bravo show of 2026 so far?\n\n\u{1F501} RT for Summer House\n\u2764\uFE0F Like for RHOBH\n\u{1F4AC} Reply for something else\n\n#BravoTV #DramaRadar",
  "\u2615 We need to settle this:\n\nBest reunion moment of all time?\n\nWe said what we said. Now it's your turn \u{1F447}\n\n#BravoTV #RealityTV #DramaRadar",
  "\u{1F4E1} DramaRadar is ALWAYS scanning.\n\nWhat show are you most excited about this week?\n\n#BravoTV #RealityTV",
  "\u2615 Honest question:\n\nWhich Bravo cast member would survive the longest on a desert island?\n\nWrong answers only \u{1F447}\n\n#BravoTV #DramaRadar",
  "\u{1F4E1} The radar just lit up.\n\nSomething big is about to break. Stay tuned.\n\n#BravoTV #RealityTV #DramaRadar",
  "\u2615 Rate your current reality TV obsession level:\n\n1\uFE0F\u20E3 Casual viewer\n2\uFE0F\u20E3 Weekly watcher\n3\uFE0F\u20E3 Follow the cast on IG\n4\uFE0F\u20E3 Read the Reddit threads at 2am\n5\uFE0F\u20E3 DramaRadar is my homepage\n\n#BravoTV",
  "\u{1F4E1} Name a reality TV villain who was actually right all along.\n\nWe'll go first: Phaedra. (Controversial? Maybe. But the receipts are there.)\n\n#BravoTV #RealityTV #DramaRadar",
  "\u2615 If you could only watch ONE Real Housewives franchise for the rest of your life, which one?\n\nChoose wisely \u{1F447}\n\n#RealHousewives #BravoTV",
  "\u{1F4E1} It's a Bravo night. Snacks are ready. Phone is charged. Group chat is open.\n\nWho's watching with us?\n\n#BravoTV #RealityTV #DramaRadar",
];

// ============================================================
// Dedup and Rate Limit Tracking
// ============================================================

async function hasBeenPosted(key: string, env: Env): Promise<boolean> {
  const result = await env.DRAMARADAR_CACHE.get(`posted:${key}`);
  return result !== null;
}

async function markAsPosted(key: string, env: Env): Promise<void> {
  await env.DRAMARADAR_CACHE.put(`posted:${key}`, "1", {
    expirationTtl: 7 * 24 * 60 * 60, // 7-day TTL
  });
}

async function getDailyCount(date: string, env: Env): Promise<number> {
  const raw = await env.DRAMARADAR_CACHE.get(`xbot:daily-count:${date}`);
  return raw ? parseInt(raw, 10) : 0;
}

async function incrementDailyCount(date: string, env: Env): Promise<void> {
  const current = await getDailyCount(date, env);
  await env.DRAMARADAR_CACHE.put(
    `xbot:daily-count:${date}`,
    String(current + 1),
    { expirationTtl: 48 * 60 * 60 } // 48h TTL so yesterday's count is still readable
  );
}

async function hasSlotBeenPosted(date: string, slotId: string, env: Env): Promise<boolean> {
  const result = await env.DRAMARADAR_CACHE.get(`xbot:slot:${date}:${slotId}`);
  return result !== null;
}

async function markSlotPosted(date: string, slotId: string, env: Env): Promise<void> {
  await env.DRAMARADAR_CACHE.put(
    `xbot:slot:${date}:${slotId}`,
    "1",
    { expirationTtl: 24 * 60 * 60 }
  );
}

// ============================================================
// Content Selection
// ============================================================

async function selectArticle(env: Env): Promise<EditorialArticle | null> {
  const indexRaw = await env.DRAMARADAR_ARTICLES.get("articles:index");
  if (!indexRaw) return null;

  const slugs: string[] = JSON.parse(indexRaw);

  // Priority: featured/exclusive unposted articles first, then any unposted
  const articles: EditorialArticle[] = [];
  for (const slug of slugs) {
    const raw = await env.DRAMARADAR_ARTICLES.get(`article:${slug}`, "json");
    if (raw) articles.push(raw as EditorialArticle);
  }

  // Sort: unposted featured/exclusive first, then unposted, then oldest posted
  const withStatus: Array<{ article: EditorialArticle; posted: boolean }> = [];
  for (const article of articles) {
    const posted = await hasBeenPosted(`article:${article.slug}`, env);
    withStatus.push({ article, posted });
  }

  // Unposted featured/exclusive first
  const unpostedFeatured = withStatus.filter(
    (a) => !a.posted && (a.article.isFeatured || a.article.isExclusive)
  );
  if (unpostedFeatured.length > 0) return unpostedFeatured[0].article;

  // Then any unposted
  const unposted = withStatus.filter((a) => !a.posted);
  if (unposted.length > 0) return unposted[0].article;

  // All posted, return null (will re-post after 7-day dedup expires)
  return null;
}

async function selectFeedItem(
  maxPriority: number,
  env: Env
): Promise<FeedItem | null> {
  const indexRaw = await env.DRAMARADAR_CACHE.get("feed:index");
  if (!indexRaw) return null;

  const keys: string[] = JSON.parse(indexRaw);
  // Check the 50 most recent items
  const recentKeys = keys.slice(0, 50);

  for (const itemKey of recentKeys) {
    if (await hasBeenPosted(itemKey, env)) continue;

    const raw = await env.DRAMARADAR_NEWS.get(itemKey, "json");
    if (!raw) continue;

    const item = raw as FeedItem;
    if (item.priority > maxPriority) continue;

    return item;
  }

  return null;
}

async function selectPrediction(env: Env): Promise<Prediction | null> {
  const indexRaw = await env.DRAMARADAR_ARTICLES.get("predictions:index");
  if (!indexRaw) return null;

  const ids: string[] = JSON.parse(indexRaw);

  for (const id of ids) {
    if (await hasBeenPosted(`prediction:${id}`, env)) continue;

    const raw = await env.DRAMARADAR_ARTICLES.get(`prediction:${id}`, "json");
    if (!raw) continue;

    return raw as Prediction;
  }

  return null;
}

function selectEngagementTweet(): string {
  const index = Math.floor(Math.random() * ENGAGEMENT_POOL.length);
  return ENGAGEMENT_POOL[index];
}

// ============================================================
// Scheduled Auto-Posting (called from cron)
// ============================================================

export async function autoPost(env: Env): Promise<void> {
  // Skip if credentials not set
  if (!env.X_API_KEY) return;

  const et = getEasternNow();
  const dailyCount = await getDailyCount(et.date, env);

  // Hard cap: 20 tweets per day
  if (dailyCount >= 20) {
    console.log(`X bot: daily cap reached (${dailyCount}/20), skipping`);
    return;
  }

  // Find slots that are due (within 10-min window of current time)
  const currentMinutes = et.hour * 60 + et.minute;

  for (const slot of POSTING_SCHEDULE) {
    const slotMinutes = slot.hour * 60 + slot.minute;

    // Check if current time is within [slot, slot+10min)
    if (currentMinutes < slotMinutes || currentMinutes >= slotMinutes + 10) {
      continue;
    }

    // Check if this slot has already been posted today
    if (await hasSlotBeenPosted(et.date, slot.id, env)) {
      continue;
    }

    // Re-check daily cap
    const count = await getDailyCount(et.date, env);
    if (count >= 20) break;

    console.log(`X bot: posting for slot ${slot.id} (type: ${slot.type})`);

    const success = await postForSlot(slot.type, env);

    if (success) {
      await markSlotPosted(et.date, slot.id, env);
      await incrementDailyCount(et.date, env);
      console.log(`X bot: slot ${slot.id} posted successfully (daily count: ${count + 1})`);
    } else {
      console.log(`X bot: slot ${slot.id} failed or no content available`);
    }
  }
}

async function postForSlot(type: TweetType, env: Env): Promise<boolean> {
  switch (type) {
    case "article": {
      const article = await selectArticle(env);
      if (!article) return false;
      const tweet = formatArticleTweet(article);
      const result = await postTweet(tweet, env);
      if (result.success) {
        await markAsPosted(`article:${article.slug}`, env);
        return true;
      }
      return false;
    }

    case "breaking": {
      // Tier 1 sources only (priority 1)
      const item = await selectFeedItem(1, env);
      if (!item) return false;
      const tweet = formatBreakingTweet(item);
      const result = await postTweet(tweet, env);
      if (result.success) {
        const timestamp = new Date(item.publishedAt).getTime();
        await markAsPosted(`item:${timestamp}:${item.id}`, env);
        return true;
      }
      return false;
    }

    case "tier2": {
      // Tier 1 and 2 sources (priority 1-2)
      const item = await selectFeedItem(2, env);
      if (!item) return false;
      const tweet = formatTier2Tweet(item);
      const result = await postTweet(tweet, env);
      if (result.success) {
        const timestamp = new Date(item.publishedAt).getTime();
        await markAsPosted(`item:${timestamp}:${item.id}`, env);
        return true;
      }
      return false;
    }

    case "prediction": {
      const prediction = await selectPrediction(env);
      if (!prediction) return false;
      const tweet = formatPredictionTweet(prediction);
      const result = await postTweet(tweet, env);
      if (result.success) {
        await markAsPosted(`prediction:${prediction.id}`, env);
        return true;
      }
      return false;
    }

    case "engagement": {
      const tweet = selectEngagementTweet();
      const result = await postTweet(tweet, env);
      return result.success;
    }

    default:
      return false;
  }
}

// ============================================================
// Manual Tweet Endpoint Handler
// ============================================================

export async function handleManualTweet(
  request: Request,
  env: Env
): Promise<Response> {
  let body: { text?: string; slug?: string };
  try {
    body = (await request.json()) as { text?: string; slug?: string };
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body", status: 400 }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  let tweetText: string;

  if (body.text) {
    tweetText = body.text;
  } else if (body.slug) {
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
    const et = getEasternNow();
    await incrementDailyCount(et.date, env);

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
