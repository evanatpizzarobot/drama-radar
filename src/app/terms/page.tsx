import type { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Terms of Service",
  description:
    "DramaRadar terms of service. Read our terms governing the use of dramaradar.com.",
  canonicalUrl: "https://dramaradar.com/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="mb-3 text-3xl font-extrabold text-dr-text">
          Terms of Service
        </h1>
        <p className="text-sm text-dr-text-dim">
          Last updated: March 31, 2026
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8 text-sm leading-relaxed text-dr-text-muted">
        <section>
          <h2 className="mb-3 text-xl font-bold text-dr-text">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using DramaRadar (dramaradar.com), you agree to be bound by these
            Terms of Service. If you do not agree with any part of these terms, you should not
            use the website. We reserve the right to update or modify these terms at any time
            without prior notice. Your continued use of DramaRadar after any changes constitutes
            acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-dr-text">
            2. Description of Service
          </h2>
          <p>
            DramaRadar is a news aggregation and editorial content website focused on reality
            television and celebrity gossip. We aggregate headlines, summaries, and links from
            third-party entertainment news sources, and we also publish original editorial content
            written by our team.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-dr-text">
            3. Content Aggregation Disclaimer
          </h2>
          <p className="mb-3">
            DramaRadar aggregates and links to content published by third-party websites. We
            display headlines and brief summaries to help users discover stories, then link
            directly to the original article on the publisher&apos;s website. We do not reproduce
            full articles from other sources.
          </p>
          <p className="mb-3">
            All aggregated content remains the intellectual property of its respective owners
            and publishers. DramaRadar does not claim ownership of any third-party content
            displayed on our platform.
          </p>
          <p>
            If you are a content owner and believe that your content is being used on DramaRadar
            in a way that infringes your rights, please contact us at{" "}
            <a
              href="mailto:hello@dramaradar.com"
              className="text-dr-pink underline underline-offset-2 transition-opacity hover:opacity-80"
            >
              hello@dramaradar.com
            </a>{" "}
            and we will address your concern promptly.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-dr-text">
            4. Intellectual Property
          </h2>
          <p className="mb-3">
            The DramaRadar name, logo, website design, original editorial content, and all other
            materials created by DramaRadar are the intellectual property of DramaRadar and its
            operators. You may not copy, reproduce, distribute, or create derivative works from our
            original content without prior written permission.
          </p>
          <p>
            Third-party trademarks, show names, and celebrity names referenced on DramaRadar
            belong to their respective owners. Their use on our site is for informational and
            editorial commentary purposes only.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-dr-text">
            5. Use of Service
          </h2>
          <p className="mb-3">
            You agree to use DramaRadar only for lawful purposes and in accordance with these
            terms. You agree not to:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Use the website in any way that violates applicable local, state, national, or
              international law
            </li>
            <li>
              Attempt to gain unauthorized access to any part of the website, its servers, or
              any connected databases
            </li>
            <li>
              Use automated tools, bots, or scrapers to extract content from the website without
              written permission
            </li>
            <li>
              Interfere with or disrupt the website&apos;s infrastructure or other users&apos;
              experience
            </li>
            <li>
              Reproduce, mirror, or redistribute the website&apos;s content or design without
              authorization
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-dr-text">
            6. Advertisements
          </h2>
          <p>
            DramaRadar displays advertisements through third-party advertising networks,
            including Google AdSense. We are not responsible for the content, accuracy, or
            practices of any advertisements or the products and services they promote. Your
            interactions with advertisers are solely between you and the advertiser.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-dr-text">
            7. External Links
          </h2>
          <p>
            DramaRadar contains links to third-party websites. These links are provided for
            your convenience and informational purposes. We do not endorse, control, or assume
            responsibility for the content or practices of any linked websites. Visiting external
            links is at your own risk, and you should review the terms and privacy policies of
            those websites.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-dr-text">
            8. Disclaimers
          </h2>
          <p className="mb-3">
            DramaRadar is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
            basis. We make no warranties or representations, express or implied, regarding
            the accuracy, completeness, reliability, or availability of the website or its
            content.
          </p>
          <p>
            Entertainment news and gossip content is inherently speculative and may contain
            rumors, unverified claims, or opinions. DramaRadar does not guarantee the accuracy
            of any third-party content we aggregate. We encourage users to verify information
            through multiple sources.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-dr-text">
            9. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, DramaRadar and its operators,
            officers, directors, employees, and agents shall not be
            liable for any indirect, incidental, special, consequential, or punitive damages
            arising from or related to your use of the website. This includes, but is not
            limited to, damages for loss of profits, data, goodwill, or other intangible losses,
            regardless of whether we have been advised of the possibility of such damages.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-dr-text">
            10. Governing Law
          </h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the
            laws of the State of California, without regard to its conflict of law provisions.
            Any disputes arising from these terms or your use of DramaRadar shall be subject
            to the exclusive jurisdiction of the courts located in Los Angeles County, California.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-dr-text">
            11. Severability
          </h2>
          <p>
            If any provision of these Terms of Service is found to be invalid, illegal, or
            unenforceable, the remaining provisions shall continue in full force and effect.
          </p>
        </section>

        <section className="rounded-xl border border-dr-border bg-dr-surface/60 p-6">
          <h2 className="mb-3 text-xl font-bold text-dr-text">
            Contact Us
          </h2>
          <p>
            If you have questions about these Terms of Service, please contact us at{" "}
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
