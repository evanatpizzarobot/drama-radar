"use client";

import { useState } from "react";
import { fetchHoroscope } from "@/lib/api";
import type { HoroscopeData } from "@/lib/types";
import { AdUnit } from "@/components/AdUnit";

const PERIODS = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
] as const;

const ZODIAC_SIGNS = [
  { sign: "aries", symbol: "\u2648", name: "Aries", dates: "Mar 21 - Apr 19", element: "Fire", color: "#FF6B6B" },
  { sign: "taurus", symbol: "\u2649", name: "Taurus", dates: "Apr 20 - May 20", element: "Earth", color: "#00B894" },
  { sign: "gemini", symbol: "\u264A", name: "Gemini", dates: "May 21 - Jun 20", element: "Air", color: "#FDCB6E" },
  { sign: "cancer", symbol: "\u264B", name: "Cancer", dates: "Jun 21 - Jul 22", element: "Water", color: "#74B9FF" },
  { sign: "leo", symbol: "\u264C", name: "Leo", dates: "Jul 23 - Aug 22", element: "Fire", color: "#FF7675" },
  { sign: "virgo", symbol: "\u264D", name: "Virgo", dates: "Aug 23 - Sep 22", element: "Earth", color: "#A29BFE" },
  { sign: "libra", symbol: "\u264E", name: "Libra", dates: "Sep 23 - Oct 22", element: "Air", color: "#FD79A8" },
  { sign: "scorpio", symbol: "\u264F", name: "Scorpio", dates: "Oct 23 - Nov 21", element: "Water", color: "#E17055" },
  { sign: "sagittarius", symbol: "\u2650", name: "Sagittarius", dates: "Nov 22 - Dec 21", element: "Fire", color: "#6C5CE7" },
  { sign: "capricorn", symbol: "\u2651", name: "Capricorn", dates: "Dec 22 - Jan 19", element: "Earth", color: "#636E72" },
  { sign: "aquarius", symbol: "\u2652", name: "Aquarius", dates: "Jan 20 - Feb 18", element: "Air", color: "#00CEC9" },
  { sign: "pisces", symbol: "\u2653", name: "Pisces", dates: "Feb 19 - Mar 20", element: "Water", color: "#A855F7" },
] as const;

type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

function SignCard({
  zodiac,
  isSelected,
  onClick,
}: {
  zodiac: ZodiacSign;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex flex-col items-center gap-2 rounded-xl border p-4 transition-all duration-200 ${
        isSelected
          ? "border-opacity-60 bg-[#1A1A2E] scale-[1.02]"
          : "border-[#2A2A3E] bg-[#1A1A2E] hover:border-opacity-40 hover:scale-[1.01]"
      }`}
      style={{
        borderColor: isSelected ? zodiac.color : undefined,
        boxShadow: isSelected ? `0 0 16px ${zodiac.color}33` : undefined,
      }}
      aria-label={`${zodiac.name} (${zodiac.dates})`}
      aria-pressed={isSelected}
    >
      <span
        className="text-3xl transition-transform duration-200 group-hover:scale-110"
        style={{ color: zodiac.color }}
        aria-hidden="true"
      >
        {zodiac.symbol}
      </span>
      <span className="text-sm font-bold text-[#F5F5F5]">{zodiac.name}</span>
      <span className="text-[10px] text-[#555568]">{zodiac.dates}</span>
    </button>
  );
}

function ReadingSection({
  zodiac,
  period,
  horoscope,
  loading,
  stale,
}: {
  zodiac: ZodiacSign;
  period: string;
  horoscope: HoroscopeData | null;
  loading: boolean;
  stale?: boolean;
}) {
  return (
    <div
      className="mt-8 rounded-xl border p-6 sm:p-8"
      style={{
        borderColor: `${zodiac.color}44`,
        background: `linear-gradient(135deg, #1A1A2E 0%, ${zodiac.color}08 100%)`,
      }}
    >
      {/* Sign header */}
      <div className="mb-6 flex items-center gap-4">
        <span
          className="text-5xl"
          style={{ color: zodiac.color }}
          aria-hidden="true"
        >
          {zodiac.symbol}
        </span>
        <div>
          <h2 className="text-2xl font-extrabold text-[#F5F5F5]">
            {zodiac.name}
          </h2>
          <p className="text-sm text-[#A0A0B0]">
            {zodiac.dates} &middot; {zodiac.element}
          </p>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center gap-3">
          <div
            className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"
            style={{ borderColor: `${zodiac.color}88`, borderTopColor: "transparent" }}
          />
          <p className="text-sm text-[#A0A0B0] animate-pulse">
            Consulting the stars...
          </p>
        </div>
      )}

      {/* Horoscope text */}
      {!loading && horoscope && (
        <div>
          {stale && (
            <p className="mb-3 rounded-lg bg-amber-500/10 px-3 py-2 text-xs text-amber-400">
              This reading may be slightly out of date. The cosmos will refresh soon.
            </p>
          )}
          <p className="text-base leading-relaxed text-[#F5F5F5]">
            {horoscope.horoscope}
          </p>
          <p className="mt-4 text-xs text-[#555568]">
            {period.charAt(0).toUpperCase() + period.slice(1)} reading
            {horoscope.date ? ` for ${horoscope.date}` : ""}
          </p>
        </div>
      )}

      {/* Error state */}
      {!loading && !horoscope && (
        <p className="text-sm text-[#A0A0B0]">
          The stars are being shy right now. Try again in a moment.
        </p>
      )}
    </div>
  );
}

export default function HoroscopePage() {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [period, setPeriod] = useState("daily");
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [stale, setStale] = useState(false);

  async function loadHoroscope(zodiac: ZodiacSign, selectedPeriod: string) {
    setSelectedSign(zodiac);
    setHoroscope(null);
    setStale(false);
    setLoading(true);

    const result = await fetchHoroscope(zodiac.sign, selectedPeriod);

    if (result) {
      setHoroscope(result.data);
      setStale(result.stale || false);
    }
    setLoading(false);
  }

  function handleSignClick(zodiac: ZodiacSign) {
    loadHoroscope(zodiac, period);
  }

  function handlePeriodChange(newPeriod: string) {
    setPeriod(newPeriod);
    if (selectedSign) {
      loadHoroscope(selectedSign, newPeriod);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      {/* AdSense leaderboard */}
      <AdUnit slot="leaderboard" className="mb-8" />

      {/* Page header */}
      <div className="mb-10">
        <h1 className="mb-3 text-3xl font-extrabold text-[#F5F5F5]">
          Your Daily Horoscope
        </h1>
        <div
          className="mb-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#E84393] to-[#A855F7]"
          aria-hidden="true"
        />
        <p className="text-sm text-[#A0A0B0]">
          The stars have tea to spill too.
        </p>
      </div>

      {/* Period toggle */}
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Select horoscope period">
        {PERIODS.map((p) => (
          <button
            key={p.key}
            type="button"
            role="tab"
            aria-selected={period === p.key}
            onClick={() => handlePeriodChange(p.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
              period === p.key
                ? "bg-[#E84393] text-white"
                : "bg-[#1A1A2E] text-[#A0A0B0] hover:bg-[#2A2A3E] hover:text-[#F5F5F5]"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Zodiac grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {ZODIAC_SIGNS.map((zodiac) => (
          <SignCard
            key={zodiac.sign}
            zodiac={zodiac}
            isSelected={selectedSign?.sign === zodiac.sign}
            onClick={() => handleSignClick(zodiac)}
          />
        ))}
      </div>

      {/* AdSense between grid and reading */}
      <AdUnit slot="between-sections" className="mt-8" />

      {/* Expanded reading */}
      {selectedSign && (
        <ReadingSection
          zodiac={selectedSign}
          period={period}
          horoscope={horoscope}
          loading={loading}
          stale={stale}
        />
      )}

      {/* DramaRadar voice footer */}
      <p className="mt-12 text-center text-xs text-[#555568] italic">
        Horoscopes are pulled from the cosmos (and a free API). For entertainment purposes only.
        If Mercury is in retrograde, we take no responsibility for your texts.
      </p>
    </div>
  );
}
