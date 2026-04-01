// Seed script for DramaRadar batch 2 articles (13-20)
// Usage: node scripts/seed-batch2.js
// Then: npx wrangler kv bulk put --namespace-id=446b2734022b4cb8bfe094b4fc462128 --remote scripts/articles-batch2-bulk.json

const fs = require("fs");

const articles = [
  {
    slug: "rhoa-season-17-pinky-cole-k-michelle-cast-shakeup",
    title: "RHOA Season 17: Pinky Cole, K. Michelle, and the Cast Shakeup Atlanta Needed",
    subtitle: "After a Season 16 that left fans underwhelmed, Bravo has gone all in on a soft reboot with serious new energy.",
    body: `The Real Housewives of Atlanta premieres Season 17 on Sunday, April 5th, and this might be the most exciting cast lineup in years. After a Season 16 that left a lot of fans feeling underwhelmed, Bravo has gone all in on a soft reboot that brings back fan favorites while injecting serious new energy into the franchise.

The headline additions are Pinky Cole and K. Michelle. Pinky Cole built the Slutty Vegan empire into a $100 million business, lost it, and then fought to buy it back. Her Instagram reaction to the casting announcement said everything: "They counted me out. Bravo counted me in." That is the kind of energy RHOA has been missing.

Then there is K. Michelle. If you watched Love and Hip Hop, you already know what she brings to the table. Unfiltered, unapologetic, and completely fearless in confrontation. Andy Cohen himself said he DMed her after seeing early footage to tell her how great she was on the show. Apparently Drew Sidora has already unfollowed her, which tells you everything you need to know about how the season is going to play out before a single episode airs.

The returning cast is equally stacked. Porsha Williams is back full time, newly divorced and reportedly exploring not one but two potential love interests. Phaedra Parks returns after her strong Season 16 comeback. Drew Sidora is navigating a new dating chapter after her separation, and the trailer already teased drama around her new boyfriend allegedly being in another housewife's DMs. Shamea Morton Mwangi finally earned her full time spot and is launching a rum company while dealing with lingering tensions with Porsha. Angela Oakley is holding everyone accountable while managing family challenges after her mother's passing. And Kelli Ferrell is expanding her restaurant empire while fighting off salacious rumors from within the group.

Cynthia Bailey returns as a friend of the cast, because Cynthia Bailey always returns. At this point she is the Bravo equivalent of a hall monitor who graduated but keeps showing up to check on everyone.

Andy Cohen went on Radio Andy and called this "the cast we have been waiting for." He said he was five episodes in and described it as "a delight." When Andy uses words like "delight" and "cackling," that is Bravo code for "this season is going to break the internet."

The cast trip to Dallas looks like it could produce some of the most chaotic footage of the year. Between K. Michelle clashing with Drew, Porsha juggling two love interests, Pinky navigating "plant-based beef" (Bravo's words, not ours), and whatever Phaedra has brewing behind those perfectly arched eyebrows, this season has all the ingredients.

RHOA Season 17 is the franchise's redemption arc. After a few years of fans questioning whether Atlanta still had it, the answer appears to be a resounding yes. The peaches are ripening, and we are here for every single one.

Watch the premiere Sunday, April 5th at 8PM on Bravo. DramaRadar will be covering every episode.

Stay messy.`,
    author: "carly",
    imageUrl: null,
    categories: ["analysis", "exclusives"],
    showTags: ["real-housewives-atlanta"],
    publishedAt: "2026-04-01T09:00:00Z",
    updatedAt: "2026-04-01T09:00:00Z",
    isFeatured: true,
    isExclusive: true,
  },
  {
    slug: "bravo-spring-2026-complete-viewing-guide",
    title: "The Bravo Spring 2026 Schedule Is Absolutely Stacked: Here's Your Complete Viewing Guide",
    subtitle: "Your DVR is about to work overtime. Here is everything airing this spring, broken down by day.",
    body: `If you thought your DVR was working overtime before, brace yourself. Bravo's spring 2026 lineup is one of the most packed schedules the network has ever put together, and we are barely scratching the surface.

Here is everything currently airing or premiering this spring, broken down by day so you can plan your life accordingly. Because let's be honest, your social calendar revolves around the Bravo schedule and there is no shame in admitting it.

## Monday

The week kicks off with **Below Deck Down Under** at 8PM. Season 4 has been delivering the kind of galley drama and crew meltdowns that keep this franchise fresh. Captain Jason is back, Chef Ben is spiraling over guest feedback, and the romantic entanglements below deck are messier than ever.

## Tuesday

Tuesday nights belong to **Summer House** at 8PM, and we probably do not need to explain why this is must-watch television right now. The Amanda and West situation has turned Season 10 into appointment viewing. Every episode is now a treasure hunt for clues about what was really going on behind the scenes.

## Wednesday

Wednesday nights are a double feature. **Southern Hospitality** kicks off at 8PM, followed by the final episodes of **RHOBH Season 15** at 9PM. The RHOBH finale, titled "The Last Supper," promises an explosive dinner in Italy that reportedly fractures longstanding friendships. Then **Ladies of London: The New Reign** follows at 10PM for anyone who wants to cap their night with British aristocratic chaos.

## Thursday

**Southern Charm** reunion territory, wrapping up what has been a surprisingly emotional Season 11. The Charmers are single, messy, and navigating life after love in Charleston.

## April Premieres

The biggest premieres are landing in April. **The Valley** returns April 1st with Season 3, bringing Lala Kent and Tom Schwartz into the full time cast. **The Real Housewives of Rhode Island**, Bravo's newest franchise, premiered its first episode and already has viewers picking sides. And the crown jewel, **RHOA Season 17**, lands on April 5th.

## Late Night

If you somehow still have free time after all of that, Top Chef Season 23 is filming in the Carolinas with Kristen Kish as host, and Watch What Happens Live airs Sunday through Thursday for your nightly dose of Andy Cohen asking the questions the rest of us are thinking.

This is the busiest Bravo has been in years. Set your recordings, charge your phone, and stock up on wine. Spring 2026 is not for the casual viewer.`,
    author: "the-drama-desk",
    imageUrl: null,
    categories: ["guides"],
    showTags: ["summer-house", "real-housewives-beverly-hills", "real-housewives-atlanta", "the-valley", "below-deck", "southern-charm"],
    publishedAt: "2026-03-30T11:00:00Z",
    updatedAt: "2026-03-30T11:00:00Z",
    isFeatured: false,
    isExclusive: false,
  },
  {
    slug: "10-bravo-moments-defined-reality-tv-forever",
    title: "10 Bravo Moments That Defined Reality TV Forever",
    subtitle: "From table flips to Scandoval. We ranked the moments that changed the game permanently.",
    body: `Reality television has produced some of the most iconic moments in pop culture, and Bravo sits at the center of nearly all of them. From table flips to cheating scandals, these are the ten moments that changed the game permanently. We ranked them by cultural impact, because some drama is temporary and some drama rewrites the entire playbook.

## 10. Bethenny Frankel: "Mention It All"

Bethenny Frankel tells everyone to "mention it all" during the RHONY Season 8 reunion. The raw emotion, the tears, the phrase that became a meme overnight. It showed that reunion specials could be more than just recap episodes. They could be the main event.

## 9. Below Deck Invents a Genre

Below Deck introduces the concept of watching rich people be terrible to service workers and somehow making it compelling television. The franchise proved that you do not need mansions and designer bags to create drama. You just need a confined space, alcohol, and a group of people who have to keep smiling.

## 8. Kenya Moore's Scepter

Kenya Moore arrives at the RHOA Season 5 reunion with a scepter and a crown. The audacity. The commitment to the bit. Kenya understood the assignment before "understanding the assignment" was even a phrase.

## 7. Carl Breaks Up With Lindsay on Camera

Carl Radke breaks up with Lindsay Hubbard on camera during Summer House, calling off their engagement in front of the entire cast and crew. The shock of watching it unfold in real time set a new standard for what "unscripted" television could capture.

## 6. "Beast? How Dare You" in Amsterdam

The RHOBH cast goes to Amsterdam and the "Beast? How dare you" dinner turns into one of the most quoted Bravo scenes in history. Eileen Davidson's reaction became a GIF that transcended the show's audience entirely.

## 5. Phaedra's Exit

Phaedra Parks and the lie that ended her RHOA run. The Season 9 reunion exposed a fabricated accusation that was so severe it resulted in Phaedra's exit from the show. It was the moment that proved even Bravo had a line that could not be crossed.

## 4. Kim Richards and the Legal Fallout

Kim Richards stealing at a store becomes a national news story. The intersection of reality TV and real legal trouble blurred the line between entertainment and genuine concern for a cast member's wellbeing.

## 3. Lisa Vanderpump Leaves RHOBH

Lisa Vanderpump leaves RHOBH over "Puppygate" and refuses to attend the reunion. The most famous exit in franchise history. She did not slam the door on her way out. She gently closed it, and the silence was louder than any table flip.

## 2. Teresa Flips the Table

Teresa Giudice flips the table at a dinner party in RHONJ Season 1. The moment that launched a thousand memes, a thousand GIFs, and arguably the entire modern Bravo empire. Before the table flip, Housewives was a niche show. After the table flip, it was a cultural phenomenon.

## 1. Scandoval

Tom Sandoval's affair with Raquel Leviss was exposed and the entire entertainment industry stopped to watch Vanderpump Rules become the most talked about show on television. It generated more social media engagement than any unscripted television event in history. Cameras resumed filming after the season had wrapped. The reunion broke viewership records. It proved that reality TV, when it captures something genuinely real, is the most powerful storytelling medium on the planet.

Receipts attached.`,
    author: "bbs-assistant",
    imageUrl: null,
    categories: ["rankings"],
    showTags: ["real-housewives-new-jersey", "vanderpump-rules", "real-housewives-atlanta", "real-housewives-beverly-hills", "summer-house"],
    publishedAt: "2026-03-23T14:00:00Z",
    updatedAt: "2026-03-23T14:00:00Z",
    isFeatured: false,
    isExclusive: false,
  },
  {
    slug: "guide-watching-real-housewives-first-time-2026",
    title: "Your Guide to Watching Real Housewives for the First Time: Where to Start in 2026",
    subtitle: "Eight franchises, hundreds of episodes, and one very important question: where do you even begin?",
    body: `So someone in your life finally convinced you to watch Real Housewives and now you are staring at eight different franchises across hundreds of episodes wondering where on earth to begin. First of all, welcome. Your life is about to get significantly more dramatic and significantly less productive. Second, do not panic. I am going to walk you through exactly where to start based on what kind of chaos you prefer.

## If You Want Pure Entertainment

Start with **Real Housewives of Atlanta**. RHOA is the funniest franchise by a mile. The one-liners, the shade, the confessional reactions. Nobody does it like the Atlanta women. Start with Season 1 if you want the full journey, or jump to Season 3 when Phaedra Parks joins and the show hits another gear entirely.

## If You Want Glamour and Dark Drama

Go with **Real Housewives of Beverly Hills**. The early seasons with Lisa Vanderpump, Kyle Richards, and the late Taylor Armstrong deal with genuinely heavy subject matter wrapped in diamond-encrusted packaging. It is not always easy to watch, but it is always compelling.

## If You Want Family Drama

**Real Housewives of New Jersey** is your franchise. The Teresa and Joe Giudice saga spans legal battles, prison time, deportation, and somehow a redemption arc. The Gorga family dynamics alone could fuel a decade of therapy sessions.

## If You Want Chaotic Unpredictable Energy

**Real Housewives of Salt Lake City** is where you go. RHOSLC burst onto the scene with a cast that includes a woman running an alleged cult-adjacent business who was arrested by federal agents on camera during filming. You literally cannot script what happens on this show because no writer would be bold enough to pitch it.

## If You Want Consistent Excellence

**Real Housewives of Potomac** quietly delivers every single season. The Karen Huger and Gizelle Bryant rivalry is one of the most entertaining long-running feuds in the entire Bravo universe.

## If You Want the Full Evolution

Start with **Real Housewives of New York** Season 1 and watch it become a completely different show by Season 10. The Bethenny Frankel era is legendary television.

## One Last Tip

Do not try to watch everything at once. Pick one franchise, commit to it, and let the obsession build naturally. Before you know it, you will be following cast members on Instagram, reading gossip blogs at midnight, and explaining to your friends why the seating arrangement at a charity gala was actually a declaration of war. That is the Housewives experience. Embrace it.

Signing off before I spiral.`,
    author: "betsy",
    imageUrl: null,
    categories: ["guides"],
    showTags: ["real-housewives-beverly-hills", "real-housewives-atlanta", "real-housewives-new-jersey", "real-housewives-new-york", "real-housewives-salt-lake-city", "real-housewives-potomac"],
    publishedAt: "2026-03-19T10:00:00Z",
    updatedAt: "2026-03-19T10:00:00Z",
    isFeatured: true,
    isExclusive: false,
  },
  {
    slug: "southern-charm-season-11-reunion-single-charleston",
    title: "Southern Charm Season 11 Reunion: The Era of Being Single in Charleston",
    subtitle: "Everybody is single and nobody is handling it gracefully. The reunion addressed all of it.",
    body: `The Southern Charm Season 11 reunion just wrapped, and the theme could not be more clear: everybody is single and nobody is handling it gracefully.

This season was supposed to mark a new chapter for the Charmers. The group was entering what the show described as a "grown-up era." Businesses were thriving. There were new ventures, new perspectives, and a sense that maybe, just maybe, the cast had matured past the bar fights and boat drama of earlier seasons.

That lasted about three episodes.

By mid-season it became clear that nearly every relationship the cast entered the season with was either ending or already over. The romantic fallout dominated the back half of the season, and the friendships that were supposed to hold the group together started fracturing under the weight of everyone's individual chaos.

**Craig Conover**, who came into the season fresh off his breakup with Paige DeSorbo, spent most of the season navigating life as a single entrepreneur in Charleston. His pillow business is thriving, which is honestly the most stable relationship any Southern Charm cast member has maintained in a decade.

**Shep Rose** continued his journey of self-discovery, which at this point is a multi-season arc that shows no signs of resolution. **Austen Kroll** leaned into his social media presence and apparently has opinions about every other Bravo show's drama, as evidenced by his pointed Summer House commentary.

**Madison LeCroy**, who has never met a situation she could not make more dramatic, provided her usual share of memorable moments. And the newer cast members who were supposed to bring fresh energy found themselves getting pulled into the same patterns that have defined Charleston's social scene since Season 1.

The reunion addressed all of it. The post-relationship awkwardness, the business rivalries, the friendships that quietly died over text message, and the ones that exploded on camera. Andy Cohen navigated the usual minefield of accusations and deflections, but the underlying message was unmistakable: being single in Charleston is not the freedom these people thought it would be.

What makes Southern Charm enduring is its honesty about that reality. These are people in their thirties and forties learning in real time that ending one chapter does not automatically start a better one. Sometimes the next chapter is just messier.

Season 12 has not been officially announced, but given the state of things, there is more than enough unfinished business to justify another round.

The receipts don't lie.`,
    author: "felicia",
    imageUrl: null,
    categories: ["recaps"],
    showTags: ["southern-charm"],
    publishedAt: "2026-03-31T17:00:00Z",
    updatedAt: "2026-03-31T17:00:00Z",
    isFeatured: false,
    isExclusive: false,
  },
  {
    slug: "how-deuxmoi-became-most-powerful-force-reality-tv-gossip",
    title: "How Deuxmoi Became the Most Powerful Force in Reality TV Gossip",
    subtitle: "An anonymous Instagram account now regularly breaks stories before TMZ, E! News, and Page Six.",
    body: `If you follow reality TV gossip, you already know the name Deuxmoi. If you don't, here is the short version: an anonymous Instagram account that has become arguably the most influential gossip source in entertainment. And if you have been paying attention to the Summer House Amanda and West situation, you watched Deuxmoi drive an entire news cycle in real time.

Deuxmoi started in 2020 as a celebrity sighting account. People would submit anonymous tips about where they spotted celebrities, who was dating who, and which couples were secretly broken up. It was fun, low-stakes gossip. Nobody took it too seriously.

That changed fast.

## The Intelligence Network

The account grew into a full-blown celebrity intelligence network. Tips come in from waiters, bartenders, PR assistants, production staff, and apparently anyone within six degrees of a famous person. Deuxmoi publishes the tips with minimal editing and a standard disclaimer that the information is unverified. But here is the thing: the tips are right often enough that entertainment journalists now monitor the account as a source lead.

## The Summer House Case Study

The Summer House saga is the perfect case study. Deuxmoi published the first Amanda and West tip on March 6th, claiming they were casually hooking up and were spotted being openly flirty at a NYC event. Traditional media picked it up days later. Cast members started posting cryptic reactions. By the time Amanda and West confirmed the relationship on March 31st, Deuxmoi had been ahead of the story by nearly a month.

This is the new reality TV gossip pipeline. It does not start with a press release or a magazine exclusive. It starts with an anonymous tip on an Instagram story that gets screenshotted, shared, dissected in group chats, posted on Reddit, picked up by blogs, and eventually confirmed by the people involved.

## Moving Markets

Deuxmoi also reported that Bravo was exploring contingency plans for Summer House, including possible cancellation. That tip landed before any traditional outlet had the story. Whether the information ultimately proves accurate or not, the fact that it shaped the public conversation for days demonstrates how much power this account holds.

## The Bigger Picture

The media landscape has fundamentally shifted. An anonymous Instagram account with no editorial oversight and no accountability for accuracy now regularly breaks stories before TMZ, E! News, and Page Six. That should terrify traditional media outlets, and it probably does. But for reality TV fans, it has created an entirely new layer of engagement. You are not just watching the shows anymore. You are reading the tips, forming theories, and watching those theories play out in real time across multiple platforms.

Deuxmoi did not invent celebrity gossip. But it democratized it in a way that nobody saw coming. And for better or worse, the entertainment industry is never going back.

You're welcome.`,
    author: "bb",
    imageUrl: null,
    categories: ["analysis", "exclusives"],
    showTags: ["summer-house", "vanderpump-rules"],
    publishedAt: "2026-03-26T08:00:00Z",
    updatedAt: "2026-03-26T08:00:00Z",
    isFeatured: false,
    isExclusive: true,
  },
  {
    slug: "90-day-fiance-universe-complete-guide-every-spinoff",
    title: "The 90 Day Fiance Universe Explained: A Complete Guide to Every Spinoff",
    subtitle: "There are over a dozen shows in this franchise. Here is your spreadsheet-level breakdown.",
    body: `The 90 Day Fiance franchise on TLC has expanded into something that resembles a cinematic universe more than a television show. If you have ever looked at the lineup and felt confused about which spinoff is which, you are not alone. There are currently over a dozen shows connected to the original 90 Day Fiance concept, and keeping track of all of them requires a spreadsheet that I absolutely maintain.

## The Original

**90 Day Fiance** follows couples where one partner is American and the other is from another country. The foreign partner arrives in the US on a K-1 visa, which gives the couple exactly 90 days to get married or the foreign partner has to leave. The premise is simple but the drama it produces is anything but.

## The Core Spinoffs

**90 Day Fiance: Before the 90 Days** follows couples who have not yet met in person. They travel internationally to meet for the first time, and the results range from genuinely heartwarming to catastrophically uncomfortable.

**90 Day Fiance: Happily Ever After** checks in on couples from previous seasons to see how married life is treating them. The answer is usually "not great" because happy marriages do not generate compelling television.

**90 Day Fiance: The Other Way** flips the premise. Instead of the foreign partner coming to America, the American partner moves abroad. This produces a completely different kind of culture shock content and some of the franchise's most dramatic storylines.

**90 Day Fiance: The Single Life** follows cast members who have broken up and are navigating the dating world again. Think of it as the franchise's redemption arc department.

## The Companion Shows

**90 Day Fiance: Pillow Talk** is the commentary show where former cast members watch and react to current episodes from their couches. It is surprisingly entertaining and has turned several cast members into fan favorites purely based on their couch commentary skills.

**90 Day Diaries** features self-filmed updates from cast members. **90 Day Bares All** is the unfiltered, uncensored companion show. **90 Day: The Last Resort** puts struggling couples in a retreat setting. And **90 Day Fiance UK** brings the format to British couples.

## Why It Works

The franchise works because at its core, it tells stories about people making enormous life decisions based on love, often with incomplete information and wildly unrealistic expectations. Some couples are genuine and their journeys are moving to watch. Others are clearly in it for the wrong reasons and the resulting chaos is impossible to look away from.

If you are starting fresh, begin with the original 90 Day Fiance and pick a season that has a cast member you recognize from social media. The fandom will do the rest.

The receipts don't lie.`,
    author: "felicia",
    imageUrl: null,
    categories: ["guides"],
    showTags: ["90-day-fiance"],
    publishedAt: "2026-03-21T13:00:00Z",
    updatedAt: "2026-03-21T13:00:00Z",
    isFeatured: false,
    isExclusive: false,
  },
  {
    slug: "love-island-usa-vs-uk-which-version-watching",
    title: "Love Island USA vs Love Island UK: Which Version Should You Be Watching?",
    subtitle: "The great Love Island debate, settled once and for all. (Just kidding. The debate will never end.)",
    body: `The Love Island debate is one of the great divides in reality TV fandom. On one side you have the UK version, the original, the gold standard, the show that turned ITV2 into a cultural force every summer. On the other side you have the US version, the scrappy underdog that spent years trying to find its footing and has finally figured out what makes it work.

So which one should you be watching? The honest answer is both. But if you can only pick one, here is how they compare.

## Love Island UK

Love Island UK is the more polished production. The British cast tends to deliver sharper banter, more creative insults, and a level of emotional intelligence in their confessionals that the American cast often lacks. The accents help. Everything sounds more dramatic and more charming when delivered in a British accent. The UK version also benefits from being the original format. The pacing, the challenges, the recoupling ceremonies all originated here, and there is a smoothness to the production that comes from years of refinement.

## Love Island USA

Love Island USA took several seasons to find its identity. The early seasons felt like a pale imitation of the UK version, with casts that were too polished and drama that felt too manufactured. But somewhere around Season 5, something clicked. The producers started casting for chaos instead of Instagram followers. They leaned into the messiness. They let genuine conflicts play out instead of engineering storylines. And the result has been some of the most entertaining reality television on any platform.

## The Key Difference

The key difference is tone. Love Island UK plays its drama with a wink. The cast members are aware they are on a show and they perform accordingly. There is a theatrical quality to the arguments and the romantic declarations that makes it feel like a well-produced soap opera.

Love Island USA plays it straighter. The emotional moments hit harder because the cast seems less aware of how they are coming across. When someone gets their heart broken on the US version, it feels genuinely uncomfortable in a way the UK version rarely achieves. The flip side is that the American cast can sometimes be less self-aware, which leads to moments of unintentional comedy that the UK version does not produce as often.

## The Bottom Line

Both versions share the fundamental appeal of watching attractive people in a beautiful location make terrible romantic decisions under constant surveillance. Both versions will consume your entire summer if you let them. Both versions will have you shouting at your television at 11PM on a Tuesday.

For first-time viewers, start with **Love Island UK Season 3 or Season 5** for the best introduction to the format. For Love Island USA, **Season 5** is widely considered the breakthrough season.

Then once you are hooked, watch both. Your summer evenings are no longer your own. Welcome to the villa.

Signing off before I spiral.`,
    author: "betsy",
    imageUrl: null,
    categories: ["analysis"],
    showTags: ["love-island"],
    publishedAt: "2026-03-16T16:00:00Z",
    updatedAt: "2026-03-16T16:00:00Z",
    isFeatured: false,
    isExclusive: false,
  },
];

// Generate bulk KV JSON
const bulk = articles.map((a) => ({
  key: `article:${a.slug}`,
  value: JSON.stringify(a),
}));

fs.writeFileSync(
  "scripts/articles-batch2-bulk.json",
  JSON.stringify(bulk, null, 2)
);

// Output the new slugs for index update
console.log(`Generated ${articles.length} articles`);
console.log("New slugs:", JSON.stringify(articles.map(a => a.slug)));
