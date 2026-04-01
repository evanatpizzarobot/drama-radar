"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/shows", label: "Shows" },
  { href: "/articles", label: "Articles" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0D0D0F]/95 backdrop-blur-md border-b border-[#1A1A2E]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex flex-col gap-0" aria-label="DramaRadar home">
          <span className="text-2xl font-extrabold leading-tight bg-gradient-to-r from-[#E84393] to-[#A855F7] bg-clip-text text-transparent">
            DramaRadar
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#A0A0B0]">
            Always Scanning
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#A0A0B0] transition-colors duration-200 hover:text-[#E84393]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-[#A0A0B0] transition-colors hover:text-[#E84393] md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          className="border-t border-[#1A1A2E] bg-[#0D0D0F] px-4 pb-4 pt-2 md:hidden"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-medium text-[#A0A0B0] transition-colors hover:text-[#E84393]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
