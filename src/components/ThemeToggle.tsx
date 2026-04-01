"use client";

import { useState, useEffect } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const current = document.documentElement.getAttribute("data-theme") as
      | "dark"
      | "light"
      | null;
    setTheme(current || "dark");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("dramaradar-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  // Render placeholder before mount to avoid layout shift
  if (!mounted) {
    return <div className="h-9 w-9 shrink-0" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-dr-border-hover transition-all duration-200 hover:scale-105 hover:border-dr-pink"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <svg
          className="h-5 w-5 text-dr-text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="5" />
          <path
            strokeLinecap="round"
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          />
        </svg>
      ) : (
        <svg
          className="h-5 w-5 text-dr-pink"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        </svg>
      )}
    </button>
  );
}
