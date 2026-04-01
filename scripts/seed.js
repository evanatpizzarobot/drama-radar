// Seed script for DramaRadar editorial articles and predictions
// Usage: node scripts/seed.js
// Then: npx wrangler kv:bulk put --namespace-id=446b2734022b4cb8bfe094b4fc462128 scripts/articles-bulk.json
//       npx wrangler kv:bulk put --namespace-id=446b2734022b4cb8bfe094b4fc462128 scripts/predictions-bulk.json

const fs = require("fs");

// ====================================================
// ARTICLES
// ====================================================

const articles = [
  {
    slug: "scamanda-podcast-reality-tv-pipeline",
    title: "From True Crime Podcast to Reality TV: The Scamanda Pipeline Is Real",
    subtitle: "How a viral true crime podcast turned Amanda Riley into the most polarizing figure in reality television.",
    body: `It started, as these things often do, with a podcast.

*Scamanda* dropped in 2023 and became one of the most downloaded true crime series of the year. The show followed the story of Amanda Riley, a woman who faked a cancer diagnosis and scammed friends, family, and strangers out of hundreds of thousands of dollars through a GoFundMe campaign. She was eventually convicted of wire fraud and sentenced to federal prison.

But this is reality TV, and in this universe, a criminal conviction is basically an audition tape.

## The Crossover Nobody Asked For

When producers began floating the idea of Amanda appearing on a Bravo-adjacent project, the internet collectively lost its mind. Not because it was surprising, but because it was inevitable. The reality TV industrial complex has always had a complicated relationship with accountability. We watch people lie, scheme, and manipulate on camera every week. The only difference with Amanda is that she did it off camera first.

## Why It Matters for Reality TV

The "Scamanda pipeline" (a term coined by fans on Reddit, naturally) points to a larger trend in casting. Networks are increasingly pulling from true crime, social media scandals, and viral moments rather than traditional casting calls. The logic is simple: built-in audiences mean built-in ratings.

We have seen it before. Teresa Giudice came back from federal prison and immediately became the center of RHONJ again. Jen Shah's legal saga dominated two full seasons of RHOSLC. Erika Jayne's legal entanglements have been the backbone of RHOBH for years now.

## The Fan Reaction

The discourse has been split almost perfectly down the middle. One camp argues that giving Amanda a platform rewards fraud and disrespects the people she scammed. The other camp points out that reality TV has never been a meritocracy and that refusing to watch has never stopped a show from getting renewed.

What nobody is debating is whether people will tune in. They absolutely will. Hate-watching is still watching, and the networks know it.

## Where This Goes Next

Keep an eye on casting announcements for the next cycle of Bravo shows. If Amanda Riley ends up on a couch at a reunion, remember: DramaRadar called it first.

The Scamanda pipeline is open, and it is not closing anytime soon.`,
    author: "carly",
    imageUrl: null,
    categories: ["hot-takes", "analysis"],
    showTags: [],
    publishedAt: "2026-03-18T14:00:00Z",
    updatedAt: "2026-03-18T14:00:00Z",
    isFeatured: true,
    isExclusive: true,
  },
  {
    slug: "team-ciara-summer-house-internet-rallies",
    title: "Team Ciara: How the Internet Rallied Behind Summer House's Breakout Star",
    subtitle: "Ciara Miller went from cast member to cultural moment in the span of one episode. Here is how it happened.",
    body: `There is a moment in every reality TV season where the narrative shifts. One person goes from background player to main character overnight. This season on Summer House, that person is Ciara Miller, and the internet has made its position very clear: they are Team Ciara, and they are loud about it.

## The Tipping Point

It started during the now infamous pool party episode. What began as a casual group hangout escalated into a full blown confrontation when Amanda and West cornered Ciara about comments she allegedly made off camera. Ciara held her ground, stayed composed, and delivered what fans are calling "the most iconic clapback in Summer House history."

Within hours, the clip had millions of views across TikTok, Twitter, and Instagram. The hashtag #TeamCiara trended for 18 straight hours.

## The Numbers Tell the Story

Ciara's Instagram following jumped by over 200,000 in a single week. Her engagement rate tripled. Brands that had been sitting on the sideline suddenly wanted in. Multiple sources confirm she has received partnership offers from major fashion and beauty labels since the episode aired.

For context: that kind of growth usually takes an entire season arc. Ciara did it in one episode.

## Why Ciara Resonates

Part of Ciara's appeal is her refusal to perform for the cameras. In a house full of people who seem acutely aware of their edit, Ciara comes across as genuinely unbothered. She does not start fights for screen time. She does not engineer confrontations. When drama finds her, she handles it with a directness that feels refreshing in a genre built on passive aggression and talking heads.

Fans have also pointed out her loyalty. When the house split into factions this season, Ciara did not play both sides. She picked her people and stuck with them, even when it would have been strategically smarter to stay neutral.

## What the Cast Thinks

The other cast members have taken notice. Kyle Cooke posted a photo with Ciara at a recent event, sparking alliance rumors. Paige DeSorbo liked several pro-Ciara tweets (and then unlike them, but the screenshots live forever). Lindsay Hubbard posted a cryptic Story that fans interpreted as supportive.

Amanda and West, for their part, have been notably quiet on social media since the episode aired. Their joint Instagram post about "choosing love over noise" was ratio'd into oblivion.

## The Bigger Picture

Ciara's moment is part of a larger shift in how audiences engage with reality TV. The parasocial relationship between viewers and cast members has never been stronger, and social media has given fans a direct line to express support or disapproval. When the internet decides it likes someone, it goes all in. When it decides it does not, the fallout is swift.

For Ciara, the support has been overwhelmingly positive. She is not just winning the Summer House season. She is winning the internet.

And in 2026, that might matter more.`,
    author: "betsy",
    imageUrl: null,
    categories: ["analysis", "exclusives"],
    showTags: ["summer-house"],
    publishedAt: "2026-03-22T10:30:00Z",
    updatedAt: "2026-03-22T10:30:00Z",
    isFeatured: true,
    isExclusive: true,
  },
  {
    slug: "summer-house-season-10-cast-guide",
    title: "The Complete Summer House Season 10 Cast Guide: Who's Who and Why You Should Care",
    subtitle: "Your essential guide to every housemate, alliance, and simmering feud heading into the most dramatic season yet.",
    body: `Summer House Season 10 might be the most consequential season in the show's history. Between the West and Amanda saga, Ciara's rise, and Kyle's apparent revenge arc, there is more going on this summer than most franchises pack into three seasons.

Here is your complete guide to who is in the house, where they stand, and what to watch for.

## The Returning Players

**Kyle Cooke** (Co-founder, Loverboy)
Status: Divorced from Amanda. Living his best post-split life. Has been spotted with multiple women at events but insists he is "focused on business." The internet is not buying it, but they are entertained.

**Amanda Batula** (Designer)
Status: Also divorced from Kyle. Now dating West Wilson, which has created the central conflict of the season. Her joint statement with West defending their relationship set the tone for everything that followed.

**Ciara Miller** (Model, Registered Nurse)
Status: The breakout star. Fan favorite by a massive margin. See our full feature on her rise.

**Paige DeSorbo** (Fashion commentator)
Status: Still the confessional queen. Her commentary this season has been sharper than ever. Maintaining a careful neutrality in the house split while clearly enjoying the chaos.

**West Wilson** (Entrepreneur)
Status: At the center of the storm. His relationship with Amanda has divided the house and the fanbase. The matching sweatshirts moment will live in Summer House infamy.

## The New Faces

Two new cast members joined this season. Both have already made their presence felt. We will not spoil specific moments, but expect both to be deeply embedded in the drama by mid-season.

## The Alliances

The house has split into clear factions this year:

**Team Ciara**: Ciara, Kyle (surprisingly), and two of the new cast members. This group has the internet's support and the better social media numbers.

**Team Amanda/West**: Amanda, West, and their core supporters. They have the production narrative but are fighting an uphill battle online.

**The Neutrals**: Paige and one other cast member who are playing both sides. This strategy has a limited shelf life and usually ends with nobody trusting you at the reunion.

## What to Watch For

The reunion is going to be nuclear. Filming has already wrapped, and sources say it went several hours over schedule. Multiple cast members left the stage at different points. Andy Cohen reportedly had to intervene more than once.

This season is not just about one house. It is about the future of the franchise. How this plays out will determine casting decisions, spinoff potential, and whether Summer House survives in its current form.

Stay tuned. We are tracking every development.`,
    author: "bbs-assistant",
    imageUrl: null,
    categories: ["guides"],
    showTags: ["summer-house"],
    publishedAt: "2026-03-20T16:00:00Z",
    updatedAt: "2026-03-20T16:00:00Z",
    isFeatured: true,
    isExclusive: false,
  },
  {
    slug: "vanderpump-rules-reboot-survival",
    title: "Vanderpump Rules Without Scandoval: Can the Show Survive Its Own Reboot?",
    subtitle: "The most explosive reality TV scandal in a decade changed everything. Now the show has to figure out what comes next.",
    body: `Vanderpump Rules defined an era. For a solid decade, it delivered some of the most iconic moments in reality television history. The Stassi and Jax saga. The pasta incident. And then, in 2023, the nuclear bomb that was Scandoval: Tom Sandoval's affair with Raquel Leviss, exposed on camera, blowing up his nine-year relationship with Ariana Madix and breaking the internet in the process.

That moment made Vanderpump Rules the most talked about show on television. It also made it nearly impossible to follow.

## The Reboot Problem

Bravo announced a "soft reboot" of VPR in late 2025, bringing in a new cast of SUR employees while keeping Lisa Vanderpump as the anchor. The original cast, with the exception of a few rumored guest appearances, would not return.

The reaction was mixed. Fans who had followed the OG cast for years felt abandoned. New viewers saw an opportunity to get in on the ground floor. And critics questioned whether a show so defined by its specific cast dynamics could survive a wholesale replacement.

## What the New Season Looks Like

Three episodes in, the answer is: complicated. The new cast is younger, more diverse, and very aware of social media in a way the original group was not when they started. They know the playbook. They have seen what works and what gets you fired. That self-awareness is both the show's biggest asset and its biggest liability.

The best reality TV happens when people forget the cameras are there. When the new cast is relaxed, there are glimpses of genuine chemistry and real conflict. When they are performing, it feels like a scripted show with bad writing.

## Can Lightning Strike Twice?

Scandoval was a once-in-a-generation event. Nobody is expecting the new cast to deliver something on that level. But VPR does not need another Scandoval to succeed. It needs what made the show work in Seasons 1 through 4: real friendships, real betrayals, and real consequences.

The early signs are promising enough to keep watching. The first real conflict (involving two servers and a DM that should have stayed in drafts) felt organic. The group dynamics are starting to form natural alliances and rivalries.

## The Verdict So Far

It is too early to call it. The show needs at least half a season to establish its new identity. But the bones are there, Lisa is still Lisa, and SUR is still SUR. If the producers resist the urge to manufacture drama and let the cast find their own rhythm, Vanderpump Rules could have a genuine second act.

And in reality TV, a second act is the hardest thing to pull off.`,
    author: "carly",
    imageUrl: null,
    categories: ["analysis"],
    showTags: ["vanderpump-rules"],
    publishedAt: "2026-03-25T12:00:00Z",
    updatedAt: "2026-03-25T12:00:00Z",
    isFeatured: false,
    isExclusive: false,
  },
  {
    slug: "real-housewives-franchise-rankings-2026",
    title: "Every Real Housewives Franchise Ranked: The Definitive 2026 Tier List",
    subtitle: "From GOAT status to life support. We ranked all nine franchises and we are not sorry about it.",
    body: `Every year we do this, and every year somebody gets mad. That is how you know the rankings are working. Here is where every Real Housewives franchise stands heading into the second half of 2026.

## S Tier: The GOATs

**1. The Real Housewives of Salt Lake City (RHOSLC)**
Salt Lake has been on an absolute tear. The combination of cast chemistry, genuine conflict, and the ongoing legal dramatics make it appointment television. Every season delivers at least two jaw-dropping moments, and the confessionals are consistently the sharpest in the franchise. This is the gold standard right now.

**2. The Real Housewives of Potomac (RHOP)**
Potomac never misses. The cast has the rare ability to fight viciously one episode and laugh together the next, and it always feels authentic. The Grande Dame saga continues to evolve, and the newer additions have integrated seamlessly. Potomac is the franchise that consistently over-delivers relative to its profile.

## A Tier: Appointment Television

**3. The Real Housewives of Beverly Hills (RHOBH)**
The Last Supper season (Season 15) was a return to form. The Italy trip delivered genuinely shocking moments, and the cast dynamics feel more balanced than they have in years. Still docked a few points for relying too heavily on Erika Jayne talking head reactions, but overall a strong year.

**4. The Real Housewives of Dubai (RHODubai)**
The surprise riser. Dubai found its groove in Season 3 by leaning into the opulence and letting the cast's genuine cultural clashes drive the narrative. It went from "does anyone watch this?" to "did you see Dubai last night?" in one season.

## B Tier: Solid but Not Essential

**5. The Real Housewives of Atlanta (RHOA)**
Atlanta is in a rebuilding year. The franchise that once defined the genre is searching for its next era. There are bright spots (Kenya remains must-watch television), but the ensemble lacks the combustible chemistry of peak RHOA. Give it one more season before making any big judgments.

**6. The Real Housewives of Miami (RHOM)**
Miami is fun. It is not groundbreaking. Larsa delivers reliably chaotic energy, and the Peacock format gives it a looser, less produced feel. But it lacks the stakes that elevate a franchise from good to great.

## C Tier: On the Bubble

**7. The Real Housewives of New York (RHONY)**
The reboot cast is still finding its footing. There are individual standouts, but the group has not yet gelled into the kind of ensemble that makes RHONY special. The Brynn Whitfield show is entertaining, but one person cannot carry a franchise alone. Needs a stronger Season 3 to justify its legacy slot.

**8. The Real Housewives of Rhode Island**
Too new to rank definitively, but the early episodes show promise. The smaller, tighter cast is a smart choice, and the New England setting offers something visually distinct. Filing this under "cautiously optimistic."

## D Tier: Prayers Needed

**9. The Real Housewives of New Jersey (RHONJ)**
We hate to say it, but Jersey is in crisis. The Teresa vs. Melissa cold war has calcified into something that is no longer fun to watch. The cast is exhausted. The audience is exhausted. Something needs to change fundamentally, whether that is a full reboot, a cast shakeup, or a temporary hiatus. We love Jersey, and that is exactly why it hurts to put it here.

## The Bottom Line

The Housewives universe is healthier than it has been in years. The top tier is stacked, the middle is competitive, and even the struggling franchises have clear paths forward. If Bravo can manage its roster without over-saturating the schedule, 2026 could be a banner year.

We will update these rankings after fall premieres. Disagree with our list? Good. That is what the comments are for.`,
    author: "bb",
    imageUrl: null,
    categories: ["rankings"],
    showTags: [
      "real-housewives-salt-lake-city",
      "real-housewives-potomac",
      "real-housewives-beverly-hills",
      "real-housewives-dubai",
      "real-housewives-atlanta",
      "real-housewives-miami",
      "real-housewives-new-york",
      "real-housewives-new-jersey",
    ],
    publishedAt: "2026-03-27T09:00:00Z",
    updatedAt: "2026-03-27T09:00:00Z",
    isFeatured: true,
    isExclusive: true,
  },
  {
    slug: "below-deck-down-under-season-4-messiest-moments",
    title: "Below Deck Down Under Season 4: The Messiest Moments So Far",
    subtitle: "Fired crew, charter guest meltdowns, and a galley disaster for the ages. Season 4 is delivering.",
    body: `Below Deck Down Under has quietly become one of the most consistent shows in the Below Deck universe. While the flagship series coasts on Captain Lee nostalgia and Below Deck Med leans into the Sandy discourse, Down Under just keeps producing raw, unfiltered chaos on a boat.

Season 4 is no exception. Here are the messiest moments so far, ranked by the DramaRadar editorial team.

## 5. The Charter Guest Wine Incident (Episode 3)

A charter guest brought their own wine collection aboard and then berated the stew team for not storing it at the exact correct temperature. The scene where the guest demanded a thermometer and personally checked each bottle was simultaneously infuriating and riveting.

## 4. The Deck Crew Mutiny (Episode 5)

Two deckhands refused a direct order from the bosun over a tender run in rough conditions. The argument escalated to the bridge, where Captain Jason had to intervene. Both deckhands stayed on for the charter but the tension never resolved. One of them was gone by Episode 7.

## 3. The Galley Meltdown (Episode 6)

The chef attempted a twelve course tasting menu for eight guests, ran out of one key ingredient halfway through, and had to improvise courses 7 through 12 with whatever was left in the walk-in. The guests loved it. The chef did not speak to anyone for the rest of the night.

## 2. The Crew Night Out (Episode 8)

Every Below Deck season has one crew night out that goes off the rails. This season, it happened early, and it set the tone for everything that followed. Two crew members who had been flirting all season finally crossed a line, another crew member walked in on a situation, and the fallout dominated the next three episodes.

## 1. The Firing (Episode 4)

Captain Jason does not fire people often, which is what makes it devastating when he does. Without spoiling the specific details, this firing was earned, justified, and still somehow shocking. The crew member's reaction, the silence on the boat afterward, the way the remaining crew processed it. This is Below Deck at its best: real consequences for real behavior.

## Why Down Under Works

The secret to this franchise is Captain Jason. He leads with quiet authority, gives his crew genuine autonomy, and only steps in when something genuinely needs correcting. He is the anti-Sandy: no micromanaging, no camera-ready speeches, just competent leadership that makes the chaos around him feel more real by contrast.

Season 4 still has several episodes left, and based on the preview trailer, the back half is even messier than the front. We will be recapping every episode as it airs.`,
    author: "felicia",
    imageUrl: null,
    categories: ["recaps", "rankings"],
    showTags: ["below-deck"],
    publishedAt: "2026-03-24T18:00:00Z",
    updatedAt: "2026-03-24T18:00:00Z",
    isFeatured: false,
    isExclusive: false,
  },
  {
    slug: "real-housewives-rhode-island-what-we-know",
    title: "The Real Housewives of Rhode Island: Everything We Know About Bravo's Newest Franchise",
    subtitle: "Small state, big drama. Here is everything confirmed about RHORH so far.",
    body: `Bravo officially confirmed The Real Housewives of Rhode Island in early 2026, and the reality TV world immediately had questions. Rhode Island? Really? The smallest state in the union?

Yes, really. And it might be exactly what the franchise needs.

## What We Know

Filming began in January 2026 in Newport and Providence. The cast features six women (names still under NDA as of publication) from Rhode Island's old money social scene, yacht club circuit, and Newport's famously insular high society. Sources describe the cast as "surprisingly combustible" with "real history and real grudges."

Bravo reportedly chose Rhode Island for several reasons: the compact geography means the cast actually runs into each other organically, the Newport mansion aesthetic gives the show a visual identity distinct from any existing franchise, and the social scene is small enough that everyone knows everyone's business.

## Why It Could Work

Rhode Island has a few things going for it that other new franchises lacked.

First, authenticity. When you film in a place where the social circle is genuinely small, the connections between cast members are real. They are not six strangers thrown together at a dinner party. They are women who have been at the same charity galas, the same country clubs, and the same school pickup lines for years. That kind of history creates organic conflict that producers cannot manufacture.

Second, visual identity. Newport is gorgeous. The mansions, the harbor, the coastline. Every establishing shot is going to look expensive in a way that flatters the franchise format.

Third, the class dynamics. Rhode Island has a specific old money vs. new money tension that could fuel seasons worth of content. The Newport elite can be notoriously exclusionary, and putting those dynamics on camera is a recipe for compelling television.

## The Potential Risks

The biggest risk is audience fatigue. There are already nine Housewives franchises. Each new addition has to justify its existence not just by being good, but by being different enough to warrant a spot on an already crowded schedule.

Rhode Island also lacks the name recognition of cities like Beverly Hills or New York. Marketing a show set in a state most people associate with clam chowder and Family Guy is going to require strong trailers and a standout cast.

## When to Expect It

Sources indicate a late 2026 premiere, likely October or November. Bravo typically drops new franchises in the fall to build momentum heading into the holiday viewing season.

We will be covering every development, casting update, and trailer breakdown as they happen. Rhode Island might be small, but if the early buzz is accurate, the drama will be anything but.`,
    author: "the-drama-desk",
    imageUrl: null,
    categories: ["analysis", "exclusives"],
    showTags: [],
    publishedAt: "2026-03-15T11:00:00Z",
    updatedAt: "2026-03-15T11:00:00Z",
    isFeatured: false,
    isExclusive: true,
  },
  {
    slug: "rhobh-season-15-last-supper-finale",
    title: "RHOBH Season 15: The Last Supper Finale and What It Means for Next Season",
    subtitle: "The Italy trip delivered. The Last Supper lived up to its name. And at least one friendship is over.",
    body: `They called it The Last Supper, and for once, the dramatic episode title was underselling it.

The RHOBH Season 15 finale took the cast to Italy for what was billed as a celebratory trip. It was not. By the time the final dinner in a Tuscan villa was over, at least one major friendship had ended, two alliances had reshuffled, and Kyle Richards delivered a monologue at the table that will be replayed at reunions for years.

## What Happened at the Table

We will avoid full spoilers for anyone who has not watched yet, but the broad strokes: a secret that had been building all season finally came out at dinner. The revelation was not about finances or legal trouble (refreshing, honestly). It was personal, it was specific, and it clearly blindsided the person it was about.

The table split instantly. Chairs were pushed back. Someone left the terrace. The cameras kept rolling as producers clearly realized they had the biggest moment of the season.

## Who Won the Finale

**Kyle Richards.** After a few seasons of feeling like a supporting player on her own show, Kyle reclaimed the center of RHOBH in the finale. Her response to the table revelation was measured, direct, and devastating. She did not yell. She did not cry. She simply stated facts and let the silence do the work.

**Garcelle Beauvais.** Once again proving she is the moral compass of the show. Her reaction shots during the dinner were works of art. The woman communicates more with a single raised eyebrow than most people do with a full monologue.

## Who Lost

Without naming names, the person who dropped the secret at dinner may have won the battle but lost the war. The internet's reaction was overwhelmingly negative, and the "doing it at dinner in Italy for cameras" aspect did not go unnoticed.

## What This Means for Season 16

The finale set up at least three unresolved conflicts that will carry into next season. Bravo would be smart to bring back the full cast and let these dynamics play out. The worst thing they could do right now is a cast shakeup when the chemistry is finally clicking.

Filming for Season 16 is expected to begin in summer 2026. The reunion for Season 15 has not been announced yet, but based on the finale, it is going to be a marathon.`,
    author: "bb",
    imageUrl: null,
    categories: ["recaps", "analysis"],
    showTags: ["real-housewives-beverly-hills"],
    publishedAt: "2026-03-29T20:00:00Z",
    updatedAt: "2026-03-29T20:00:00Z",
    isFeatured: false,
    isExclusive: false,
  },
  {
    slug: "ladies-of-london-new-reign-sleeper-hit",
    title: "Ladies of London: The New Reign Is the Sleeper Hit of 2026",
    subtitle: "Nobody saw this one coming. The Ladies of London revival is quietly the best new reality show of the year.",
    body: `When Bravo announced a Ladies of London revival, the response was polite skepticism at best. The original series ran for three seasons between 2014 and 2017 and was generally considered a noble experiment that never quite found its audience. Bringing it back felt like a nostalgia play with limited upside.

Then the show actually premiered, and everyone had to admit they were wrong.

## What Changed

Everything. The new cast shares a title with the original but almost nothing else. Ladies of London: The New Reign follows a group of women navigating London's social scene in 2026, and the dynamics are genuinely fresh. British social hierarchies, international friendships, and the clash between old guard London and its increasingly global elite create a framework that feels distinct from anything else on Bravo.

The pacing is different too. Episodes move slower and let conversations breathe in a way American Housewives shows rarely do. Arguments simmer instead of exploding. Grudges are held with polite smiles and devastating understatement. It is a different flavor of drama, and it works.

## The Standout Cast Members

Two cast members in particular have emerged as breakout stars. One is a Nigerian-British art dealer whose confessionals are already being called the best in the Bravo universe this year. The other is a former fashion editor who delivers devastating one-liners with the calm of someone ordering tea.

The chemistry between the full cast is the show's greatest strength. They feel like people who actually know each other, because they do. These are not strangers assembled for television. They are women whose social circles overlapped for years before cameras arrived.

## Why You Should Be Watching

Ladies of London: The New Reign is currently Bravo's lowest-rated new show in terms of live viewership, but its streaming numbers are strong and growing. It has the same trajectory as Potomac in its early seasons: underestimated, underseen, and building a passionate fanbase that will eventually force the mainstream conversation to catch up.

If you are not watching yet, start now. By the time the reunion airs, you will want to have been there from the beginning.`,
    author: "betsy",
    imageUrl: null,
    categories: ["analysis"],
    showTags: [],
    publishedAt: "2026-03-26T15:00:00Z",
    updatedAt: "2026-03-26T15:00:00Z",
    isFeatured: false,
    isExclusive: false,
  },
  {
    slug: "reality-tv-glossary-50-terms",
    title: "Reality TV Glossary: 50 Terms Every Bravo Fan Needs to Know",
    subtitle: "From 'confessional' to 'producer-driven,' here is your complete guide to the language of reality television.",
    body: `Whether you are a lifelong Bravo viewer or just getting into reality TV, the community has developed its own vocabulary. Here are 50 terms you need to know to follow the conversation.

## Production Terms

**Confessional (n.):** The solo interview segments where cast members comment on events. Filmed separately, often weeks after the actual events. Also called "talking heads" or "ITMs" (In The Moment interviews).

**Fourth Wall Break (n.):** When a cast member acknowledges the cameras or production directly. Rare on Bravo, common on shows like The Real World.

**Frankenbite (n.):** An audio clip stitched together from different sentences to create a quote the person never actually said in that order. Controversial but common.

**Producer-Driven (adj.):** A scene or conflict that was clearly orchestrated by producers rather than happening organically. "That dinner was so producer-driven."

**B-Roll (n.):** Scenic footage of cities, houses, or locations used between scenes. Also called "establishing shots."

**Pick-Up (n.):** A scene re-filmed or filmed after the fact because the original footage was unusable or the moment was missed.

## Fan Community Terms

**Stan (v./n.):** To be an extremely devoted fan of a cast member, or the fan themselves. "I stan Garcelle."

**Ratio'd (adj.):** When a social media post receives more negative replies than likes. "Amanda's post got ratio'd."

**The Edit (n.):** How production portrays a cast member across a season. "She's getting the villain edit this year."

**Reunion Ready (adj.):** A moment so dramatic it will definitely come up at the reunion special. "That fight was reunion ready."

**Pillow Talk (n.):** Late-night conversations between cast members, usually in bedrooms, where real feelings come out.

**Messy (adj.):** The highest compliment in reality TV. A messy person creates drama, stirs the pot, and makes good television. "She is so messy and I love her."

## Housewives-Specific Terms

**Tagline (n.):** The one-liner each Housewife delivers during the opening credits. Tagline quality is a genuine metric of a good season.

**Glam (n.):** The hair and makeup process before filming events. "She showed up to the party in full glam."

**Table Flip (n.):** Any explosive moment at a group dinner. Named after Teresa Giudice's iconic table flip on RHONJ Season 1.

**Friend Of (n.):** A recurring cast member who appears regularly but is not a full-time Housewife. Often a stepping stone to a diamond/apple/peach.

**Peach/Diamond/Apple/Snowflake (n.):** The icon each franchise uses. Holding one in the opening credits means you are a full-time cast member. Losing it means demotion or firing.

## Social Media Terms

**Shade (n.):** A subtle insult or dig. "That comment was pure shade."

**Receipts (n.):** Screenshots, text messages, or evidence used to prove a point. "She came with receipts."

**Tea (n.):** Gossip or inside information. "Spill the tea."

**Clap Back (n.):** A sharp, effective response to criticism or an insult. "Her clapback was legendary."

**Unfollow Watch (n.):** When fans monitor cast members' social media follows and unfollows for clues about off-camera drama.

## Drama Classification

**Blindside (n.):** An ambush or revelation that catches someone completely off guard. Usually at a dinner or group event.

**Alliance (n.):** A group of cast members who have agreed to support each other. Alliances shift constantly.

**Takedown (n.):** A coordinated effort by multiple cast members to confront one person. Often backfires.

**Spiral (n.):** When a situation escalates rapidly out of control. "The party went into a full spiral."

**Hot Mic (n.):** When a cast member says something they think is off the record but the microphone catches it. Always good television.

This glossary is a living document. We will update it as new terms enter the reality TV lexicon. If we missed your favorite term, let us know at contact@dramaradar.com.`,
    author: "the-drama-desk",
    imageUrl: null,
    categories: ["guides"],
    showTags: [],
    publishedAt: "2026-03-17T08:00:00Z",
    updatedAt: "2026-03-17T08:00:00Z",
    isFeatured: false,
    isExclusive: false,
  },
  {
    slug: "the-valley-season-3-lala-kent-tom-schwartz",
    title: "The Valley Season 3: Lala Kent and Tom Schwartz Join and Everything Changes",
    subtitle: "Two VPR veterans are bringing their baggage to The Valley. The existing cast should be worried.",
    body: `When The Valley launched, it was positioned as a show about couples navigating life in the San Fernando Valley. Normal grown-up stuff: mortgages, marriages, parenthood. Jax Taylor and Brittany Cartwright's separation added dramatic fuel, and the show found a modest audience.

Then Bravo added Lala Kent and Tom Schwartz to the Season 3 cast, and the entire calculus changed.

## Why These Two Change Everything

Lala Kent does not do anything at half speed. Her tenure on Vanderpump Rules proved she is willing to say what everyone else is thinking, confront people directly, and create the kind of moments that drive social media engagement. She is also a single mother navigating co-parenting drama with Randall Emmett, which adds a layer of real life complexity that fits The Valley's premise.

Tom Schwartz is a different kind of addition. He is not a pot-stirrer. He is the guy who gets caught in the middle of everything because he is too agreeable to pick a side. In The Valley's existing dynamic, where strong personalities dominate, Schwartz will either find his voice or get steamrolled. Either outcome makes for good television.

## The Jax Factor

Adding VPR veterans to a show that already has Jax Taylor is a calculated risk. Jax's relationships with both Lala and Schwartz are complicated. He and Schwartz were close on VPR but drifted apart. He and Lala have always had a contentious dynamic.

The potential for old VPR grudges to resurface in the Valley context is enormous. These are people with years of shared history, unresolved conflicts, and very different versions of events they are both willing to share on camera.

## What the Existing Cast Thinks

Sources close to production say the existing Valley cast has mixed feelings about the additions. Some see it as a sign that Bravo does not think the current cast can carry the show alone. Others see it as an opportunity for increased visibility and higher ratings, which benefits everyone.

Kristen Doute, who has her own VPR history with both new cast members, is reportedly "cautiously optimistic." That is publicist speak for "complicated feelings she is not ready to discuss publicly."

## Season 3 Outlook

The Valley Season 3 has the potential to be the breakout season the show has been building toward. The VPR additions bring name recognition, social media followings, and built-in storylines. The existing cast brings the domestic grounding that differentiates The Valley from its parent show.

If the producers can balance the VPR nostalgia with the Valley's own identity, this could work. If it becomes VPR: Valley Edition, the show loses what made it interesting in the first place.

Filming is underway. Expect a late 2026 premiere.`,
    author: "felicia",
    imageUrl: null,
    categories: ["analysis"],
    showTags: ["the-valley", "vanderpump-rules"],
    publishedAt: "2026-03-28T13:00:00Z",
    updatedAt: "2026-03-28T13:00:00Z",
    isFeatured: false,
    isExclusive: false,
  },
  {
    slug: "summer-house-reunion-most-watched-bravo-history",
    title: "Why the Summer House Reunion Is Going to Be the Most Watched in Bravo History",
    subtitle: "The numbers, the drama, the social media firestorm. Everything points to a record-breaking reunion.",
    body: `Bold prediction: the Summer House Season 10 reunion is going to break Bravo viewership records. Not "do well for a Summer House reunion." Not "strong numbers for a non-Housewives show." Records, full stop.

Here is the case.

## The Social Media Numbers Are Unprecedented

Summer House Season 10 has generated more social media engagement than any non-Housewives Bravo show in history. The #TeamCiara hashtag alone has over 400 million impressions across platforms. Clips from the season have been viewed over 2 billion times on TikTok. Individual cast members have gained hundreds of thousands of followers in weeks.

For comparison, the Vanderpump Rules Scandoval reunion (previously the gold standard for Bravo engagement) generated roughly 1.5 billion TikTok views across its full cycle. Summer House is already past that with episodes still to air.

## Everyone Has an Opinion

The West and Amanda relationship has become a genuine cultural conversation. It is not just Bravo fans discussing it. Mainstream outlets, podcast hosts, comedians, and social media creators with no previous connection to reality TV have weighed in. That kind of crossover attention is what turns a reunion from a Bravo event into a cultural event.

The last time reality TV generated this level of mainstream discourse was Scandoval in 2023. Before that, you have to go back to the early seasons of Jersey Shore.

## The Cast Is Ready to Fight

Unlike some reunions where the cast has clearly negotiated truces before filming, the Summer House cast is going in hot. Social media activity from multiple cast members suggests unresolved conflicts, unaired footage they want addressed, and scores they intend to settle.

Andy Cohen has reportedly cleared an extended filming window, suggesting production expects this reunion to run long.

## The Stakes Are Real

This is not just about one season. The reunion will likely determine the future of Summer House as a franchise. Cast contracts are up. Spinoff discussions are active. At least two cast members have been approached about opportunities on other shows. The reunion is the last time this specific group will be in the same room, and everyone knows it.

When the stakes are personal and professional, reunions produce their best television.

## Our Prediction

We are calling it now: the Summer House Season 10 reunion will be the highest-rated non-Housewives reunion in Bravo history, and it will rank in the top three overall Bravo reunions of all time. The combination of social media momentum, mainstream attention, genuine conflict, and franchise-level stakes creates the perfect storm.

Set your DVR. Tell your friends. Clear your schedule.

This one is going to be talked about for years.`,
    author: "carly",
    imageUrl: null,
    categories: ["hot-takes", "analysis"],
    showTags: ["summer-house"],
    publishedAt: "2026-03-31T19:00:00Z",
    updatedAt: "2026-03-31T19:00:00Z",
    isFeatured: true,
    isExclusive: true,
  },
];

// ====================================================
// PREDICTIONS
// ====================================================

const predictions = [
  {
    id: "pred-seed-1",
    prediction: "Amanda and West will still be together by the reunion. They're going to walk in holding hands just to watch the world burn.",
    context: "They didn't put out that joint statement to back down now. These two are digging in. The matching sweatshirts were just the beginning.",
    authorKey: "bb",
    showTags: ["summer-house"],
    createdAt: "2026-03-28T14:00:00Z",
    status: "pending",
    resolvedAt: null,
  },
  {
    id: "pred-seed-2",
    prediction: "Ciara Miller is about to become the most followed Summer House cast member by the end of April.",
    context: "The internet has fully rallied behind her. Every sympathy follow, every supportive comment, it's all adding up. She's the main character now whether she wanted to be or not.",
    authorKey: "betsy",
    showTags: ["summer-house"],
    createdAt: "2026-03-29T10:30:00Z",
    status: "pending",
    resolvedAt: null,
  },
  {
    id: "pred-seed-3",
    prediction: "Bravo is going to announce a Summer House spinoff or reboot before Season 11. The current format can't survive this.",
    context: "When Deuxmoi reports the network is exploring contingency plans including cancellation, that's not gossip. That's a leak. They're testing public reaction before making a move.",
    authorKey: "carly",
    showTags: ["summer-house"],
    createdAt: "2026-03-30T16:00:00Z",
    status: "developing",
    resolvedAt: null,
  },
  {
    id: "pred-seed-4",
    prediction: "Kyle Cooke and Ciara Miller are going to become the unexpected alliance of the reunion. Revenge friendship era incoming.",
    context: "Kyle already posted that photo with Ciara tagged at the Psych Ward. They have a common enemy now. Bravo loves a good alliance arc.",
    authorKey: "bb",
    showTags: ["summer-house"],
    createdAt: "2026-03-31T09:00:00Z",
    status: "pending",
    resolvedAt: null,
  },
  {
    id: "pred-seed-5",
    prediction: "The RHOBH Season 15 finale dinner in Italy is going to end at least one major friendship permanently.",
    context: "They're calling it The Last Supper for a reason. That title isn't accidental. Someone is getting cut from the inner circle and it's not going to be pretty.",
    authorKey: "bbs-assistant",
    showTags: ["real-housewives-beverly-hills"],
    createdAt: "2026-04-01T08:00:00Z",
    status: "pending",
    resolvedAt: null,
  },
];

// ====================================================
// Generate bulk KV JSON files
// ====================================================

const articleBulk = articles.map((a) => ({
  key: `article:${a.slug}`,
  value: JSON.stringify(a),
}));
articleBulk.push({
  key: "articles:index",
  value: JSON.stringify(articles.map((a) => a.slug)),
});

const predictionBulk = predictions.map((p) => ({
  key: `prediction:${p.id}`,
  value: JSON.stringify(p),
}));
predictionBulk.push({
  key: "predictions:index",
  value: JSON.stringify(predictions.map((p) => p.id)),
});

fs.writeFileSync(
  "scripts/articles-bulk.json",
  JSON.stringify(articleBulk, null, 2)
);
fs.writeFileSync(
  "scripts/predictions-bulk.json",
  JSON.stringify(predictionBulk, null, 2)
);

console.log(`Generated ${articles.length} articles and ${predictions.length} predictions`);
console.log("Run:");
console.log("  npx wrangler kv:bulk put --namespace-id=446b2734022b4cb8bfe094b4fc462128 scripts/articles-bulk.json");
console.log("  npx wrangler kv:bulk put --namespace-id=446b2734022b4cb8bfe094b4fc462128 scripts/predictions-bulk.json");
