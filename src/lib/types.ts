export interface FeedItem {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  sourceUrl: string;
  imageUrl: string | null;
  publishedAt: string;
  fetchedAt: string;
  categories: string[];
  showTags: string[];
  priority: number;
  isBreaking: boolean;
}

export interface EditorialArticle {
  slug: string;
  title: string;
  subtitle: string;
  body: string;
  author: string;
  imageUrl: string | null;
  categories: string[];
  showTags: string[];
  publishedAt: string;
  updatedAt: string;
  isFeatured: boolean;
  isExclusive: boolean;
}

export interface TrendingData {
  updatedAt: string;
  topShows: Array<{
    showTag: string;
    label: string;
    mentionCount: number;
    trend: "up" | "down" | "stable";
  }>;
  topPeople: Array<{
    name: string;
    mentionCount: number;
    showTag: string;
  }>;
  hotStory: {
    itemId: string;
    title: string;
    source: string;
    url: string;
  } | null;
}

export interface ShowDefinition {
  tag: string;
  label: string;
  fullName: string;
  keywords: string[];
  color: string;
  intro: string;
  currentSeason: number | null;
  airDay: string | null;
  network: string;
  status: "airing" | "between-seasons" | "upcoming";
}

export interface FeedResponse {
  items: FeedItem[];
  total: number;
  hasMore: boolean;
}

export interface ArticlesResponse {
  articles: EditorialArticle[];
  total: number;
}

export interface BreakingResponse {
  items: FeedItem[];
  count: number;
}

export interface ShowsResponse {
  shows: Array<{
    tag: string;
    label: string;
    fullName: string;
    color: string;
    articleCount: number;
  }>;
}

export interface Prediction {
  id: string;
  prediction: string;
  context: string;
  authorKey: string;
  showTags: string[];
  createdAt: string;
  status: "pending" | "correct" | "wrong" | "developing";
  resolvedAt: string | null;
}

export interface PredictionsResponse {
  predictions: Prediction[];
  total: number;
}

export interface HoroscopeData {
  date: string;
  period: string;
  sign: string;
  horoscope: string;
}

export interface HoroscopeResponse {
  data: HoroscopeData;
  cached: boolean;
  stale?: boolean;
}
