import { API_BASE_URL } from "./constants";
import type {
  FeedResponse,
  BreakingResponse,
  TrendingData,
  ArticlesResponse,
  EditorialArticle,
  ShowsResponse,
  PredictionsResponse,
  HoroscopeResponse,
} from "./types";

interface FeedParams {
  category?: string;
  show?: string;
  limit?: number;
  offset?: number;
  priority?: number;
}

interface ArticlesParams {
  featured?: boolean;
  show?: string;
  limit?: number;
}

function buildUrl(path: string, params?: Record<string, string>): string {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, value);
      }
    }
  }
  return url.toString();
}

export async function fetchFeed(
  params?: FeedParams
): Promise<FeedResponse> {
  try {
    const queryParams: Record<string, string> = {};
    if (params?.category) queryParams.category = params.category;
    if (params?.show) queryParams.show = params.show;
    if (params?.limit !== undefined) queryParams.limit = String(params.limit);
    if (params?.offset !== undefined) queryParams.offset = String(params.offset);
    if (params?.priority !== undefined)
      queryParams.priority = String(params.priority);

    const url = buildUrl("/feed", queryParams);
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Feed request failed: ${res.status}`);
    }

    return (await res.json()) as FeedResponse;
  } catch {
    return { items: [], total: 0, hasMore: false };
  }
}

export async function fetchBreaking(): Promise<BreakingResponse> {
  try {
    const url = buildUrl("/feed/breaking");
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Breaking request failed: ${res.status}`);
    }

    return (await res.json()) as BreakingResponse;
  } catch {
    return { items: [], count: 0 };
  }
}

export async function fetchTrending(): Promise<TrendingData> {
  try {
    const url = buildUrl("/trending");
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Trending request failed: ${res.status}`);
    }

    return (await res.json()) as TrendingData;
  } catch {
    return { updatedAt: new Date().toISOString(), topShows: [], topPeople: [], hotStory: null };
  }
}

export async function fetchArticles(
  params?: ArticlesParams
): Promise<ArticlesResponse> {
  try {
    const queryParams: Record<string, string> = {};
    if (params?.featured !== undefined)
      queryParams.featured = String(params.featured);
    if (params?.show) queryParams.show = params.show;
    if (params?.limit !== undefined) queryParams.limit = String(params.limit);

    const url = buildUrl("/articles", queryParams);
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Articles request failed: ${res.status}`);
    }

    return (await res.json()) as ArticlesResponse;
  } catch {
    return { articles: [], total: 0 };
  }
}

export async function fetchArticle(
  slug: string
): Promise<EditorialArticle | null> {
  try {
    const url = buildUrl(`/articles/${encodeURIComponent(slug)}`);
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Article request failed: ${res.status}`);
    }

    return (await res.json()) as EditorialArticle;
  } catch {
    return null;
  }
}

export async function fetchShows(): Promise<ShowsResponse> {
  try {
    const url = buildUrl("/shows");
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Shows request failed: ${res.status}`);
    }

    return (await res.json()) as ShowsResponse;
  } catch {
    return { shows: [] };
  }
}

export async function fetchPredictions(
  status?: string
): Promise<PredictionsResponse> {
  try {
    const queryParams: Record<string, string> = {};
    if (status) queryParams.status = status;

    const url = buildUrl("/predictions", queryParams);
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Predictions request failed: ${res.status}`);
    }

    return (await res.json()) as PredictionsResponse;
  } catch {
    return { predictions: [], total: 0 };
  }
}

export async function fetchHoroscope(
  sign: string,
  period: string = "daily"
): Promise<HoroscopeResponse | null> {
  try {
    const url = buildUrl("/horoscope", { sign, period });
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Horoscope request failed: ${res.status}`);
    }

    return (await res.json()) as HoroscopeResponse;
  } catch {
    return null;
  }
}
