"use client";

import { useState } from "react";
import type { Author } from "@/lib/authors";

interface AuthorAvatarProps {
  author: Author;
  size?: "sm" | "md" | "lg";
}

const SIZE_CONFIG = {
  sm: { container: "h-8 w-8", text: "text-xs", border: "border-2" },
  md: { container: "h-16 w-16", text: "text-xl", border: "border-2" },
  lg: { container: "h-28 w-28 sm:h-36 sm:w-36", text: "text-4xl", border: "border-[3px]" },
};

export function AuthorAvatar({ author, size = "md" }: AuthorAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const initial = author.displayName.charAt(0).toUpperCase();
  const config = SIZE_CONFIG[size];

  if (imgError || !author.avatar) {
    return (
      <div
        className={`${config.container} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-dr-pink to-dr-purple ${config.text} font-bold text-white`}
        aria-hidden="true"
      >
        {initial}
      </div>
    );
  }

  return (
    <div
      className={`${config.container} shrink-0 overflow-hidden rounded-full ${config.border} border-dr-pink/40`}
      aria-hidden="true"
    >
      <img
        src={author.avatar}
        alt={author.displayName}
        className="h-full w-full object-cover"
        onError={() => setImgError(true)}
      />
    </div>
  );
}
