"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/shows", label: "Shows" },
  { href: "/articles", label: "Originals" },
  { href: "/predictions", label: "Predictions" },
  { href: "/team", label: "Team" },
  { href: "/horoscope", label: "Horoscope" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-dr-bg/95 backdrop-blur-md border-b border-dr-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo with radar animation */}
        <Link href="/" className="flex items-center gap-3" aria-label="DramaRadar home">
          {/* Animated radar */}
          <div className="relative h-10 w-10 shrink-0 sm:h-12 sm:w-12" aria-hidden="true">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dr-pink/40" />
            {/* Middle ring */}
            <div className="absolute inset-[6px] rounded-full border border-dr-pink/25 sm:inset-2" />
            {/* Inner ring */}
            <div className="absolute inset-[12px] rounded-full border border-dr-pink/15 sm:inset-[10px]" />
            {/* Center dot */}
            <div className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-dr-pink shadow-[0_0_6px_rgb(var(--dr-pink))]" />
            {/* Sweep beam */}
            <div className="absolute inset-0 animate-[radar-sweep_3.5s_linear_infinite]">
              <div
                className="absolute left-1/2 top-0 h-1/2 w-[2px] -translate-x-1/2 origin-bottom"
                style={{
                  background: "linear-gradient(to top, rgb(var(--dr-pink)), transparent)",
                }}
              />
              {/* Fade trail */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0deg, rgb(var(--dr-pink) / 0.12) 0deg, transparent 90deg)",
                }}
              />
            </div>
            {/* Blip dots */}
            <div className="absolute left-[70%] top-[22%] h-1 w-1 animate-[radar-blip_3.5s_ease-in-out_infinite_0.3s] rounded-full bg-dr-pink" />
            <div className="absolute left-[25%] top-[65%] h-1 w-1 animate-[radar-blip_3.5s_ease-in-out_infinite_1.8s] rounded-full bg-dr-purple" />
          </div>

          <div className="flex flex-col gap-0">
            <span className="text-2xl font-extrabold leading-tight bg-gradient-to-r from-dr-pink to-dr-purple bg-clip-text text-transparent">
              DramaRadar
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-dr-text-muted">
              Always Scanning
            </span>
          </div>
        </Link>

        {/* Desktop nav + theme toggle */}
        <div className="hidden items-center gap-4 md:flex">
          <nav className="flex items-center gap-6" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-dr-text-muted transition-colors duration-200 hover:text-dr-pink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-dr-text-muted transition-colors hover:text-dr-pink"
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
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          className="border-t border-dr-border bg-dr-bg px-4 pb-4 pt-2 md:hidden"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-medium text-dr-text-muted transition-colors hover:text-dr-pink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
