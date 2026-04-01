import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
  { href: "/shows", label: "Shows" },
  { href: "/articles", label: "Articles" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#1A1A2E] bg-[#0D0D0F]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Footer navigation">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#A0A0B0] transition-colors duration-200 hover:text-[#E84393]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 flex flex-col items-center gap-2 text-center">
          <p className="text-xs text-[#555568]">
            &copy; {new Date().getFullYear()} DramaRadar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
