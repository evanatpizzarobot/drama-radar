import type { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Affiliate Disclosure",
  description:
    "DramaRadar affiliate disclosure. Learn about our affiliate relationships and how they support our editorial content.",
  canonicalUrl: "https://dramaradar.com/disclosure",
});

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="mb-3 text-3xl font-extrabold text-dr-text">
          Affiliate Disclosure
        </h1>
        <p className="text-sm text-dr-text-dim">
          Last updated: April 1, 2026
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8 text-sm leading-relaxed text-dr-text-muted">
        <section>
          <h2 className="mb-3 text-xl font-bold text-dr-text">
            What Are Affiliate Links?
          </h2>
          <p className="mb-3">
            Some of the links on DramaRadar are affiliate links. This means that if you click on
            one of these links and make a purchase, we may receive a small commission from the
            retailer at no additional cost to you.
          </p>
          <p>
            Affiliate links help us keep DramaRadar running and allow us to continue providing
            free entertainment news and editorial content. We appreciate your support when you
            choose to shop through our links.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-dr-text">
            How We Use Them
          </h2>
          <p className="mb-3">
            You may find affiliate links in our editorial articles, product recommendations,
            and roundup posts. Whenever possible, we clearly identify affiliate links so you
            know when a link may generate a commission for us.
          </p>
          <p>
            Affiliate links are marked with a small shopping bag icon next to the linked text.
            We only include affiliate links to products and services that are relevant to the
            content of the article.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-dr-text">
            Our Editorial Independence
          </h2>
          <p className="mb-3">
            Our editorial content is not influenced by affiliate relationships. The products,
            services, and brands we mention are selected by our editorial team based on
            relevance, quality, and interest to our readers.
          </p>
          <p className="mb-3">
            We do not accept payment in exchange for positive coverage. If a product or brand
            is mentioned in an article, it is because our team genuinely believes it is
            relevant to the topic at hand.
          </p>
          <p>
            Affiliate commissions do not affect our ratings, rankings, or recommendations.
            Our opinions are our own, and we are committed to providing honest, unbiased
            content to our readers.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-dr-text">
            Amazon Associates
          </h2>
          <p>
            DramaRadar is a participant in the Amazon Services LLC Associates Program, an
            affiliate advertising program designed to provide a means for sites to earn
            advertising fees by advertising and linking to Amazon.com. As an Amazon Associate,
            we earn from qualifying purchases. Amazon and the Amazon logo are trademarks of
            Amazon.com, Inc. or its affiliates.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-dr-text">
            FTC Compliance
          </h2>
          <p>
            In accordance with the Federal Trade Commission&apos;s guidelines on endorsements
            and testimonials (16 CFR Part 255), we disclose our affiliate relationships so
            you can make informed decisions. This disclosure applies to all affiliate links
            found on dramaradar.com.
          </p>
        </section>

        <section className="rounded-xl border border-dr-border bg-dr-surface/60 p-6">
          <h2 className="mb-3 text-xl font-bold text-dr-text">
            Questions
          </h2>
          <p>
            If you have any questions about our affiliate relationships or this disclosure,
            please contact us at{" "}
            <a
              href="mailto:hello@dramaradar.com"
              className="text-dr-pink underline underline-offset-2 transition-opacity hover:opacity-80"
            >
              hello@dramaradar.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
