import type { Env, FeedItem } from "./types";

interface DramaDeskRequest {
  question: string;
}

interface DramaDeskSource {
  title: string;
  source: string;
  url: string;
}

interface DramaDeskResponse {
  answer: string;
  sources: DramaDeskSource[];
  disclaimer: string;
}

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "shall", "can", "need", "dare", "ought",
  "used", "to", "of", "in", "for", "on", "with", "at", "by", "from",
  "as", "into", "through", "during", "before", "after", "above", "below",
  "between", "out", "off", "over", "under", "again", "further", "then",
  "once", "here", "there", "when", "where", "why", "how", "all", "both",
  "each", "few", "more", "most", "other", "some", "such", "no", "nor",
  "not", "only", "own", "same", "so", "than", "too", "very", "just",
  "because", "but", "and", "or", "if", "while", "about", "what", "which",
  "who", "whom", "this", "that", "these", "those", "am", "it", "its",
  "i", "me", "my", "we", "our", "you", "your", "he", "him", "his",
  "she", "her", "they", "them", "their", "up", "down", "tell", "know",
  "think", "going", "happening", "whats", "what's",
]);

const MAX_QUESTION_LENGTH = 500;
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_TTL = 3600;
const DISCLAIMER_TEXT =
  "The Drama Desk pulls from recent news. Always check sources for full details.";

function extractKeywords(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
}

function scoreFeedItem(item: FeedItem, keywords: string[]): number {
  const text = `${item.title} ${item.description} ${item.categories.join(" ")} ${item.showTags.join(" ")}`.toLowerCase();
  let score = 0;
  for (const keyword of keywords) {
    if (text.includes(keyword)) {
      score += 1;
      // Boost for title matches
      if (item.title.toLowerCase().includes(keyword)) {
        score += 2;
      }
    }
  }
  return score;
}

export async function searchFeedItems(
  query: string,
  env: Env,
  topN: number = 5
): Promise<FeedItem[]> {
  const keywords = extractKeywords(query);
  if (keywords.length === 0) return [];

  // Load feed index from cache
  const indexRaw = await env.DRAMARADAR_CACHE.get("feed:index");
  if (!indexRaw) return [];

  let itemIds: string[];
  try {
    itemIds = JSON.parse(indexRaw) as string[];
  } catch {
    return [];
  }

  // Load up to 200 recent items
  const recentIds = itemIds.slice(0, 200);
  const items: FeedItem[] = [];

  // Load items in batches to avoid excessive KV reads
  const batchSize = 50;
  for (let i = 0; i < recentIds.length; i += batchSize) {
    const batch = recentIds.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map((id) => env.DRAMARADAR_NEWS.get(`item:${id}`))
    );
    for (const raw of results) {
      if (raw) {
        try {
          items.push(JSON.parse(raw) as FeedItem);
        } catch {
          // Skip malformed items
        }
      }
    }
  }

  // Score and rank
  const scored = items
    .map((item) => ({ item, score: scoreFeedItem(item, keywords) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  return scored.map((entry) => entry.item);
}

async function checkRateLimit(
  ip: string,
  env: Env
): Promise<{ allowed: boolean; remaining: number }> {
  const key = `ratelimit:dramadesk:${ip}`;
  const raw = await env.DRAMARADAR_CACHE.get(key);

  let count = 0;
  if (raw) {
    count = parseInt(raw, 10) || 0;
  }

  if (count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  await env.DRAMARADAR_CACHE.put(key, String(count + 1), {
    expirationTtl: RATE_LIMIT_TTL,
  });

  return { allowed: true, remaining: RATE_LIMIT_MAX - count - 1 };
}

function buildContext(items: FeedItem[]): string {
  if (items.length === 0) return "";

  return items
    .map(
      (item, i) =>
        `[${i + 1}] "${item.title}" (${item.source}, ${item.publishedAt})\n${item.description}`
    )
    .join("\n\n");
}

const SYSTEM_PROMPT = `You are "The Drama Desk," the sassiest and most well-connected gossip expert on the internet. You work for DramaRadar.com, a reality TV and entertainment gossip news aggregator.

Your personality:
- Sassy, witty, and opinionated, but never mean-spirited
- You live for the tea and love a good plot twist
- Use gossip slang naturally (tea, spill, receipts, shade, messy, iconic) but do not overdo it
- Fun and entertaining to chat with
- You care about the people you discuss, even when calling out the mess

Your rules:
- Keep responses under 200 words
- Reference specific details from the context provided (names, shows, events)
- If the context does not cover the topic, say your radar is not picking up much on that right now and suggest they check back later
- NEVER make up fake gossip, rumors, or details not in the provided context
- Stay focused on entertainment, reality TV, and celebrity gossip topics
- If asked about something outside your scope, redirect playfully
- NEVER use em dashes or double hyphens as dash substitutes. Use commas, periods, or semicolons instead.`;

export async function handleDramaDesk(
  request: Request,
  env: Env
): Promise<Response> {
  // Only accept POST
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Parse and validate request body
  let body: DramaDeskRequest;
  try {
    body = (await request.json()) as DramaDeskRequest;
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const question = (body.question || "").trim();
  if (!question) {
    return new Response(
      JSON.stringify({ error: "Question is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (question.length > MAX_QUESTION_LENGTH) {
    return new Response(
      JSON.stringify({
        error: `Question must be ${MAX_QUESTION_LENGTH} characters or fewer`,
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Rate limiting
  const ip =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For") ||
    "unknown";

  const { allowed } = await checkRateLimit(ip, env);
  if (!allowed) {
    return new Response(
      JSON.stringify({
        error:
          "The Drama Desk needs a coffee break. You have hit the rate limit. Try again in a bit!",
      }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  // Search for relevant feed items
  const matchingItems = await searchFeedItems(question, env);

  // Build context
  const context = buildContext(matchingItems);

  // Build messages for AI
  const userMessage = context
    ? `Here is recent news context:\n\n${context}\n\nUser question: ${question}`
    : `The radar is not picking up specific recent articles on this topic.\n\nUser question: ${question}`;

  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    { role: "user" as const, content: userMessage },
  ];

  // Call Workers AI
  try {
    const aiResponse = await env.AI.run(
      "@cf/meta/llama-3.1-8b-instruct",
      {
        messages,
        max_tokens: 300,
        temperature: 0.8,
      }
    );

    const answer =
      typeof aiResponse.response === "string"
        ? aiResponse.response
        : "The Drama Desk is at a loss for words (a first, honestly). Try asking again!";

    // Build sources from matching items
    const sources: DramaDeskSource[] = matchingItems.map((item) => ({
      title: item.title,
      source: item.source,
      url: item.url,
    }));

    const responseBody: DramaDeskResponse = {
      answer,
      sources,
      disclaimer: DISCLAIMER_TEXT,
    };

    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Drama Desk AI error:", err);

    const fallbackResponse: DramaDeskResponse = {
      answer:
        "The Drama Desk is experiencing some technical difficulties (the intern tripped over the power cord). Try again in a moment!",
      sources: [],
      disclaimer: DISCLAIMER_TEXT,
    };

    return new Response(JSON.stringify(fallbackResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
