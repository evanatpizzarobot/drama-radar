// Seed script for DramaRadar batch 4 articles (24-25)
// Usage: node scripts/seed-batch4.js
// Then: npx wrangler kv bulk put --namespace-id=446b2734022b4cb8bfe094b4fc462128 --remote scripts/articles-batch4-bulk.json

const fs = require("fs");

const articles = [
  {
    slug: "rhoa-season-17-premiere-night",
    title: "Tonight on Bravo: RHOA Season 17 Premieres and the Peaches Have Never Looked This Good",
    subtitle: "Porsha, Phaedra, Pinky Cole, K. Michelle, and the cast Bravo has been building toward. Season 17 starts tonight at 8PM ET.",
    body: `Happy Easter to those who celebrate. Happy RHOA premiere night to those who really celebrate.

Tonight at 8PM ET, The Real Housewives of Atlanta Season 17 kicks off what Andy Cohen himself has called "the cast we have been waiting for." After a Season 16 that divided the fanbase and left many wondering if Atlanta had lost its edge, Bravo is betting big on a roster that blends franchise legends with two of the most exciting newcomers in recent Housewives history.

Porsha Williams is back with a finalized divorce and not one but two potential love interests she is apparently ready to introduce to the group. Phaedra Parks returns full time after her triumphant Season 16 comeback proved she still has the sharpest tongue in the Bravoverse. Drew Sidora is navigating a new dating chapter, though the trailer already teased that her new boyfriend may be sliding into another housewife's DMs. Shamea Morton Mwangi finally earned her full-time spot and is launching a rum company. Angela Oakley is dealing with family loss while holding everyone accountable. And Kelli Ferrell is expanding her restaurant business while fielding some absolutely wild rumors.

## The Newcomers

The newcomers are where it gets really interesting. Pinky Cole built the Slutty Vegan empire, watched it collapse, and fought her way back to reclaim it. When Bravo announced her casting, she posted on Instagram: "They counted me out. Bravo counted me in." That energy is exactly what RHOA needed. K. Michelle needs no introduction to anyone who watched Love & Hip Hop, and her transition to the Bravo universe has already produced fireworks. Drew Sidora unfollowed her before the season even aired.

And then there is Cynthia Bailey, returning as a friend of the cast, because the woman is contractually obligated to appear in some capacity at all times. We would not have it any other way.

## What to Expect Tonight

The first episode is titled "A Warm Welcome," which in Bravo language means someone is absolutely getting an ice cold reception. Tune in at 8PM ET on Bravo. DramaRadar will be covering every episode this season.

Following RHOA tonight, The Real Housewives of Rhode Island moves to its regular Sunday time slot at 9PM ET with episode 2, "Ocean State of Affairs." Two brand new franchise installments back to back. If you are not parked on your couch by 7:55 tonight, reconsider your priorities.

See you in the live feed. The radar is locked in.

Stay messy.`,
    author: "carly",
    imageUrl: null,
    categories: ["reality-tv", "bravo", "housewives"],
    showTags: ["real-housewives-atlanta"],
    publishedAt: "2026-04-05T16:00:00Z",
    updatedAt: "2026-04-05T16:00:00Z",
    isFeatured: true,
    isExclusive: false,
  },
  {
    slug: "amanda-batula-brand-deals-disappearing",
    title: "Amanda Batula Is Losing More Than Friends: Brand Deals Are Disappearing Too",
    subtitle: "Cannabis brand Edie Parker scrubbed Amanda from all marketing materials. The financial fallout from the Summer House scandal is real.",
    body: `The fallout from the Summer House scandal is no longer limited to Instagram unfollows and cast shade. It is hitting Amanda Batula where it matters most beyond personal relationships: her wallet.

Cannabis brand Edie Parker, which had recently partnered with Amanda for a campaign, removed all photos featuring her from their social media and marketing materials just hours after she and West Wilson confirmed their romance. The scrubbing was swift, thorough, and very public. Fans noticed immediately and screenshots of the before and after circulated across Bravo fan accounts within minutes.

## Why This Matters

This is significant because brand partnerships are a primary income stream for reality TV cast members. The Bravo salary alone is rarely enough to sustain the lifestyle these shows demand, and most cast members rely heavily on sponsored content, paid partnerships, and brand ambassador deals to make their money. Losing one is a financial hit. Losing one this publicly is a reputational signal to every other brand considering working with her.

The message from Edie Parker's decision is clear: the backlash is severe enough that being associated with Amanda Batula is now considered a brand risk. Companies watch social sentiment closely, and the sentiment around Amanda right now is overwhelmingly negative. Every comment section is flooded with criticism. Every post gets ratio'd. The court of public opinion has rendered its verdict and it is not favorable.

## Amanda's Position

This puts Amanda in a precarious position heading into reunion taping. She is dealing with the loss of her friendship with Ciara, the public humiliation of her estranged husband Kyle, widespread fan backlash, potential cyberbullying concerns that even Kyle has spoken up about, and now financial consequences as brand deals evaporate.

## Meanwhile, Ciara's Stock Is Rising

Ciara Miller's situation tells the opposite story. Her follower count has been climbing steadily since the scandal broke. She received public support from Paige DeSorbo, Hannah Berner, Lindsay Hubbard, and even random celebrities. Bravo fan Jon Hamm (yes, the Jon Hamm from Mad Men) apparently spoke with Ciara the night before the announcement, and she told him how she was feeling. When Don Draper is checking on you, the universe is on your side.

The Traitors cast, where Ciara competed, also rallied behind her with public messages of support. Her brand value is going up while Amanda's is going down. The market has spoken.

## The Bigger Picture

There is a lesson here that extends beyond this specific scandal. In the age of social media, reality TV cast members are not just entertainers. They are brands. And brands live and die by public perception. Amanda and West made a personal choice, but the professional consequences are proving to be just as severe as the personal ones.

The reunion is going to address all of this. Not just the relationship and the betrayal, but the real world fallout that followed. Lost friendships, lost income, lost brand deals, and the question of whether the damage is permanent or temporary.

For Amanda's sake, let us hope it is temporary. But the internet has a long memory, and screenshots are forever.

Receipts attached.`,
    author: "bbs-assistant",
    imageUrl: null,
    categories: ["reality-tv", "bravo", "celebrity"],
    showTags: ["summer-house"],
    publishedAt: "2026-04-05T12:00:00Z",
    updatedAt: "2026-04-05T12:00:00Z",
    isFeatured: true,
    isExclusive: true,
  },
];

// All 25 article slugs (batch 1: 12, batch 2: 8, batch 3: 3, batch 4: 2)
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
  // Batch 4 (this file)
  "rhoa-season-17-premiere-night",
  "amanda-batula-brand-deals-disappearing",
];

// Generate bulk KV JSON (articles + updated index)
const bulk = articles.map((a) => ({
  key: `article:${a.slug}`,
  value: JSON.stringify(a),
}));

// Include updated articles:index with all 25 slugs
bulk.push({
  key: "articles:index",
  value: JSON.stringify(allSlugs),
});

fs.writeFileSync(
  "scripts/articles-batch4-bulk.json",
  JSON.stringify(bulk, null, 2)
);

console.log(`Generated ${articles.length} articles`);
console.log(`Updated articles:index with ${allSlugs.length} total slugs`);
console.log("New slugs:", JSON.stringify(articles.map((a) => a.slug)));
console.log("\nRun:");
console.log("  npx wrangler kv bulk put --namespace-id=446b2734022b4cb8bfe094b4fc462128 --remote scripts/articles-batch4-bulk.json");
