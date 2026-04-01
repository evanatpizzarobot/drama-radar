// Rename article slugs in KV to shorter, cleaner versions
// Usage: node scripts/rename-slugs.js
// Then run the generated wrangler commands

const fs = require("fs");

const SLUG_MAP = {
  "scamanda-podcast-reality-tv-pipeline": "scamanda-summer-house-scandal",
  "team-ciara-summer-house-internet-rallies": "team-ciara-internet-rallies",
  "summer-house-season-10-cast-guide": "summer-house-s10-cast-guide",
  "vanderpump-rules-reboot-survival": "vpr-reboot-survival",
  "real-housewives-franchise-rankings-2026": "housewives-rankings-2026",
  "below-deck-down-under-season-4-messiest-moments": "below-deck-s4-messiest-moments",
  "real-housewives-rhode-island-what-we-know": "rhode-island-housewives-preview",
  "rhobh-season-15-last-supper-finale": "rhobh-last-supper-finale",
  "ladies-of-london-new-reign-sleeper-hit": "ladies-of-london-sleeper-hit",
  "reality-tv-glossary-50-terms": "reality-tv-glossary",
  "the-valley-season-3-lala-kent-tom-schwartz": "valley-s3-lala-schwartz",
  "summer-house-reunion-most-watched-bravo-history": "summer-house-reunion-prediction",
  "rhoa-season-17-pinky-cole-k-michelle-cast-shakeup": "rhoa-s17-cast-shakeup",
  "bravo-spring-2026-complete-viewing-guide": "bravo-spring-2026-guide",
  "10-bravo-moments-defined-reality-tv-forever": "10-bravo-moments-forever",
  "guide-watching-real-housewives-first-time-2026": "housewives-beginners-guide",
  "southern-charm-season-11-reunion-single-charleston": "southern-charm-s11-reunion",
  "how-deuxmoi-became-most-powerful-force-reality-tv-gossip": "how-deuxmoi-changed-gossip",
  "90-day-fiance-universe-complete-guide-every-spinoff": "90-day-fiance-spinoff-guide",
  "love-island-usa-vs-uk-which-version-watching": "love-island-usa-vs-uk",
};

// Read existing bulk files to get article data
const batch1 = JSON.parse(fs.readFileSync("scripts/articles-bulk.json", "utf8"));
const batch2 = JSON.parse(fs.readFileSync("scripts/articles-batch2-bulk.json", "utf8"));

// Combine all article entries (skip the index entry)
const allEntries = [...batch1, ...batch2].filter(e => e.key.startsWith("article:"));

const newBulk = [];
const newSlugs = [];

for (const entry of allEntries) {
  const oldSlug = entry.key.replace("article:", "");
  const newSlug = SLUG_MAP[oldSlug];

  if (!newSlug) {
    console.error(`No mapping for slug: ${oldSlug}`);
    continue;
  }

  const article = JSON.parse(entry.value);
  article.slug = newSlug;

  newBulk.push({
    key: `article:${newSlug}`,
    value: JSON.stringify(article),
  });

  newSlugs.push(newSlug);
}

// Add the new index
newBulk.push({
  key: "articles:index",
  value: JSON.stringify(newSlugs),
});

fs.writeFileSync("scripts/articles-renamed-bulk.json", JSON.stringify(newBulk, null, 2));

console.log(`Renamed ${newSlugs.length} articles`);
console.log("New slugs:", newSlugs);
console.log("\nRun:");
console.log("  npx wrangler kv bulk put --namespace-id=446b2734022b4cb8bfe094b4fc462128 --remote scripts/articles-renamed-bulk.json");
