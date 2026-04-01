"use client";

import { useState } from "react";
import { API_BASE_URL } from "@/lib/constants";

interface SubscribeAlertProps {
  compact?: boolean;
}

export function SubscribeAlert({ compact = false }: SubscribeAlertProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the list. The radar will find you.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Connection failed. Check your internet and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className={`rounded-xl border border-dr-pink/30 bg-dr-surface p-4 ${compact ? "" : "p-5"}`}>
        <div className="flex items-center gap-2 text-sm font-semibold text-dr-pink">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          You're on the list.
        </div>
        <p className="mt-1 text-xs text-dr-text-muted">
          The radar will find you when drama breaks.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-dr-border bg-dr-surface ${compact ? "p-4" : "p-5"}`}>
      <h3 className={`font-bold text-dr-text ${compact ? "mb-1 text-sm" : "mb-2 text-base"}`}>
        Never Miss the Tea
      </h3>
      <p className={`text-dr-text-muted ${compact ? "mb-3 text-[11px]" : "mb-4 text-xs"}`}>
        Get breaking drama alerts straight to your inbox.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === "loading"}
          className="min-w-0 flex-1 rounded-lg border border-dr-border-hover bg-dr-bg px-3 py-2 text-xs text-dr-text placeholder-dr-text-dim outline-none transition-colors focus:border-dr-pink"
          aria-label="Email address for alerts"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-lg bg-gradient-to-r from-dr-pink to-dr-purple px-3 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "loading" ? "..." : "Get Alerts"}
        </button>
      </form>

      {status === "error" && (
        <p className="mt-2 text-[11px] text-red-400">{message}</p>
      )}
    </div>
  );
}
