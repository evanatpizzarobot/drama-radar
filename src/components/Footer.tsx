import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
  { href: "/shows", label: "Shows" },
  { href: "/articles", label: "Articles" },
  { href: "/predictions", label: "Predictions" },
  { href: "/horoscope", label: "Horoscope" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-dr-border bg-dr-bg">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Footer navigation">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-dr-text-muted transition-colors duration-200 hover:text-dr-pink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-center">
          {[
            { label: "Support", email: "support@dramaradar.com" },
            { label: "Advertising", email: "advertise@dramaradar.com" },
            { label: "Legal", email: "legal@dramaradar.com" },
            { label: "Tips", email: "tips@dramaradar.com" },
          ].map((item, i, arr) => (
            <span key={item.email} className="whitespace-nowrap">
              <span className="text-xs text-dr-text-dim">{item.label}: </span>
              <a
                href={`mailto:${item.email}`}
                className="text-xs text-dr-text-muted transition-colors duration-200 hover:text-dr-pink"
              >
                {item.email}
              </a>
              {i < arr.length - 1 && (
                <span className="mx-1.5 text-xs text-dr-text-dim/50">|</span>
              )}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <a
            href="https://x.com/DramaRadarHQ"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-dr-text-muted transition-colors duration-200 hover:text-dr-pink"
            aria-label="Follow DramaRadar on X"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @DramaRadarHQ
          </a>
        </div>

        <div className="mt-3 flex flex-col items-center gap-2 text-center">
          <p className="text-xs text-dr-text-dim">
            &copy; {new Date().getFullYear()} DramaRadar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
