import type { Metadata } from "next";
import Link from "next/link";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "About DramaRadar",
  description:
    "Learn about DramaRadar, the reality TV gossip aggregator built by superfans. Our mission, our team, and how we keep you up to date on every twist and feud.",
  canonicalUrl: "https://dramaradar.com/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="mb-3 text-3xl font-extrabold text-[#F5F5F5]">
          About DramaRadar
        </h1>
        <div
          className="h-1 w-24 rounded-full bg-gradient-to-r from-[#E84393] to-[#A855F7]"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-10">
        {/* Intro */}
        <section>
          <p className="mb-4 text-sm leading-relaxed text-[#A0A0B0]">
            DramaRadar was founded by a group of reality TV obsessives who got
            tired of refreshing five different apps to keep up with the latest
            Bravo drama. We built the gossip dashboard we always wanted: one
            place where every tea spill, every blindside, every &ldquo;I
            don&apos;t remember it that way&rdquo; moment lands the second it
            breaks.
          </p>
          <p className="text-sm leading-relaxed text-[#A0A0B0]">
            Whether you live for reunion chaos, get invested in cast feuds
            before the season even premieres, or simply want a single feed
            that catches every bombshell across every franchise, DramaRadar
            was made for you. We are fans first, and everything we build
            starts from that obsession.
          </p>
        </section>

        {/* Our Mission */}
        <section>
          <h2 className="mb-3 text-xl font-bold text-[#F5F5F5]">
            Our Mission
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-[#A0A0B0]">
            Our motto is simple: <span className="font-semibold text-[#E84393]">Always Scanning</span>.
            The DramaRadar never sleeps. Day and night, our system monitors
            dozens of entertainment news outlets, gossip blogs, social media
            accounts, and fan communities so you never miss a beat. Stories are
            prioritized by recency and relevance, which means the most
            important drama always rises to the top of your feed.
          </p>
          <p className="text-sm leading-relaxed text-[#A0A0B0]">
            We believe reality TV fans deserve a dedicated news experience,
            not a sidebar buried under celebrity fashion roundups or movie
            trailers. DramaRadar exists to treat reality television as what
            it truly is: appointment viewing, cultural conversation, and
            (let&apos;s be honest) the best form of entertainment on the
            planet. Every franchise, every network, every platform. If there
            is drama, we are tracking it.
          </p>
        </section>

        {/* Our Team */}
        <section>
          <h2 className="mb-3 text-xl font-bold text-[#F5F5F5]">
            Our Team
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-[#A0A0B0]">
            DramaRadar is led by <span className="font-semibold text-[#F5F5F5]">Carly</span>,
            our Editor-in-Chief, alongside a team of writers, analysts, and
            self-proclaimed chaos agents. You will see bylines from voices like
            BB, BB&apos;s Assistant, Carly&apos;s Intern, and The Drama Desk
            collective, each bringing a unique perspective to the reality TV
            universe. Some of us are here for the strategy. Some of us are here
            for the mess. All of us are here for the drama.
          </p>
          <p className="text-sm leading-relaxed text-[#A0A0B0]">
            Want to know who is behind the takes?{" "}
            <Link
              href="/team"
              className="text-[#E84393] underline underline-offset-2 transition-opacity hover:opacity-80"
            >
              Meet the full team here
            </Link>
            .
          </p>
        </section>

        {/* What We Cover */}
        <section>
          <h2 className="mb-3 text-xl font-bold text-[#F5F5F5]">
            What We Cover
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-[#A0A0B0]">
            DramaRadar covers the full spectrum of reality television and
            adjacent celebrity gossip. Our show hubs span every major
            franchise, including (but definitely not limited to):
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[
              "Real Housewives",
              "Below Deck",
              "Vanderpump Rules",
              "Summer House",
              "The Bachelor",
              "Love Island",
              "90 Day Fiance",
              "Selling Sunset",
              "Southern Charm",
              "The Traitors",
              "Married at First Sight",
              "The Valley",
            ].map((show) => (
              <div
                key={show}
                className="rounded-lg border border-[#1A1A2E] bg-[#1A1A2E]/40 px-3 py-2 text-center text-xs font-medium text-[#A0A0B0]"
              >
                {show}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[#A0A0B0]">
            We are constantly expanding our coverage. If your favorite show
            is not listed yet, chances are we are already working on it.
            Visit our{" "}
            <Link
              href="/shows"
              className="text-[#E84393] underline underline-offset-2 transition-opacity hover:opacity-80"
            >
              Shows
            </Link>{" "}
            page to browse every hub we track.
          </p>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="mb-3 text-xl font-bold text-[#F5F5F5]">
            How It Works
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-[#A0A0B0]">
            DramaRadar aggregates headlines, thumbnails, and short
            descriptions from trusted entertainment news sources across the
            web. Every story in our feed links directly to the original
            article on the publisher&apos;s site. We display the source name,
            publication date, and a brief summary so you can decide what to
            read, then we send you straight to the source.
          </p>
          <p className="text-sm leading-relaxed text-[#A0A0B0]">
            We never reproduce full articles. Our goal is discovery and
            convenience: help fans find the stories that matter, give proper
            attribution to the outlets that break them, and keep everything
            organized by show, topic, and recency. Think of DramaRadar as
            your personal gossip concierge.
          </p>
        </section>

        {/* Original Content */}
        <section>
          <h2 className="mb-3 text-xl font-bold text-[#F5F5F5]">
            Original Content
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-[#A0A0B0]">
            Aggregation is only half the story. The Drama Desk editorial team
            publishes original articles, deep dives, hot takes, power
            rankings, and exclusive analysis pieces you will not find anywhere
            else. Look for the &ldquo;Exclusive&rdquo; and
            &ldquo;Featured&rdquo; badges throughout the site to discover our
            original work.
          </p>
          <p className="text-sm leading-relaxed text-[#A0A0B0]">
            From preseason predictions to post-reunion breakdowns, our writers
            bring the perspective that only true superfans can offer. We take
            reality TV seriously (while never taking ourselves too seriously).
          </p>
        </section>

        {/* Contact section */}
        <section className="rounded-xl border border-[#1A1A2E] bg-[#1A1A2E]/60 p-6">
          <h2 className="mb-3 text-xl font-bold text-[#F5F5F5]">
            Get in Touch
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-[#A0A0B0]">
            Have a tip, a question, or feedback? We would love to hear from
            you. Reach us directly at{" "}
            <a
              href="mailto:hello@dramaradar.com"
              className="text-[#E84393] underline underline-offset-2 transition-opacity hover:opacity-80"
            >
              hello@dramaradar.com
            </a>{" "}
            or visit our{" "}
            <Link
              href="/contact"
              className="text-[#E84393] underline underline-offset-2 transition-opacity hover:opacity-80"
            >
              Contact page
            </Link>{" "}
            to send us a message.
          </p>
        </section>
      </div>
    </div>
  );
}
