// Admin article and prediction endpoints for DramaRadar

import type { Env, EditorialArticle, Prediction, CastMember } from "./types";
interface AdminErrorResponse {
  error: string;
  status: number;
}

function jsonResponse(data: unknown, status: number = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

function errorResponse(message: string, status: number): Response {
  const body: AdminErrorResponse = { error: message, status };
  return jsonResponse(body, status);
}

/**
 * Validate the bearer token from the Authorization header.
 */
function isAuthorized(request: Request, env: Env): boolean {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) return false;

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return false;

  return parts[1] === env.ADMIN_TOKEN;
}

/**
 * Handle admin API requests for editorial article management.
 * Requires bearer token authentication.
 */
export async function handleAdminRequest(
  request: Request,
  env: Env
): Promise<Response> {
  // Validate auth on all admin routes
  if (!isAuthorized(request, env)) {
    return errorResponse("Unauthorized: invalid or missing token", 401);
  }

  const url = new URL(request.url);
  const path = url.pathname;

  // POST /api/admin/articles: create or update an editorial article
  if (request.method === "POST" && path === "/api/admin/articles") {
    return handleCreateArticle(request, env);
  }

  // DELETE /api/admin/articles/:slug: delete an editorial article
  if (request.method === "DELETE" && path.startsWith("/api/admin/articles/")) {
    const slug = path.replace("/api/admin/articles/", "");
    if (!slug) {
      return errorResponse("Missing article slug", 400);
    }
    return handleDeleteArticle(slug, env);
  }

  // POST /api/admin/predictions: create a new prediction
  if (request.method === "POST" && path === "/api/admin/predictions") {
    return handleCreatePrediction(request, env);
  }

  // PUT /api/admin/predictions/:id: update prediction status
  if (request.method === "PUT" && path.startsWith("/api/admin/predictions/")) {
    const id = path.replace("/api/admin/predictions/", "");
    if (!id) {
      return errorResponse("Missing prediction ID", 400);
    }
    return handleUpdatePrediction(id, request, env);
  }

  // POST /api/admin/cast: create or update a cast member
  if (request.method === "POST" && path === "/api/admin/cast") {
    return handleCreateCastMember(request, env);
  }

  // POST /api/admin/cast/bulk: bulk insert cast members
  if (request.method === "POST" && path === "/api/admin/cast/bulk") {
    return handleBulkInsertCast(request, env);
  }

  // DELETE /api/admin/cast/:slug: delete a cast member
  if (request.method === "DELETE" && path.startsWith("/api/admin/cast/")) {
    const slug = path.replace("/api/admin/cast/", "");
    if (!slug) {
      return errorResponse("Missing cast member slug", 400);
    }
    return handleDeleteCastMember(slug, env);
  }

  return errorResponse("Admin endpoint not found", 404);
}

/**
 * Create or update an editorial article in KV.
 */
async function handleCreateArticle(
  request: Request,
  env: Env
): Promise<Response> {
  let body: Partial<EditorialArticle>;
  try {
    body = (await request.json()) as Partial<EditorialArticle>;
  } catch {
    return errorResponse("Invalid JSON body", 400);
  }

  // Validate required fields
  if (!body.slug || !body.title || !body.body || !body.author) {
    return errorResponse(
      "Missing required fields: slug, title, body, and author are required",
      400
    );
  }

  const now = new Date().toISOString();

  // Check if article already exists (for update vs create)
  const existing = await env.DRAMARADAR_ARTICLES.get(
    `article:${body.slug}`,
    "json"
  );

  const article: EditorialArticle = {
    slug: body.slug,
    title: body.title,
    subtitle: body.subtitle || "",
    body: body.body,
    author: body.author,
    imageUrl: body.imageUrl || null,
    categories: body.categories || [],
    showTags: body.showTags || [],
    publishedAt: existing
      ? (existing as EditorialArticle).publishedAt
      : now,
    updatedAt: now,
    isFeatured: body.isFeatured || false,
    isExclusive: body.isExclusive || false,
  };

  // Store article by slug
  await env.DRAMARADAR_ARTICLES.put(
    `article:${article.slug}`,
    JSON.stringify(article)
  );

  // Update the article index
  await updateArticleIndex(env, article.slug, "add");

  const status = existing ? 200 : 201;
  return jsonResponse(
    { message: existing ? "Article updated" : "Article created", article },
    status
  );
}

/**
 * Delete an editorial article from KV.
 */
async function handleDeleteArticle(
  slug: string,
  env: Env
): Promise<Response> {
  const existing = await env.DRAMARADAR_ARTICLES.get(`article:${slug}`);
  if (!existing) {
    return errorResponse("Article not found", 404);
  }

  await env.DRAMARADAR_ARTICLES.delete(`article:${slug}`);
  await updateArticleIndex(env, slug, "remove");

  return jsonResponse({ message: "Article deleted", slug });
}

/**
 * Maintain an index of all article slugs in KV.
 */
async function updateArticleIndex(
  env: Env,
  slug: string,
  action: "add" | "remove"
): Promise<void> {
  const indexRaw = await env.DRAMARADAR_ARTICLES.get("articles:index");
  let slugs: string[] = indexRaw ? JSON.parse(indexRaw) : [];

  if (action === "add") {
    if (!slugs.includes(slug)) {
      slugs.push(slug);
    }
  } else {
    slugs = slugs.filter((s) => s !== slug);
  }

  await env.DRAMARADAR_ARTICLES.put("articles:index", JSON.stringify(slugs));
}

/**
 * Create a new prediction in KV.
 */
async function handleCreatePrediction(
  request: Request,
  env: Env
): Promise<Response> {
  let body: Partial<Prediction>;
  try {
    body = (await request.json()) as Partial<Prediction>;
  } catch {
    return errorResponse("Invalid JSON body", 400);
  }

  if (!body.prediction || !body.context || !body.authorKey) {
    return errorResponse(
      "Missing required fields: prediction, context, and authorKey are required",
      400
    );
  }

  const now = new Date().toISOString();
  const id = body.id || `pred-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const prediction: Prediction = {
    id,
    prediction: body.prediction,
    context: body.context,
    authorKey: body.authorKey,
    showTags: body.showTags || [],
    createdAt: body.createdAt || now,
    status: body.status || "pending",
    resolvedAt: null,
  };

  await env.DRAMARADAR_ARTICLES.put(
    `prediction:${id}`,
    JSON.stringify(prediction)
  );

  // Update prediction index
  await updatePredictionIndex(env, id, "add");

  return jsonResponse(
    { message: "Prediction created", prediction },
    201
  );
}

/**
 * Update the status of an existing prediction.
 */
async function handleUpdatePrediction(
  id: string,
  request: Request,
  env: Env
): Promise<Response> {
  const existing = await env.DRAMARADAR_ARTICLES.get(`prediction:${id}`, "json");
  if (!existing) {
    return errorResponse("Prediction not found", 404);
  }

  let body: Partial<Prediction>;
  try {
    body = (await request.json()) as Partial<Prediction>;
  } catch {
    return errorResponse("Invalid JSON body", 400);
  }

  const prediction = existing as Prediction;
  const validStatuses = ["pending", "correct", "wrong", "developing"];

  if (body.status && validStatuses.includes(body.status)) {
    prediction.status = body.status;
    if (body.status === "correct" || body.status === "wrong") {
      prediction.resolvedAt = new Date().toISOString();
    } else {
      prediction.resolvedAt = null;
    }
  }

  await env.DRAMARADAR_ARTICLES.put(
    `prediction:${id}`,
    JSON.stringify(prediction)
  );

  return jsonResponse({ message: "Prediction updated", prediction });
}

/**
 * Maintain an index of all prediction IDs in KV.
 */
async function updatePredictionIndex(
  env: Env,
  id: string,
  action: "add" | "remove"
): Promise<void> {
  const indexRaw = await env.DRAMARADAR_ARTICLES.get("predictions:index");
  let ids: string[] = indexRaw ? JSON.parse(indexRaw) : [];

  if (action === "add") {
    if (!ids.includes(id)) {
      ids.push(id);
    }
  } else {
    ids = ids.filter((i) => i !== id);
  }

  await env.DRAMARADAR_ARTICLES.put("predictions:index", JSON.stringify(ids));
}

/**
 * Create or update a cast member in KV.
 */
async function handleCreateCastMember(
  request: Request,
  env: Env
): Promise<Response> {
  let body: Partial<CastMember>;
  try {
    body = (await request.json()) as Partial<CastMember>;
  } catch {
    return errorResponse("Invalid JSON body", 400);
  }

  if (!body.slug || !body.fullName || !body.bio || !body.shows) {
    return errorResponse(
      "Missing required fields: slug, fullName, bio, and shows are required",
      400
    );
  }

  const now = new Date().toISOString();
  const existing = await env.DRAMARADAR_ARTICLES.get(
    `cast:${body.slug}`,
    "json"
  );

  const castMember: CastMember = {
    slug: body.slug,
    fullName: body.fullName,
    displayName: body.displayName || body.fullName,
    age: body.age || 0,
    hometown: body.hometown || "",
    bio: body.bio,
    shows: body.shows,
    status: body.status || "current",
    instagram: body.instagram,
    tiktok: body.tiktok,
    storylines: body.storylines || [],
    coStars: body.coStars || [],
    createdAt: existing ? (existing as CastMember).createdAt : now,
    updatedAt: now,
  };

  await env.DRAMARADAR_ARTICLES.put(
    `cast:${castMember.slug}`,
    JSON.stringify(castMember)
  );

  await updateCastIndex(env, castMember.slug, "add");

  const status = existing ? 200 : 201;
  return jsonResponse(
    { message: existing ? "Cast member updated" : "Cast member created", cast: castMember },
    status
  );
}

/**
 * Bulk insert multiple cast members.
 */
async function handleBulkInsertCast(
  request: Request,
  env: Env
): Promise<Response> {
  let body: { cast: Partial<CastMember>[] };
  try {
    body = (await request.json()) as { cast: Partial<CastMember>[] };
  } catch {
    return errorResponse("Invalid JSON body", 400);
  }

  if (!body.cast || !Array.isArray(body.cast)) {
    return errorResponse("Body must contain a cast array", 400);
  }

  const now = new Date().toISOString();
  const results: Array<{ slug: string; status: string }> = [];

  for (const entry of body.cast) {
    if (!entry.slug || !entry.fullName || !entry.bio || !entry.shows) {
      results.push({ slug: entry.slug || "unknown", status: "skipped: missing required fields" });
      continue;
    }

    const existing = await env.DRAMARADAR_ARTICLES.get(`cast:${entry.slug}`, "json");

    const castMember: CastMember = {
      slug: entry.slug,
      fullName: entry.fullName,
      displayName: entry.displayName || entry.fullName,
      age: entry.age || 0,
      hometown: entry.hometown || "",
      bio: entry.bio,
      shows: entry.shows,
      status: entry.status || "current",
      instagram: entry.instagram,
      tiktok: entry.tiktok,
      storylines: entry.storylines || [],
      coStars: entry.coStars || [],
      createdAt: existing ? (existing as CastMember).createdAt : now,
      updatedAt: now,
    };

    await env.DRAMARADAR_ARTICLES.put(
      `cast:${castMember.slug}`,
      JSON.stringify(castMember)
    );

    await updateCastIndex(env, castMember.slug, "add");
    results.push({ slug: castMember.slug, status: existing ? "updated" : "created" });
  }

  return jsonResponse({
    message: `Bulk insert complete: ${results.length} processed`,
    results,
  });
}

/**
 * Delete a cast member from KV.
 */
async function handleDeleteCastMember(
  slug: string,
  env: Env
): Promise<Response> {
  const existing = await env.DRAMARADAR_ARTICLES.get(`cast:${slug}`);
  if (!existing) {
    return errorResponse("Cast member not found", 404);
  }

  await env.DRAMARADAR_ARTICLES.delete(`cast:${slug}`);
  await updateCastIndex(env, slug, "remove");

  return jsonResponse({ message: "Cast member deleted", slug });
}

/**
 * Maintain an index of all cast member slugs in KV.
 */
async function updateCastIndex(
  env: Env,
  slug: string,
  action: "add" | "remove"
): Promise<void> {
  const indexRaw = await env.DRAMARADAR_ARTICLES.get("cast:index");
  let slugs: string[] = indexRaw ? JSON.parse(indexRaw) : [];

  if (action === "add") {
    if (!slugs.includes(slug)) {
      slugs.push(slug);
    }
  } else {
    slugs = slugs.filter((s) => s !== slug);
  }

  await env.DRAMARADAR_ARTICLES.put("cast:index", JSON.stringify(slugs));
}
