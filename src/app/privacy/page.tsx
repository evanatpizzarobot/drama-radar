import type { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Privacy Policy",
  description:
    "DramaRadar privacy policy. Learn how we handle your data, our use of analytics, and your rights.",
  canonicalUrl: "https://dramaradar.com/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="mb-3 text-3xl font-extrabold text-[#F5F5F5]">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#555568]">
          Last updated: March 31, 2026
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8 text-sm leading-relaxed text-[#A0A0B0]">
        <section>
          <h2 className="mb-3 text-xl font-bold text-[#F5F5F5]">
            Introduction
          </h2>
          <p>
            DramaRadar (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the
            website dramaradar.com. This Privacy Policy explains how we collect, use, and protect
            your information when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-[#F5F5F5]">
            Information We Collect
          </h2>
          <p className="mb-3">
            DramaRadar is designed with privacy in mind. We collect minimal data:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="font-semibold text-[#F5F5F5]">Analytics data:</span>{" "}
              We use Cloudflare Web Analytics, a privacy-friendly, cookieless analytics service.
              Cloudflare Analytics does not use cookies, does not track individual users across
              sites, and does not collect personal information. It provides aggregate metrics such
              as page views, referrers, and browser information.
            </li>
            <li>
              <span className="font-semibold text-[#F5F5F5]">Server logs:</span>{" "}
              Our hosting provider (Cloudflare) may collect standard server logs, including IP
              addresses, browser type, and pages visited. These logs are used for security and
              performance purposes and are retained according to Cloudflare&apos;s data policies.
            </li>
            <li>
              <span className="font-semibold text-[#F5F5F5]">Contact information:</span>{" "}
              If you contact us via email, we will receive and store your email address and
              message content for the purpose of responding to your inquiry.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-[#F5F5F5]">
            Cookies
          </h2>
          <p className="mb-3">
            DramaRadar itself does not set any first-party cookies. However, third-party services
            embedded on our site may set cookies:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="font-semibold text-[#F5F5F5]">Google AdSense:</span>{" "}
              We display advertisements through Google AdSense, which may use cookies and similar
              technologies to serve personalized or contextual ads. Google&apos;s use of advertising
              cookies is governed by their own privacy policy. You can opt out of personalized
              advertising by visiting{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E84393] underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                Google Ads Settings
              </a>
              .
            </li>
            <li>
              <span className="font-semibold text-[#F5F5F5]">Cloudflare:</span>{" "}
              Cloudflare may set security-related cookies (such as the __cf_bm cookie) to
              distinguish between humans and bots. These are strictly necessary cookies and do
              not track personal information.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-[#F5F5F5]">
            Third-Party Services
          </h2>
          <p className="mb-3">
            We use the following third-party services:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="font-semibold text-[#F5F5F5]">Cloudflare:</span>{" "}
              Website hosting, CDN, DNS, and cookieless analytics.
            </li>
            <li>
              <span className="font-semibold text-[#F5F5F5]">Google AdSense:</span>{" "}
              Advertising display network.
            </li>
          </ul>
          <p className="mt-3">
            Each of these services has its own privacy policy governing data collection. We
            encourage you to review their policies for more information.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-[#F5F5F5]">
            How We Use Your Information
          </h2>
          <p className="mb-3">
            The limited information we collect is used for the following purposes:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>To understand aggregate website traffic and usage patterns</li>
            <li>To maintain the security and performance of our website</li>
            <li>To respond to your inquiries when you contact us</li>
            <li>To display relevant advertisements through Google AdSense</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-[#F5F5F5]">
            Data Sharing
          </h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to outside
            parties. The only exceptions are the third-party service providers listed above, which
            process data as necessary to provide their services.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-[#F5F5F5]">
            Children&apos;s Privacy
          </h2>
          <p>
            DramaRadar is not directed at children under the age of 13. We do not knowingly
            collect personal information from children. If you believe a child has provided us
            with personal information, please contact us so we can remove it.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-[#F5F5F5]">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on
            this page with an updated revision date. Your continued use of DramaRadar after
            changes are posted constitutes your acceptance of the revised policy.
          </p>
        </section>

        <section className="rounded-xl border border-[#1A1A2E] bg-[#1A1A2E]/60 p-6">
          <h2 className="mb-3 text-xl font-bold text-[#F5F5F5]">
            Contact Us
          </h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
            <a
              href="mailto:hello@dramaradar.com"
              className="text-[#E84393] underline underline-offset-2 transition-opacity hover:opacity-80"
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
