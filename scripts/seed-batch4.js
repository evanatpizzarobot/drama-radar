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
  {
    slug: "carls-a-mess-uber-eats-summer-house",
    title: "Carl's a Mess: How a Meme Became a Catchphrase, a Brand Deal, and the Best Thing to Come Out of the Summer House Scandal",
    subtitle: "Carl Radke and Lindsay Hubbard reunited for an Uber Eats ad that broke the internet. The 'soft enough' callback was chef's kiss.",
    body: `Of all the things to emerge from the Summer House apocalypse, nobody predicted that the most heartwarming moment would involve Carl Radke blowing his nose into a tissue while Lindsay Hubbard asks if it's soft enough for him. And yet here we are. Welcome to 2026, where the mess is the message and Uber Eats is paying for the cleanup.

Let's rewind, because the "Carl's a mess" saga requires some context for anyone who has not been obsessively tracking this man's journey through the Bravo universe.

## The Carl Radke Timeline of Mess

Carl Radke joined Summer House in Season 1 and spent the better part of five seasons being, well, a mess. He was the guy at the party who would make out with someone, forget about it, and then accidentally flirt with their best friend the next morning. He was charming in the way that people who have no idea what they want are sometimes charming. He was messy in the way that makes great television.

Then something shifted. Carl got sober. He opened up about his struggles with alcohol. He lost his brother Kyle to addiction in 2020, and viewers watched him process that grief on camera in one of the most raw and genuinely emotional storylines Summer House has ever produced. The frat boy energy faded. A more thoughtful, more vulnerable Carl emerged. And the audience fell in love with him.

Then he fell in love with Lindsay Hubbard.

Carl and Lindsay had been friends and castmates for years before their relationship turned romantic during Season 6. By Season 7, they were engaged. The proposal happened on camera. The wedding planning became a storyline. Fans were invested. This was going to be the Summer House fairy tale ending that nobody expected from the guy who once forgot which girl he was supposed to be dating.

Then Carl called off the wedding.

In September 2023, just weeks before they were scheduled to get married in Mexico, Carl told Lindsay he could not go through with it. On camera. During what was supposed to be the final weekend of summer. Lindsay's reaction was devastating. Her statement afterward said her "entire life and future was ripped out from underneath me" and she had "no answers or closure on why."

The breakup defined Season 8. It dominated the reunion. Lindsay blocked Carl on every platform. When asked about it in February 2025, Carl told Us Weekly: "I'm blocked on social media, so I've kind of taken that as understood." The distance between them felt permanent.

Carl also faced criticism for how he handled the breakup. His reasoning felt incomplete to many viewers. The "not soft enough" comment about Lindsay became a flashpoint. He suggested that Lindsay was too intense, too driven, too much. The internet did not take kindly to a man calling off a wedding because his fiancee was not "soft" enough. That phrase haunted him for two years.

Through all of this, Kyle Cooke was the one who summed up what everyone was thinking. During an interview about the Amanda and West scandal, Kyle described the situation's effect on the cast and said simply: "Carl's a mess."

The phrase went viral instantly. Not because it was cruel, but because it was accurate. Carl was a mess. The whole cast was a mess. The entire Summer House universe was imploding in slow motion and Carl, the man who has been in the middle of mess since Season 1, was somehow both a participant and a spectator in the biggest scandal the show has ever seen.

## The Uber Eats Commercial That Broke the Internet

On Saturday, April 4th, Carl and Lindsay dropped a joint Uber Eats ad on Instagram that made the entire Bravoverse collectively lose its mind.

The video opens on Carl sitting on a couch in Brooklyn, blowing his nose into a tissue. An Uber Eats bag stuffed with comfort food sits on the side table next to a can of Loverboy (Kyle Cooke's brand, because of course). Text on screen reads: "Carl is A MESS."

Lindsay walks in, hands him another tissue, and delivers the line that sent the internet into orbit: "Is it soft enough for you?"

That callback. That devastating, perfectly delivered callback to the single most controversial thing Carl ever said about their relationship. Lindsay took the phrase that defined their breakup, the criticism that the internet weaponized against Carl for two years, and turned it into a punchline for a tissue commercial. The level of self-awareness is extraordinary.

The video ends with both of them sitting on the couch, eating chips and pizza, watching TV. The text reads: "Delivering cleanup for any mess. Uber Eats." Lindsay captioned the post: "Can confirm, Carl is A MESS." And in the comments, she dropped the detail that made the whole thing even better: "I unblocked him for this."

She unblocked him. After years of no contact, no social media connection, and what appeared to be a permanent estrangement, Lindsay Hubbard unblocked Carl Radke to film an Uber Eats ad together. That sentence alone tells you everything about where reality TV and brand partnerships intersect in 2026.

## The Reactions Were Everything

The cast and the internet responded immediately.

Jesse Solomon, their Summer House castmate, commented: "Oh. My God. THISSS is what it took for you guys to hang out again." Which is an extremely valid question.

Kate Chastain, the Below Deck legend, asked: "Do they give Emmys for best reality tv show post-scandal response in a limited online format yet?" They should. Carl and Lindsay would sweep the category.

Fans flooded the comments with reactions ranging from genuine emotion to disbelief to people who simply wrote "I'M SCREAMING" in all caps. The consensus was unanimous: this ad is perfect.

## Why This Actually Matters

Beyond the humor and the viral moment, the Uber Eats ad represents something significant about Carl and Lindsay's relationship. These two people went through one of the most painful, most public breakups in Bravo history. The engagement, the wedding cancellation, the blocked accounts, the years of silence. That is not light stuff.

And yet here they are, sitting on a couch together, eating snacks and making jokes about the worst thing that happened between them. That is not just good content. That is genuine healing turned into entertainment. It is the best case scenario for how two people can process shared pain and come out the other side with enough perspective to laugh about it.

In the current season airing right now, viewers have already noticed small signs of progress. Lindsay invited Carl to her housewarming party. He showed up awkwardly but brought gifts for both Lindsay and her daughter Gemma. The ice has been thawing gradually all season.

The Uber Eats ad feels like the public culmination of that thaw. Not a reconciliation, not a friendship reset, but an acknowledgment that two people who once planned to spend their lives together can still share a couch, a pizza, and a really well-timed joke about tissues.

## The Bigger Picture

In a week dominated by betrayal narratives (Amanda and Ciara, West and Kyle, the video, the brand deals dropping, the cyberbullying concerns), Carl and Lindsay's Uber Eats moment is the breath of fresh air the Bravoverse desperately needed. It proves that Summer House drama does not always have to end in unfollows and Instagram statements. Sometimes it ends in snacks and self-deprecating humor.

Carl Radke is a mess. He has always been a mess. But he is a lovable mess, a self-aware mess, and as of this weekend, a mess with an Uber Eats sponsorship and a cautious but genuine reconnection with the woman he almost married.

The Summer House universe is chaotic. It is imploding and rebuilding simultaneously. But somewhere in Brooklyn, Carl and Lindsay are sitting on a couch eating chips and watching TV, and honestly? That might be the most hopeful thing to happen on this show in years.

Stay messy.`,
    author: "carly",
    imageUrl: null,
    categories: ["reality-tv", "bravo"],
    showTags: ["summer-house"],
    publishedAt: "2026-04-05T18:00:00Z",
    updatedAt: "2026-04-05T18:00:00Z",
    isFeatured: true,
    isExclusive: true,
  },
];

// All 26 article slugs (batch 1: 12, batch 2: 8, batch 3: 3, batch 4: 2)
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
  "carls-a-mess-uber-eats-summer-house",
];

// Generate bulk KV JSON (articles + updated index)
const bulk = articles.map((a) => ({
  key: `article:${a.slug}`,
  value: JSON.stringify(a),
}));

// Include updated articles:index with all 26 slugs
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
