# DramaRadar Project CLAUDE.md

## Project
DramaRadar (dramaradar.com): reality TV and celebrity gossip news aggregator.
Repo: github.com/evanatpizzarobot/drama-radar

## Stack
- Next.js 14 static export on Cloudflare Pages
- Cloudflare Worker backend (dramaradar-api) with 10-min cron
- Cloudflare KV (3 namespaces: NEWS, ARTICLES, CACHE)
- TypeScript throughout
- Tailwind CSS v3 for styling

## Rules
- No em dashes anywhere in any text, code comments, or content
- No double hyphens as em dash substitutes
- Dark theme only (near-black backgrounds, light text)
- All RSS feed parsing must handle malformed XML gracefully
- Every Worker endpoint returns JSON with consistent error format
- KV writes must include TTL (30 days for items, 7 days for dedup hashes)
- Content filtering must run on every feed item (skip off-topic)
- Show tag detection is keyword-based, case-insensitive
- All timestamps stored as ISO 8601 UTC
- All external text (RSS titles, descriptions) must be decoded with decodeHtmlEntities() before display to prevent &#039; and similar artifacts
- Feed cards link to ORIGINAL source articles (we aggregate, not copy)
- Editorial articles render from Markdown stored in KV
- AdSense units wrapped in reusable component
- Mobile-first responsive design
- No cookie banners needed (Cloudflare Analytics is cookieless)

## Workflow
- Auto-commit and push after every change (do not wait for user to ask)
- Commit messages should be descriptive and use conventional commit format

## Code Style
- Functional components only (no class components)
- Named exports for components
- Default export for pages
- Use async/await, never raw Promises
- Console.error for Worker errors, never console.log in production

## Features
- 22 RSS feed sources across 3 tiers
- 18 tracked reality TV shows with keyword-based detection
- Content-first homepage layout (editorial above fold for AdSense)
- "Ask the Drama Desk" AI chat (Cloudflare Workers AI, free tier)
- 6 author personas: Carly (EIC), BB, BB's Assistant, Carly's Intern, The Drama Desk, Guest
- Animated radar sweep logo in header
- AdSense integration with in-feed native ads every 8th item
