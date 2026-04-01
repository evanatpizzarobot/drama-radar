// Web Push notification module for DramaRadar
// Uses web-push library's generateRequestDetails + native fetch

import webpush from "web-push";
import type { Env, FeedItem } from "./types";

interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

// ============================================================
// Hashing
// ============================================================

async function hashEndpoint(endpoint: string): Promise<string> {
  const data = new TextEncoder().encode(endpoint);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 16);
}

// ============================================================
// Send Push Notification
// ============================================================

async function sendPush(
  subscription: PushSubscription,
  payload: string,
  env: Env
): Promise<boolean> {
  try {
    webpush.setVapidDetails(
      env.VAPID_SUBJECT,
      env.VAPID_PUBLIC_KEY,
      env.VAPID_PRIVATE_KEY
    );

    const details = webpush.generateRequestDetails(
      subscription,
      payload,
      { TTL: 60 * 60 } // 1 hour
    );

    const res = await fetch(details.endpoint, {
      method: details.method,
      headers: details.headers as Record<string, string>,
      body: details.body,
    });

    if (res.status === 410 || res.status === 404) {
      // Subscription expired or invalid, clean it up
      const hash = await hashEndpoint(subscription.endpoint);
      await env.DRAMARADAR_CACHE.delete(`push:${hash}`);
      return false;
    }

    return res.status >= 200 && res.status < 300;
  } catch (err) {
    console.error("Push send failed:", err);
    return false;
  }
}

// ============================================================
// Subscribe Endpoint
// ============================================================

export async function handlePushSubscribe(
  request: Request,
  env: Env
): Promise<Response> {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };

  let subscription: PushSubscription;
  try {
    subscription = (await request.json()) as PushSubscription;
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400, headers }
    );
  }

  if (!subscription.endpoint || !subscription.keys?.p256dh || !subscription.keys?.auth) {
    return new Response(
      JSON.stringify({ error: "Invalid push subscription" }),
      { status: 400, headers }
    );
  }

  const hash = await hashEndpoint(subscription.endpoint);

  // Store subscription
  await env.DRAMARADAR_CACHE.put(`push:${hash}`, JSON.stringify(subscription));

  // Update index
  const indexRaw = await env.DRAMARADAR_CACHE.get("push:subscribers");
  const index: string[] = indexRaw ? JSON.parse(indexRaw) : [];
  if (!index.includes(hash)) {
    index.push(hash);
    await env.DRAMARADAR_CACHE.put("push:subscribers", JSON.stringify(index));
  }

  return new Response(
    JSON.stringify({ message: "Subscribed to push notifications" }),
    { status: 201, headers }
  );
}

// ============================================================
// Unsubscribe Endpoint
// ============================================================

export async function handlePushUnsubscribe(
  request: Request,
  env: Env
): Promise<Response> {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };

  let body: { endpoint?: string };
  try {
    body = (await request.json()) as { endpoint?: string };
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400, headers }
    );
  }

  if (!body.endpoint) {
    return new Response(
      JSON.stringify({ error: "Missing endpoint" }),
      { status: 400, headers }
    );
  }

  const hash = await hashEndpoint(body.endpoint);
  await env.DRAMARADAR_CACHE.delete(`push:${hash}`);

  // Remove from index
  const indexRaw = await env.DRAMARADAR_CACHE.get("push:subscribers");
  if (indexRaw) {
    const index: string[] = JSON.parse(indexRaw);
    const updated = index.filter((h) => h !== hash);
    await env.DRAMARADAR_CACHE.put("push:subscribers", JSON.stringify(updated));
  }

  return new Response(
    JSON.stringify({ message: "Unsubscribed from push notifications" }),
    { status: 200, headers }
  );
}

// ============================================================
// Send Breaking Push Alerts (called from cron)
// ============================================================

export async function sendPushAlerts(
  items: FeedItem[],
  env: Env
): Promise<void> {
  if (!env.VAPID_PUBLIC_KEY || !env.VAPID_PRIVATE_KEY) return;

  // Check daily push count (max 5)
  const today = new Date().toISOString().slice(0, 10);
  const countKey = `push:daily-count:${today}`;
  const countRaw = await env.DRAMARADAR_CACHE.get(countKey);
  const dailyCount = countRaw ? parseInt(countRaw, 10) : 0;
  if (dailyCount >= 5) return;

  // Find Tier 1 breaking items from the last 30 minutes
  const thirtyMinAgo = Date.now() - 30 * 60 * 1000;

  const breakingItems = items.filter((item) => {
    if (item.priority !== 1 || !item.isBreaking) return false;
    return new Date(item.publishedAt).getTime() > thirtyMinAgo;
  });

  if (breakingItems.length === 0) return;

  // Find the first unalerted item
  let alertItem: FeedItem | null = null;
  for (const item of breakingItems) {
    const sentKey = `push:alert-sent:${item.id}`;
    const sent = await env.DRAMARADAR_CACHE.get(sentKey);
    if (!sent) {
      alertItem = item;
      break;
    }
  }

  if (!alertItem) return;

  // Build payload
  const payload = JSON.stringify({
    title: "BREAKING on DramaRadar",
    body: alertItem.title.length > 100
      ? alertItem.title.slice(0, 97) + "..."
      : alertItem.title,
    url: "https://dramaradar.com",
    tag: `breaking-${alertItem.id}`,
  });

  // Get subscribers
  const indexRaw = await env.DRAMARADAR_CACHE.get("push:subscribers");
  if (!indexRaw) return;
  const hashes: string[] = JSON.parse(indexRaw);

  let sentCount = 0;

  for (const hash of hashes) {
    const subRaw = await env.DRAMARADAR_CACHE.get(`push:${hash}`);
    if (!subRaw) continue;

    const subscription = JSON.parse(subRaw) as PushSubscription;
    const success = await sendPush(subscription, payload, env);
    if (success) sentCount++;
  }

  // Mark as sent
  await env.DRAMARADAR_CACHE.put(`push:alert-sent:${alertItem.id}`, "1", {
    expirationTtl: 24 * 60 * 60,
  });

  // Increment daily count
  await env.DRAMARADAR_CACHE.put(countKey, String(dailyCount + 1), {
    expirationTtl: 48 * 60 * 60,
  });

  if (sentCount > 0) {
    console.log(`Push alert sent to ${sentCount} subscribers: ${alertItem.title}`);
  }
}
