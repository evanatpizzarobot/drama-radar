import type { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact Us",
  description:
    "Get in touch with the DramaRadar team. Submit tips, press inquiries, feedback, or general questions about DramaRadar.",
  canonicalUrl: "https://dramaradar.com/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="mb-3 text-3xl font-extrabold text-[#F5F5F5]">
          Contact Us
        </h1>
        <div
          className="mb-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#E84393] to-[#A855F7]"
          aria-hidden="true"
        />
        <p className="text-sm leading-relaxed text-[#A0A0B0]">
          Got a tip? Want to submit feedback? Have a question about a story?
          We are always happy to hear from fellow reality TV fans.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {/* Email contact */}
        <section>
          <h2 className="mb-3 text-xl font-bold text-[#F5F5F5]">
            Email Us Directly
          </h2>
          <p className="mb-2 text-sm leading-relaxed text-[#A0A0B0]">
            The fastest way to reach our team is by email. Whether you have a
            scoop, a correction, or just want to say hi, send us a message at:
          </p>
          <a
            href="mailto:hello@dramaradar.com"
            className="inline-block text-lg font-bold text-[#E84393] underline underline-offset-4 transition-opacity hover:opacity-80"
          >
            hello@dramaradar.com
          </a>
        </section>

        {/* Contact form */}
        <section>
          <h2 className="mb-3 text-xl font-bold text-[#F5F5F5]">
            Send a Message
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-[#A0A0B0]">
            Use the form below to reach us. Select a subject that best fits
            your message and we will get back to you as soon as we can.
          </p>
          <ContactForm />
        </section>

        {/* Department emails */}
        <section>
          <h2 className="mb-6 text-xl font-bold text-[#F5F5F5]">
            Department Contacts
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                label: "General Inquiries",
                email: "contact@dramaradar.com",
                description: null,
              },
              {
                label: "Advertising & Sponsorships",
                email: "advertise@dramaradar.com",
                description:
                  "Interested in reaching our audience? We'd love to hear from you.",
              },
              {
                label: "Tips & Story Leads",
                email: "tips@dramaradar.com",
                description:
                  "Got tea? Send it our way. We protect our sources.",
              },
              {
                label: "Editorial",
                email: "editorial@dramaradar.com",
                description:
                  "Pitches, collaborations, and guest contributions.",
              },
              {
                label: "Legal",
                email: "legal@dramaradar.com",
                description: "All legal inquiries and DMCA requests.",
              },
            ].map((dept) => (
              <div
                key={dept.email}
                className="rounded-xl border border-[#1A1A2E] bg-[#1A1A2E]/60 p-5"
              >
                <h3 className="mb-1 text-sm font-semibold text-[#F5F5F5]">
                  {dept.label}
                </h3>
                <a
                  href={`mailto:${dept.email}`}
                  className="text-sm font-bold text-[#E84393] underline underline-offset-2 transition-opacity hover:opacity-80"
                >
                  {dept.email}
                </a>
                {dept.description && (
                  <p className="mt-2 text-xs leading-relaxed text-[#A0A0B0]">
                    {dept.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Press inquiries */}
        <section className="rounded-xl border border-[#1A1A2E] bg-[#1A1A2E]/60 p-6">
          <h2 className="mb-3 text-xl font-bold text-[#F5F5F5]">
            Press &amp; Media Inquiries
          </h2>
          <p className="text-sm leading-relaxed text-[#A0A0B0]">
            Members of the press or media outlets looking to feature, quote, or
            partner with DramaRadar can reach us at{" "}
            <a
              href="mailto:contact@dramaradar.com"
              className="text-[#E84393] underline underline-offset-2 transition-opacity hover:opacity-80"
            >
              contact@dramaradar.com
            </a>{" "}
            with the subject line &ldquo;Press Inquiry.&rdquo; We will do our
            best to respond within 48 hours.
          </p>
        </section>

        {/* Social */}
        <section>
          <h2 className="mb-3 text-xl font-bold text-[#F5F5F5]">
            Follow Us
          </h2>
          <p className="text-sm leading-relaxed text-[#A0A0B0]">
            Official DramaRadar social media accounts are coming soon. Stay
            tuned for updates on where you can follow us for breaking drama,
            memes, and live reactions.
          </p>
        </section>
      </div>
    </div>
  );
}
