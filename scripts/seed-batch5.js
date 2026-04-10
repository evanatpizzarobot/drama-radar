// Seed script for DramaRadar batch 5 articles (27)
// Usage: node scripts/seed-batch5.js
// Then: npx wrangler kv bulk put --namespace-id=446b2734022b4cb8bfe094b4fc462128 --remote scripts/articles-batch5-bulk.json

const fs = require("fs");

const articles = [
  {
    slug: "bravo-in-the-city-summer-house-spinoff",
    title: "Bravo Drops \"In The City\": The Summer House Spinoff We've Been Manifesting",
    subtitle: "In The City launches May 19 with a two-hour crossover event right after the Summer House Season 10 finale. Here's everything we know.",
    body: `Pour the espresso martini, light a candle for the Hamptons share house, and clear your calendar for May 19, 2026. Bravo just confirmed what the group chats have been whispering about for months: *In The City*, the long-rumored Summer House spinoff, is officially happening, and it's launching with a two-hour crossover event right after the Season 10 finale.

Translation: one night, two shows, zero chill.

## The Premise

*In The City* trades the saltwater and rosé hangovers of Montauk for the concrete chaos of Manhattan. Think rooftop happy hours, brand launches, walk-ups with no elevators, and the kind of "casual" dinners that somehow end at 4 a.m. in a karaoke room. Filmed in fall 2025, the show follows a tighter, more grown-up Summer House orbit as they navigate work, friendships, and the very specific drama that only New York can manufacture.

## The Cast (And Yes, You're Going to Have Opinions)

Returning from the Summer House universe and serving as the emotional anchors of the new show:

- **Amanda Batula**, finally getting a storyline that isn't just "the long-suffering wife"
- **Kyle Cooke**, who will absolutely find a way to plug Loverboy in episode one
- **Lindsay Hubbard**, single, stunning, and presumably ready to make us all feel something

The newcomers are where it gets juicy:

- **Andrea Denver**, the Italian model whose mere presence is going to send the group chats into cardiac arrest
- **Lexi Sundin**, a fresh face the casting team is reportedly very high on
- **Gavin Moseley**, who already has "villain edit" written all over him
- **Georgina Ferzli**, Lindsay's real-life dermatologist and best friend, bringing the Park Avenue polish
- **Katie Arundel**, Amanda's childhood BFF, which is the kind of casting choice that historically ends in tears and a reunion seat
- **Kenny Martin**, rounding out the boys' side and rumored to be a hookup wildcard

And because Bravo knows exactly what we want, **West Wilson** is confirmed to make appearances throughout the season. Lindsay and West in the same room again, in New York, with cameras rolling? That's not a TV show, that's a public service.

## The Crossover Event

The two-hour premiere on May 19 will roll directly out of the Summer House Season 10 finale, meaning we get a full evening of escalating chaos as the housemates trade their swimsuits for going-out tops and pour into the city. Expect at least one screaming match in a stairwell, one tearful reconciliation in an Uber, and one cliffhanger involving a person nobody saw coming.

## Why This Matters

Spinoffs are tricky. For every *Vanderpump Rules*, there's a show that quietly disappears after one season. But *In The City* has the ingredients: established fan favorites, genuinely intriguing newcomers, real friendships colliding with new ones, and a setting that doesn't let anyone hide behind a pool float. If Bravo nails the tone, this could be the franchise's strongest swing in years.

If they don't? Well, we'll still be watching. Obviously.

## Mark Your Calendars

**Premiere:** Tuesday, May 19, 2026
**Where:** Bravo (and next-day on Peacock)
**What:** Two-hour crossover event following the Summer House Season 10 finale

DramaRadar will be covering every episode, every receipt, and every group chat fallout. Bookmark us, sign up for the alerts, and may your favorite never be the one getting ratioed on Watch What Happens Live.

*Stay messy,*
**Carly**
*Editor-in-Chief, DramaRadar*`,
    author: "carly",
    imageUrl: null,
    categories: ["exclusives", "reality-tv", "bravo"],
    showTags: ["summer-house"],
    publishedAt: "2026-04-10T14:00:00Z",
    updatedAt: "2026-04-10T14:00:00Z",
    isFeatured: true,
    isExclusive: true,
  },
];

// All 27 article slugs (batch 1: 12, batch 2: 8, batch 3: 3, batch 4: 3, batch 5: 1)
const allSlugs = [
  // Batch 1 (seed.js)
  "scamanda-podcast-reality-tv-pipeline",
  "team-ciara-summer-house-internet-rallies",
  "summer-house-season-10-cast-guide",
  "vanderpump-rules-reboot-survival",
  "real-housewives-franchise-rankings-2026",
  "below-deck-down-under-season-4-messiest-moments",
  "real-housewives-rhode-island-what-we-know",
  "rhobh-season-15-last-supper-finale",
  "ladies-of-london-new-reign-sleeper-hit",
  "reality-tv-glossary-50-terms",
  "the-valley-season-3-lala-kent-tom-schwartz",
  "summer-house-reunion-most-watched-bravo-history",
  // Batch 2 (seed-batch2.js)
  "rhoa-season-17-pinky-cole-k-michelle-cast-shakeup",
  "bravo-spring-2026-complete-viewing-guide",
  "10-bravo-moments-defined-reality-tv-forever",
  "guide-watching-real-housewives-first-time-2026",
  "southern-charm-season-11-reunion-single-charleston",
  "how-deuxmoi-became-most-powerful-force-reality-tv-gossip",
  "90-day-fiance-universe-complete-guide-every-spinoff",
  "love-island-usa-vs-uk-which-version-watching",
  // Batch 3 (seed-batch3.js)
  "ciara-video-amanda-west",
  "kyle-cooke-wild-betrayal-hero",
  "summer-house-cast-sides-guide",
  // Batch 4 (seed-batch4.js)
  "rhoa-season-17-premiere-night",
  "amanda-batula-brand-deals-disappearing",
  "carls-a-mess-uber-eats-summer-house",
  // Batch 5 (this file)
  "bravo-in-the-city-summer-house-spinoff",
];

// Generate bulk KV JSON (articles + updated index)
const bulk = articles.map((a) => ({
  key: `article:${a.slug}`,
  value: JSON.stringify(a),
}));

// Include updated articles:index with all 27 slugs
bulk.push({
  key: "articles:index",
  value: JSON.stringify(allSlugs),
});

fs.writeFileSync(
  "scripts/articles-batch5-bulk.json",
  JSON.stringify(bulk, null, 2)
);

console.log(`Generated ${articles.length} articles`);
console.log(`Updated articles:index with ${allSlugs.length} total slugs`);
console.log("New slugs:", JSON.stringify(articles.map((a) => a.slug)));
console.log("\nRun:");
console.log("  npx wrangler kv bulk put --namespace-id=446b2734022b4cb8bfe094b4fc462128 --remote scripts/articles-batch5-bulk.json");
