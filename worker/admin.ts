// Admin article endpoints for DramaRadar

import type { Env, EditorialArticle } from "./types";

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
