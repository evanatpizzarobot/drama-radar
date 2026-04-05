// Seed script for DramaRadar batch 3 articles (21-23)
// Usage: node scripts/seed-batch3.js
// Then: npx wrangler kv bulk put --namespace-id=446b2734022b4cb8bfe094b4fc462128 --remote scripts/articles-batch3-bulk.json

const fs = require("fs");

const articles = [
  {
    slug: "ciara-video-amanda-west",
    title: "The Video That Changed Everything: How Ciara Found Out About Amanda and West",
    subtitle: "Ciara reportedly obtained video evidence before Amanda's confession text. The Scandoval comparisons just got real.",
    body: `Just when you thought the Summer House scandal had reached peak mess, a new detail dropped that makes the entire situation exponentially worse. According to TMZ, Ciara Miller did not find out about Amanda Batula and West Wilson's relationship from a text, a phone call, or even a gossip blog. She found out from a video.

Sources told TMZ that Ciara obtained a video allegedly showing Amanda and West being intimate in his apartment. Not a rumor. Not a screenshot. A video. And here is the detail that makes it truly disturbing: neither Amanda nor West knew they were being recorded.

Let that sink in for a moment. Ciara's best friend was secretly involved with her ex-boyfriend, and she found out by watching a video of them together that was filmed without their knowledge. The Scandoval comparisons were already inevitable, but this detail pushes it into territory that goes beyond reality TV drama and into genuinely uncomfortable questions about privacy and consent.

The timeline makes it even worse. Amanda reportedly texted Ciara on Monday afternoon, telling her she never meant to hurt her and that she wanted to sort out her feelings about West before discussing the romance. But by that point, Ciara had already seen the video. She already knew. Amanda's text was not a confession. It was damage control after getting caught.

The next day, Amanda and West posted their joint Instagram statement. They talked about needing "a little space to process things privately" and wanting to "provide some clarity." But the statement reads very differently when you know that Ciara had already seen visual evidence. They were not getting ahead of the story. They were chasing it.

We still do not know who recorded the video or how Ciara obtained it. TMZ's sources could not clarify the origin, and that raises its own set of questions. Was it a doorbell camera? A security feed? Someone else who was there? The fact that it exists at all adds a layer to this story that goes beyond who is dating who.

Meanwhile, the internet's response has been overwhelming and almost entirely one-sided. Team Ciara was already the dominant sentiment before this news broke. After the video detail emerged, it became a landslide. The comments under every Summer House related post are flooded with support for Ciara and criticism of Amanda and West.

Kyle Cooke has also entered the conversation again. He told interviewer Adam Glyn that he "figured out over the weekend" about the relationship and spoke with Amanda before she released the statement. But the most notable thing Kyle said was that he is genuinely worried about Amanda. He said she is "kind of getting cyberbullied" and asked fans to ease up on their online criticism.

That is a complicated statement from someone who just got publicly humiliated by his estranged wife's new relationship with his close friend. The fact that Kyle's instinct is to express concern for Amanda rather than anger says something about who he is. It also says something about how intense the backlash has been if even the person most wronged by the situation is telling people to calm down.

But here is the reality of the situation: Amanda and West made choices. They chose to pursue a relationship with full knowledge of how it would affect Ciara and Kyle. They chose to deny it publicly on Watch What Happens Live. They chose to hide it until the internet forced their hand. Accountability is not cyberbullying.

The reunion tapes in roughly two weeks. Ciara, Amanda, West, and Kyle will all be in the same room. Andy Cohen will have the video detail to ask about. And millions of viewers will be watching to see if anyone takes real responsibility for the mess they created.

This story is not slowing down. It is accelerating.

You're welcome.`,
    author: "bb",
    imageUrl: null,
    categories: ["reality-tv", "bravo", "breaking"],
    showTags: ["summer-house"],
    publishedAt: "2026-04-03T10:00:00Z",
    updatedAt: "2026-04-03T10:00:00Z",
    isFeatured: true,
    isExclusive: true,
  },
  {
    slug: "kyle-cooke-wild-betrayal-hero",
    title: "Kyle Cooke Calls West Wilson's Actions a \"Wild Betrayal\" and Somehow Becomes the Hero",
    subtitle: "The Summer House OG is handling the biggest scandal in show history with unexpected grace, and the internet cannot get enough.",
    body: `I never expected to write the sentence "Kyle Cooke is handling this with grace" and yet here we are. The Summer House OG, who has spent a decade on Bravo being equal parts charming and chaotic, is somehow emerging from the biggest scandal in show history as the most sympathetic person involved.

Kyle spoke out after Amanda and West confirmed their relationship, and his comments have been the most revealing of anyone connected to the situation. He told E! News that what West did constitutes a "wild betrayal" and addressed the state of their friendship directly. The implication was clear: that friendship is over.

But what made Kyle's response stand out was what he said next. Despite being the man whose estranged wife started dating his close friend while their divorce ink was still drying, Kyle's primary concern was for Amanda's mental health. He told interviewer Adam Glyn that he is "actually really worried about Amanda" and pointed out that the online criticism has crossed into cyberbullying territory.

Think about that for a second. Kyle Cooke, the guy who has been dragged on this show for years for his communication issues and his party-first lifestyle, is standing up and saying "hey, the person who hurt me is getting hurt worse and that is not okay." That is emotional maturity that most people do not demonstrate in private, let alone on a public platform.

He also confirmed that he found out about the relationship over the weekend and spoke with Amanda before she posted the joint statement. That means Kyle knew before the public did and chose not to get ahead of the story himself. He could have been the one to break the news. He could have played the victim publicly for maximum sympathy. Instead, he let Amanda and West control their own narrative and waited to comment until after their statement.

The internet has noticed. Social media is full of posts declaring Kyle the unexpected hero of this entire saga. His Instagram post tagging himself at the "Psych Ward" with Ciara was already iconic. But his subsequent comments about worrying for Amanda's wellbeing elevated him from "funny reaction" to "genuinely good person handling an impossible situation."

Kyle and Ciara are also becoming the friendship nobody saw coming. They have been spotted together, they have been posting together, and the internet has fully embraced the idea of these two forming an alliance built on shared betrayal. The Kyle and Ciara revenge friendship era is upon us and I am here for every second of it.

The Summer House reunion cannot come soon enough. Kyle has earned the right to say whatever he wants in that chair, and based on everything we have seen so far, he is going to do it with the kind of composure that makes everyone else look worse by comparison.

Never thought I would say this, but Kyle Cooke might be the best character on Bravo right now.

Signing off before I spiral.`,
    author: "betsy",
    imageUrl: null,
    categories: ["reality-tv", "bravo"],
    showTags: ["summer-house"],
    publishedAt: "2026-04-04T09:00:00Z",
    updatedAt: "2026-04-04T09:00:00Z",
    isFeatured: true,
    isExclusive: false,
  },
  {
    slug: "summer-house-cast-sides-guide",
    title: "The Cast Has Chosen Sides: A Complete Guide to Who Supports Who in the Summer House Scandal",
    subtitle: "Nearly every person connected to the show has made their position known. Here is the definitive breakdown.",
    body: `In any reality TV scandal, the cast reactions tell you more than any official statement ever could. The Summer House Amanda and West situation has been no exception. Over the past week, nearly every person connected to the show has made their position known through social media posts, interviews, or strategically timed silence. Here is the definitive breakdown of where everyone stands.

## Team Ciara

**Ciara Miller**: Unfollowed both Amanda and West immediately after their joint statement. Has not posted a single public comment. Her silence is the loudest statement anyone has made. She was reportedly shown a video of Amanda and West being intimate before the public announcement, which means her pain started before anyone else even knew what was happening.

**Paige DeSorbo**: Posted support for Ciara and has been liking comments critical of Amanda and West. Paige and Ciara have been close friends since their time on the show together, and Paige is clearly not trying to stay neutral. She has picked her side and she wants everyone to know it.

**Hannah Berner**: Reposted a 50 Cent meme with the caption "when someone says you were right about them." Hannah had a falling out with Amanda in a previous season and left the show partly due to that conflict. She also shared a TikTok about getting revenge on someone who wronged her six years ago. Hannah has been sitting on this energy for years and is finally getting her moment.

**Lindsay Hubbard**: Posted a photo with Ciara over the weekend showing solidarity. Also commented on a Rumble boxing gym post that said West Wilson would be a guest trainer. Lindsay's comment: "Is he the bag?" which is the kind of subtle, devastating shade that separates the veterans from the rookies.

**Carl Radke**: Quietly liked several pro-Ciara posts but has not made any public comments. Carl knows better than anyone what it is like to be at the center of a Summer House scandal after his broken engagement with Lindsay played out on camera.

**KJ Dillard**: Posted cryptic Instagram stories with shocked facial expressions from the show. Did not name names but the timing made the subject matter obvious.

## Team Amanda (Population: Approximately Zero)

The public support for Amanda has been virtually nonexistent from the cast. No cast member has posted anything defending her decision or expressing support for the new relationship. This is notable because Amanda has been on the show since Season 1. She has a decade of relationships with these people. The fact that not one of them has publicly stood by her tells you how the cast feels about the situation.

## The Kyle Position

Kyle Cooke exists in his own category. He has criticized West directly, calling the situation a "wild betrayal." But he has also expressed genuine concern for Amanda's mental health and asked the public to stop cyberbullying her. Kyle is simultaneously the wronged party and the person showing the most compassion for the person who wronged him. He tagged a photo with Ciara from the "Psych Ward" which showed his sense of humor is intact. He and Ciara appear to be forming an unexpected bond over their shared experience.

## The Cross-Show Commentary

Austen Kroll from Southern Charm posted about how "pasta and your friends' exes are apparently so back," which was both a reference to the Amanda situation and a callback to the Scandoval pasta dinner. When Southern Charm cast members are weighing in on your mess, you have achieved peak Bravo saturation.

## The Silence

West Wilson has gone quiet since the joint statement. No interviews, no Instagram stories, no follow-up comments. Whether this is strategic restraint or genuine awareness that anything he says will make things worse is unclear. Either way, his silence contrasts sharply with the rest of the cast's very public reactions.

Amanda Batula has also been mostly quiet since the statement, aside from the reported text to Ciara. Kyle's comments about cyberbullying suggest that the online response has been severe enough to affect her daily life.

## What This Means for the Reunion

The reunion is going to be a minefield. Based on the positions outlined above, Amanda and West will be walking into a room where virtually no one is on their side. Ciara will have the support of Paige, Hannah, Lindsay, and likely most of the newer cast. Kyle will have the moral high ground and the audience's sympathy. Andy Cohen will have approximately four hours of material to work through.

The seating chart alone is going to be a declaration of war.

The receipts don't lie.`,
    author: "felicia",
    imageUrl: null,
    categories: ["reality-tv", "bravo"],
    showTags: ["summer-house"],
    publishedAt: "2026-04-05T08:00:00Z",
    updatedAt: "2026-04-05T08:00:00Z",
    isFeatured: true,
    isExclusive: true,
  },
];

// All 23 article slugs (batch 1: 12, batch 2: 8, batch 3: 3)
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
  // Batch 3 (this file)
  "ciara-video-amanda-west",
  "kyle-cooke-wild-betrayal-hero",
  "summer-house-cast-sides-guide",
];

// Generate bulk KV JSON (articles + updated index)
const bulk = articles.map((a) => ({
  key: `article:${a.slug}`,
  value: JSON.stringify(a),
}));

// Include updated articles:index with all 23 slugs
bulk.push({
  key: "articles:index",
  value: JSON.stringify(allSlugs),
});

fs.writeFileSync(
  "scripts/articles-batch3-bulk.json",
  JSON.stringify(bulk, null, 2)
);

console.log(`Generated ${articles.length} articles`);
console.log(`Updated articles:index with ${allSlugs.length} total slugs`);
console.log("New slugs:", JSON.stringify(articles.map((a) => a.slug)));
console.log("\nRun:");
console.log("  npx wrangler kv bulk put --namespace-id=446b2734022b4cb8bfe094b4fc462128 --remote scripts/articles-batch3-bulk.json");
