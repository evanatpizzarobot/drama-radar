"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SHOW_TAGS, SITE_URL } from "@/lib/constants";
import { fetchCastMember, fetchCast, fetchFeed, fetchArticles } from "@/lib/api";
import { CastCard, CastInitialAvatar } from "@/components/CastCard";
import { FeedList } from "@/components/FeedList";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { AdUnit } from "@/components/AdUnit";
import type { CastMember, FeedItem, EditorialArticle } from "@/lib/types";

interface CastMemberClientProps {
  slug: string;
}

function CastMemberSchema({ member }: { member: CastMember }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.fullName,
    alternateName: member.displayName !== member.fullName ? member.displayName : undefined,
    description: member.bio,
    birthPlace: member.hometown || undefined,
    url: `${SITE_URL}/cast/${member.slug}`,
    sameAs: [
      member.instagram ? `https://www.instagram.com/${member.instagram}` : null,
      member.tiktok ? `https://www.tiktok.com/@${member.tiktok}` : null,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-6 h-1.5 w-full animate-pulse rounded-full bg-dr-surface-hover" />
      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="h-24 w-24 animate-pulse rounded-full bg-dr-surface-hover" />
        <div className="flex-1 text-center sm:text-left">
          <div className="mb-2 h-8 w-48 animate-pulse rounded bg-dr-surface-hover" />
          <div className="mb-2 h-4 w-32 animate-pulse rounded bg-dr-surface-hover" />
          <div className="mb-1 h-3 w-full animate-pulse rounded bg-dr-surface-hover" />
          <div className="h-3 w-3/4 animate-pulse rounded bg-dr-surface-hover" />
        </div>
      </div>
    </div>
  );
}

export function CastMemberClient({ slug }: CastMemberClientProps) {
  const [member, setMember] = useState<CastMember | null>(null);
  const [coStars, setCoStars] = useState<CastMember[]>([]);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [articles, setArticles] = useState<EditorialArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const castMember = await fetchCastMember(slug);

      if (!castMember) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setMember(castMember);

      // Load related data in parallel
      const primaryShow = castMember.shows[0];
      const [feedRes, articlesRes, allCastRes] = await Promise.all([
        fetchFeed({ show: primaryShow, limit: 10 }),
        fetchArticles({ show: primaryShow, limit: 10 }),
        fetchCast({ show: primaryShow, limit: 50 }),
      ]);

      setFeedItems(feedRes.items);
      setArticles(articlesRes.articles);

      // Filter co-stars from the full cast list
      const coStarSlugs = new Set(castMember.coStars);
      const relatedCast = allCastRes.cast.filter(
        (c) => coStarSlugs.has(c.slug) && c.slug !== slug
      );
      setCoStars(relatedCast);

      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) return <ProfileSkeleton />;

  if (notFound || !member) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-xl border border-dr-border bg-dr-surface/60 p-8 text-center">
          <p className="mb-2 text-lg font-bold text-dr-text">
            Cast Member Not Found
          </p>
          <p className="mb-6 text-sm text-dr-text-muted">
            We could not find a cast member with that name.
          </p>
          <Link
            href="/cast"
            className="inline-block rounded-lg bg-gradient-to-r from-dr-pink to-dr-purple px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Browse All Cast
          </Link>
        </div>
      </div>
    );
  }

  const primaryShow = member.shows[0];
  const showDef = SHOW_TAGS[primaryShow];
  const showColor = showDef?.color || "#E84393";

  const statusLabel =
    member.status === "friend-of"
      ? "Friend Of"
      : member.status === "former"
        ? "Former Cast Member"
        : "Current Cast Member";

  const statusClasses =
    member.status === "current"
      ? "bg-emerald-500/20 text-emerald-400"
      : member.status === "friend-of"
        ? "bg-amber-500/20 text-amber-400"
        : "bg-dr-text-dim/20 text-dr-text-dim";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Structured data */}
      <CastMemberSchema member={member} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Cast", url: `${SITE_URL}/cast` },
          { name: member.displayName, url: `${SITE_URL}/cast/${member.slug}` },
        ]}
      />

      {/* Color accent bar */}
      <div
        className="mb-6 h-1.5 w-full rounded-full"
        style={{ backgroundColor: showColor }}
      />

      {/* Breadcrumb */}
      <div className="mb-5">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Cast", href: "/cast" },
            { label: member.displayName },
          ]}
        />
      </div>

      {/* Profile header */}
      <div className="mb-8 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <CastInitialAvatar name={member.displayName} showColor={showColor} size="lg" />
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-dr-text">
            {member.displayName}
          </h1>
          {member.displayName !== member.fullName && (
            <p className="mt-0.5 text-sm text-dr-text-dim">{member.fullName}</p>
          )}

          {/* Tags row */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            {member.shows.map((showTag) => {
              const show = SHOW_TAGS[showTag];
              return (
                <Link
                  key={showTag}
                  href={`/shows/${showTag}`}
                  className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: `${show?.color || "#888"}20`,
                    color: show?.color || "#888",
                  }}
                >
                  {show?.label || showTag}
                </Link>
              );
            })}
            <span
              className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${statusClasses}`}
            >
              {statusLabel}
            </span>
          </div>

          {/* Quick facts */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-dr-text-muted sm:justify-start">
            {member.hometown && (
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                {member.hometown}
              </span>
            )}
            {member.age > 0 && <span>Age {member.age}</span>}
          </div>

          {/* Social links */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            {member.instagram && (
              <a
                href={`https://www.instagram.com/${member.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-dr-surface px-3 py-1.5 text-[10px] font-bold text-dr-text-muted transition-colors hover:bg-dr-surface-hover hover:text-dr-pink"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                @{member.instagram}
              </a>
            )}
            {member.tiktok && (
              <a
                href={`https://www.tiktok.com/@${member.tiktok}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-dr-surface px-3 py-1.5 text-[10px] font-bold text-dr-text-muted transition-colors hover:bg-dr-surface-hover hover:text-dr-pink"
              >
                TikTok @{member.tiktok}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-dr-text">
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: showColor }} aria-hidden="true" />
          About {member.displayName}
        </h2>
        <p className="text-sm leading-relaxed text-dr-text-muted">{member.bio}</p>
      </section>

      {/* Storylines */}
      {member.storylines.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-dr-text">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-dr-purple" aria-hidden="true" />
            Key Storylines
          </h2>
          <div className="flex flex-wrap gap-2">
            {member.storylines.map((storyline) => (
              <span
                key={storyline}
                className="rounded-full border border-dr-border bg-dr-surface px-3 py-1.5 text-xs text-dr-text-muted"
              >
                {storyline
                  .split("-")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ")}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Ad unit */}
      <div className="mb-8">
        <AdUnit slot="between-sections" />
      </div>

      {/* Co-Stars */}
      {coStars.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-dr-text">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: showColor }} aria-hidden="true" />
            Co-Stars
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {coStars.map((star) => (
              <CastCard key={star.slug} member={star} compact />
            ))}
          </div>
        </section>
      )}

      {/* Related articles */}
      {articles.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-dr-text">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-dr-pink" aria-hidden="true" />
            Related Articles
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {articles.slice(0, 4).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Latest feed from their show */}
      {feedItems.length > 0 && (
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-dr-text">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-dr-pink" aria-hidden="true" />
            Latest {showDef?.label || "Show"} News
          </h2>
          <FeedList initialItems={feedItems} showTag={primaryShow} />
        </section>
      )}
    </div>
  );
}
