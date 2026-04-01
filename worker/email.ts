// Email alert system for DramaRadar via Resend
// Handles subscriptions, welcome emails, and breaking news alerts

import type { Env, FeedItem } from "./types";

const RESEND_API_URL = "https://api.resend.com/emails";
const FROM_ADDRESS = "DramaRadar Alerts <alerts@dramaradar.com>";
const SITE_URL = "https://dramaradar.com";

// ============================================================
// Email Sending via Resend
// ============================================================

async function sendEmail(
  to: string,
  subject: string,
  html: string,
  env: Env
): Promise<boolean> {
  if (!env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured");
    return false;
  }

  try {
    const res = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [to],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`Resend error ${res.status}: ${err}`);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Email send failed:", err);
    return false;
  }
}

// ============================================================
// Hashing
// ============================================================

async function hashEmail(email: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(email.toLowerCase().trim());
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 16);
}

// ============================================================
// Subscribe Endpoint
// ============================================================

export async function handleSubscribe(
  request: Request,
  env: Env
): Promise<Response> {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };

  let body: { email?: string };
  try {
    body = (await request.json()) as { email?: string };
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400, headers }
    );
  }

  const email = body.email?.toLowerCase().trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(
      JSON.stringify({ error: "Invalid email address" }),
      { status: 400, headers }
    );
  }

  const emailHash = await hashEmail(email);
  const key = `subscriber:${emailHash}`;

  // Check if already subscribed
  const existing = await env.DRAMARADAR_CACHE.get(key, "json");
  if (existing) {
    const sub = existing as { active: boolean };
    if (sub.active) {
      return new Response(
        JSON.stringify({ message: "You're already on the list." }),
        { status: 200, headers }
      );
    }
    // Reactivate
  }

  // Store subscriber
  const subscriber = {
    email,
    subscribedAt: new Date().toISOString(),
    active: true,
  };

  await env.DRAMARADAR_CACHE.put(key, JSON.stringify(subscriber));

  // Update subscriber index
  const indexRaw = await env.DRAMARADAR_CACHE.get("subscribers:index");
  const index: string[] = indexRaw ? JSON.parse(indexRaw) : [];
  if (!index.includes(emailHash)) {
    index.push(emailHash);
    await env.DRAMARADAR_CACHE.put("subscribers:index", JSON.stringify(index));
  }

  // Send welcome email
  const unsubLink = `${SITE_URL}/api/unsubscribe?token=${emailHash}`;
  const welcomeHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #2D2D3A;">
      <div style="text-align: center; padding: 32px 0 24px;">
        <h1 style="font-size: 28px; font-weight: 800; margin: 0;">
          <span style="background: linear-gradient(135deg, #E84393, #A855F7); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">DramaRadar</span>
        </h1>
        <p style="color: #7A7A8E; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-top: 4px;">Always Scanning</p>
      </div>
      <div style="padding: 24px; background: #FFF5F7; border-radius: 12px; border: 1px solid #F0D4DC;">
        <h2 style="font-size: 20px; margin: 0 0 12px;">The Radar Has You Now</h2>
        <p style="font-size: 14px; line-height: 1.7; color: #555;">
          You're officially subscribed to DramaRadar Breaking Drama Alerts. When major reality TV news breaks, you'll be one of the first to know.
        </p>
        <p style="font-size: 14px; line-height: 1.7; color: #555;">
          We only send alerts for the biggest stories (Tier 1 breaking news from sources like TMZ, E!, Page Six, and People). No spam, no fluff, just the tea that matters.
        </p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${SITE_URL}" style="display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #E84393, #A855F7); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
            Visit DramaRadar
          </a>
        </div>
      </div>
      <p style="text-align: center; margin-top: 24px; font-size: 11px; color: #AEAEB8;">
        <a href="${unsubLink}" style="color: #AEAEB8;">Unsubscribe</a>
      </p>
    </div>
  `;

  await sendEmail(email, "The Radar Has You Now", welcomeHtml, env);

  return new Response(
    JSON.stringify({ message: "You're on the list. The radar will find you." }),
    { status: 201, headers }
  );
}

// ============================================================
// Unsubscribe Endpoint
// ============================================================

export async function handleUnsubscribe(
  url: URL,
  env: Env
): Promise<Response> {
  const token = url.searchParams.get("token");

  if (!token) {
    return new Response(
      "<html><body style='font-family:sans-serif;text-align:center;padding:60px'><h2>Invalid unsubscribe link</h2></body></html>",
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  const key = `subscriber:${token}`;
  const existing = await env.DRAMARADAR_CACHE.get(key, "json");

  if (existing) {
    const sub = existing as { email: string; subscribedAt: string; active: boolean };
    sub.active = false;
    await env.DRAMARADAR_CACHE.put(key, JSON.stringify(sub));
  }

  return new Response(
    `<html><body style="font-family:sans-serif;text-align:center;padding:60px">
      <h2>You've been unsubscribed</h2>
      <p style="color:#666">You will no longer receive breaking drama alerts from DramaRadar.</p>
      <p><a href="${SITE_URL}" style="color:#E84393">Back to DramaRadar</a></p>
    </body></html>`,
    { status: 200, headers: { "Content-Type": "text/html" } }
  );
}

// ============================================================
// Breaking Alert Sender (called from cron)
// ============================================================

export async function sendBreakingAlerts(
  items: FeedItem[],
  env: Env
): Promise<void> {
  if (!env.RESEND_API_KEY) return;

  // Find Tier 1 breaking items from the last 30 minutes
  const thirtyMinAgo = Date.now() - 30 * 60 * 1000;

  const breakingItems = items.filter((item) => {
    if (item.priority !== 1 || !item.isBreaking) return false;
    const itemTime = new Date(item.publishedAt).getTime();
    return itemTime > thirtyMinAgo;
  });

  if (breakingItems.length === 0) return;

  // Check which items haven't triggered alerts yet
  const unalerted: FeedItem[] = [];
  for (const item of breakingItems) {
    const alertKey = `alert:sent:${item.id}`;
    const sent = await env.DRAMARADAR_CACHE.get(alertKey);
    if (!sent) {
      unalerted.push(item);
    }
  }

  if (unalerted.length === 0) return;

  // Only send for the top (most important) unalerted item
  const alertItem = unalerted[0];

  // Get active subscribers
  const indexRaw = await env.DRAMARADAR_CACHE.get("subscribers:index");
  if (!indexRaw) return;
  const hashes: string[] = JSON.parse(indexRaw);

  let sentCount = 0;

  for (const hash of hashes) {
    const subRaw = await env.DRAMARADAR_CACHE.get(`subscriber:${hash}`, "json");
    if (!subRaw) continue;

    const sub = subRaw as { email: string; active: boolean };
    if (!sub.active) continue;

    // Check daily alert cap per subscriber (max 3)
    const today = new Date().toISOString().slice(0, 10);
    const capKey = `alert:cap:${hash}:${today}`;
    const capRaw = await env.DRAMARADAR_CACHE.get(capKey);
    const capCount = capRaw ? parseInt(capRaw, 10) : 0;
    if (capCount >= 3) continue;

    const unsubLink = `${SITE_URL}/api/unsubscribe?token=${hash}`;

    const alertHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #2D2D3A;">
        <div style="text-align: center; padding: 24px 0 16px;">
          <span style="font-size: 22px; font-weight: 800; background: linear-gradient(135deg, #E84393, #A855F7); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">DramaRadar</span>
        </div>
        <div style="padding: 20px; background: #FFF0F3; border-radius: 12px; border: 1px solid #F0D4DC;">
          <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #DC3545; font-weight: 800; margin: 0 0 8px;">Breaking</p>
          <h2 style="font-size: 18px; line-height: 1.4; margin: 0 0 12px;">${alertItem.title}</h2>
          ${alertItem.description ? `<p style="font-size: 14px; line-height: 1.6; color: #555; margin: 0 0 16px;">${alertItem.description.slice(0, 200)}${alertItem.description.length > 200 ? "..." : ""}</p>` : ""}
          <p style="font-size: 12px; color: #888; margin: 0 0 16px;">Source: ${alertItem.source}</p>
          <a href="${SITE_URL}" style="display: inline-block; padding: 10px 24px; background: linear-gradient(135deg, #E84393, #A855F7); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 13px;">
            Read More on DramaRadar
          </a>
        </div>
        <p style="text-align: center; margin-top: 20px; font-size: 11px; color: #AEAEB8;">
          <a href="${unsubLink}" style="color: #AEAEB8;">Unsubscribe from alerts</a>
        </p>
      </div>
    `;

    const sent = await sendEmail(
      sub.email,
      `BREAKING: ${alertItem.title}`,
      alertHtml,
      env
    );

    if (sent) {
      sentCount++;
      await env.DRAMARADAR_CACHE.put(capKey, String(capCount + 1), {
        expirationTtl: 24 * 60 * 60,
      });
    }
  }

  // Mark alert as sent
  await env.DRAMARADAR_CACHE.put(`alert:sent:${alertItem.id}`, "1", {
    expirationTtl: 24 * 60 * 60,
  });

  if (sentCount > 0) {
    console.log(`Breaking alert sent to ${sentCount} subscribers: ${alertItem.title}`);
  }
}
