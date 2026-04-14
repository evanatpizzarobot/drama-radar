# DramaRadar Project CLAUDE.md

## PROJECT OVERVIEW
DramaRadar.com is a reality TV and celebrity gossip aggregator. Editor-in-Chief is Carly (Evan's wife). Built as a content-rich editorial site modeled after the TensorFeed.ai architecture.
Repo: github.com/evanatpizzarobot/drama-radar

## TECH STACK
- Next.js 14 static export
- Cloudflare Pages (frontend hosting)
- Cloudflare Worker (API at dramaradar-api)
- 3 KV namespaces: DRAMARADAR_NEWS, DRAMARADAR_ARTICLES, DRAMARADAR_CACHE
- Cron schedules: 10-min RSS fetch, 30-min X posting (NOW DISABLED, account banned)
- TypeScript throughout
- Tailwind CSS v3 for styling

## REPO STRUCTURE
- /src - Next.js app
- /worker - Cloudflare Worker source
- /public - static assets including team avatars, favicons
- /scripts - seed.js for KV content seeding

## KEY CONVENTIONS
- Zero em dashes anywhere (Pizza Robot Studios global rule)
- No double hyphens as em dash substitutes
- Clean article URLs: /articles/{slug} format
- CC spec delivery: always single downloadable file via create_file + present_files
- All team avatars live in public/images/ with -avatar.png suffix
- Authors are keyed: carly, bb, bbs-assistant, betsy, felicia, the-drama-desk, guest
- Dark theme only (near-black backgrounds, light text)
- All RSS feed parsing must handle malformed XML gracefully
- Every Worker endpoint returns JSON with consistent error format
- KV writes must include TTL (30 days for items, 7 days for dedup hashes)
- Content filtering must run on every feed item (skip off-topic)
- Show tag detection is keyword-based, case-insensitive
- All timestamps stored as ISO 8601 UTC
- All external text (RSS titles, descriptions) must be decoded with decodeHtmlEntities() before display
- Feed cards link to ORIGINAL source articles (we aggregate, not copy)
- Editorial articles render from Markdown stored in KV
- Mobile-first responsive design
- No cookie banners needed (Cloudflare Analytics is cookieless)

## CODE STYLE
- Functional components only (no class components)
- Named exports for components
- Default export for pages
- Use async/await, never raw Promises
- Console.error for Worker errors, never console.log in production

## WORKFLOW
- Auto-commit and push after every change (do not wait for user to ask)
- Commit messages should be descriptive and use conventional commit format

## CURRENT FEATURES (live)
- 26 original articles, 5 predictions
- 22 RSS feeds across reality TV gossip sources
- 18 show hubs with SEO intro content, status badges, air schedules
- 7 author personas with avatars, bios, signoffs, individual pages with filtered articles
- Drama Desk AI chat widget (Cloudflare Workers AI, Llama 3.1 8B, free)
- Horoscope page with live API (freehoroscopeapi.com)
- Predictions page with status tracking
- Light/dark mode toggle
- AdSense verification (pub-7224757913262984), already Authorized
- Google Search Console verified, sitemap submitted
- Affiliate link infrastructure (AffiliateLink component, ArticleDisclaimer, /disclosure page)
- Share buttons: Copy Link, Reddit, Facebook, Pinterest (X REMOVED)
- Structured data: NewsArticle, WebSite, CollectionPage, BreadcrumbList
- Breadcrumb navigation on articles and show hubs
- Related articles widget
- Pinterest Rich Pins meta tags
- Google Discover optimization (max-image-preview:large)
- llms.txt + /api/agent for AI agent discoverability
- Web push notifications infrastructure (VAPID keys configured)
- AdSense integration with in-feed native ads every 8th item
- Animated radar sweep logo in header

## DEPRECATED / REMOVED
- X/Twitter integration (account @DramaRadarHQ was banned April 2026)
- All X share buttons, X bot cron, twitter:* meta tags, sameAs entries
- X API secrets remain in Cloudflare for potential future use but code does not reference them

## EMAIL INFRASTRUCTURE
- Domain: dramaradar.com (alias domain of pizzarobotstudios.com in Google Workspace)
- Active addresses mirror from primary: evan@, support@, feedback@, contact@, legal@, advertise@ to Evan
- tips@, editorial@, carly@ to Carly
- Email aliases are added at pizzarobotstudios.com and mirror to dramaradar.com automatically

## KV NAMESPACE IDs
- DRAMARADAR_NEWS: 234d82a3483b438392b73960baaf85d9
- DRAMARADAR_ARTICLES: 446b2734022b4cb8bfe094b4fc462128
- DRAMARADAR_CACHE: cbe3815e63944df195727bae4008c91c

## SEED SCRIPT WORKFLOW
For new articles: node scripts/seed.js then npx wrangler kv bulk put --remote
Admin API protected by ADMIN_TOKEN secret.

## KNOWN ISSUES / TODO
- Pinterest verification code needs to be added once Pinterest Business account is claimed
- VAPID keys generated, push notification subscribe UI may still need completion
- AdSense full approval pending (currently in "Getting ready" state, needs 2-3 weeks of indexed traffic)
