"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";
import { fetchPredictions } from "@/lib/api";
import type { Prediction } from "@/lib/types";
import { getAuthor } from "@/lib/authors";
import { ShowTagPill } from "@/components/ShowTagPill";
import { AdUnit } from "@/components/AdUnit";

const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "correct", label: "Called It" },
  { key: "wrong", label: "Missed" },
  { key: "developing", label: "Developing" },
] as const;

// Seed predictions rendered client-side as fallback when API has no data
const SEED_PREDICTIONS: Prediction[] = [
  {
    id: "pred-seed-1",
    prediction:
      "Amanda and West will still be together by the reunion. They're going to walk in holding hands just to watch the world burn.",
    context:
      "They didn't put out that joint statement to back down now. These two are digging in. The matching sweatshirts were just the beginning.",
    authorKey: "bb",
    showTags: ["summer-house"],
    createdAt: "2026-03-28T14:00:00Z",
    status: "pending",
    resolvedAt: null,
  },
  {
    id: "pred-seed-2",
    prediction:
      "Ciara Miller is about to become the most followed Summer House cast member by the end of April.",
    context:
      "The internet has fully rallied behind her. Every sympathy follow, every supportive comment, it's all adding up. She's the main character now whether she wanted to be or not.",
    authorKey: "betsy",
    showTags: ["summer-house"],
    createdAt: "2026-03-29T10:30:00Z",
    status: "pending",
    resolvedAt: null,
  },
  {
    id: "pred-seed-3",
    prediction:
      "Bravo is going to announce a Summer House spinoff or reboot before Season 11. The current format can't survive this.",
    context:
      "When Deuxmoi reports the network is exploring contingency plans including cancellation, that's not gossip. That's a leak. They're testing public reaction before making a move.",
    authorKey: "carly",
    showTags: ["summer-house"],
    createdAt: "2026-03-30T16:00:00Z",
    status: "developing",
    resolvedAt: null,
  },
  {
    id: "pred-seed-4",
    prediction:
      "Kyle Cooke and Ciara Miller are going to become the unexpected alliance of the reunion. Revenge friendship era incoming.",
    context:
      "Kyle already posted that photo with Ciara tagged at the Psych Ward. They have a common enemy now. Bravo loves a good alliance arc.",
    authorKey: "bb",
    showTags: ["summer-house"],
    createdAt: "2026-03-31T09:00:00Z",
    status: "pending",
    resolvedAt: null,
  },
  {
    id: "pred-seed-5",
    prediction:
      "The RHOBH Season 15 finale dinner in Italy is going to end at least one major friendship permanently.",
    context:
      "They're calling it The Last Supper for a reason. That title isn't accidental. Someone is getting cut from the inner circle and it's not going to be pretty.",
    authorKey: "bbs-assistant",
    showTags: ["real-housewives-beverly-hills"],
    createdAt: "2026-04-01T08:00:00Z",
    status: "pending",
    resolvedAt: null,
  },
];

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: Prediction["status"] }) {
  const config = {
    pending: {
      label: "Pending",
      bg: "bg-dr-text-dim/30",
      text: "text-dr-text-muted",
      border: "border-dr-text-dim",
      icon: "\u23F3",
    },
    correct: {
      label: "CALLED IT",
      bg: "bg-emerald-500/20",
      text: "text-emerald-400",
      border: "border-emerald-500/50",
      icon: "\u2713",
    },
    wrong: {
      label: "MISSED",
      bg: "bg-red-500/20",
      text: "text-red-400",
      border: "border-red-500/50",
      icon: "\u2717",
    },
    developing: {
      label: "DEVELOPING",
      bg: "bg-amber-500/20",
      text: "text-amber-400",
      border: "border-amber-500/50",
      icon: "\u26A1",
    },
  };

  const c = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${c.bg} ${c.text} ${c.border}`}
    >
      <span aria-hidden="true">{c.icon}</span>
      {c.label}
    </span>
  );
}

function PredictionCard({ prediction }: { prediction: Prediction }) {
  const author = getAuthor(prediction.authorKey);
  const initial = author.displayName.charAt(0).toUpperCase();
  const isCalledIt = prediction.status === "correct";

  return (
    <article
      className={`rounded-xl border p-6 transition-all duration-300 ${
        isCalledIt
          ? "border-amber-500/40 bg-dr-surface shadow-[0_0_20px_rgba(245,189,65,0.1)]"
          : "border-dr-border-hover bg-dr-surface hover:border-dr-pink/30"
      }`}
    >
      {/* Status badge */}
      <div className="mb-4 flex items-center justify-between">
        <StatusBadge status={prediction.status} />
        <time dateTime={prediction.createdAt} className="text-xs text-dr-text-dim">
          {formatDate(prediction.createdAt)}
        </time>
      </div>

      {/* Prediction text */}
      <p className="mb-3 text-lg font-bold leading-snug text-dr-text">
        &ldquo;{prediction.prediction}&rdquo;
      </p>

      {/* Context */}
      <p className="mb-4 text-sm leading-relaxed text-dr-text-muted">
        {prediction.context}
      </p>

      {/* Show tags */}
      {prediction.showTags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {prediction.showTags.map((tag) => (
            <ShowTagPill key={tag} tag={tag} />
          ))}
        </div>
      )}

      {/* Author byline */}
      <div className="flex items-center gap-3 border-t border-dr-border-hover pt-4">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-dr-pink to-dr-purple text-xs font-bold text-white"
          aria-hidden="true"
        >
          {initial}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-dr-text">
            {author.displayName}
          </span>
          <span className="text-xs text-dr-text-dim">{author.role}</span>
        </div>
      </div>

      {/* Resolved date */}
      {prediction.resolvedAt && (
        <p className="mt-3 text-xs text-dr-text-dim">
          Resolved {formatDate(prediction.resolvedAt)}
        </p>
      )}
    </article>
  );
}

export default function PredictionsPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const statusParam = activeFilter === "all" ? undefined : activeFilter;
      const data = await fetchPredictions(statusParam);

      if (data.predictions.length > 0) {
        setPredictions(data.predictions);
      } else {
        // Use seed predictions as fallback, apply client-side filter
        const filtered =
          activeFilter === "all"
            ? SEED_PREDICTIONS
            : SEED_PREDICTIONS.filter((p) => p.status === activeFilter);
        setPredictions(filtered);
      }
      setLoading(false);
    }
    load();
  }, [activeFilter]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      {/* AdSense leaderboard */}
      <AdUnit slot="leaderboard" className="mb-8" />

      {/* Page header */}
      <div className="mb-10">
        <h1 className="mb-3 text-3xl font-extrabold text-dr-text">
          DramaRadar Predictions
        </h1>
        <div
          className="mb-4 h-1 w-24 rounded-full bg-gradient-to-r from-dr-pink to-dr-purple"
          aria-hidden="true"
        />
        <p className="text-sm text-dr-text-muted">
          Our analysts call it before it happens.
        </p>
      </div>

      {/* Filter pills */}
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter predictions by status">
        {STATUS_FILTERS.map((filter) => (
          <button
            key={filter.key}
            type="button"
            role="tab"
            aria-selected={activeFilter === filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
              activeFilter === filter.key
                ? "bg-dr-pink text-white"
                : "bg-dr-surface text-dr-text-muted hover:bg-dr-surface-hover hover:text-dr-text"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Prediction cards */}
      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-dr-border-hover bg-dr-surface p-6"
            >
              <div className="mb-4 h-6 w-24 rounded bg-dr-surface-hover" />
              <div className="mb-3 h-6 w-3/4 rounded bg-dr-surface-hover" />
              <div className="mb-2 h-4 w-full rounded bg-dr-surface-hover" />
              <div className="h-4 w-2/3 rounded bg-dr-surface-hover" />
            </div>
          ))}
        </div>
      ) : predictions.length === 0 ? (
        <div className="rounded-xl border border-dr-border-hover bg-dr-surface p-10 text-center">
          <p className="text-dr-text-muted">
            No predictions match this filter yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {predictions.map((prediction) => (
            <PredictionCard key={prediction.id} prediction={prediction} />
          ))}
        </div>
      )}

      {/* AdSense between sections */}
      <AdUnit slot="between-sections" className="mt-8" />
    </div>
  );
}
