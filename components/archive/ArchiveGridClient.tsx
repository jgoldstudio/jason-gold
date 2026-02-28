"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ArchiveItem } from "@/lib/types";

type ArchiveGridClientProps = {
  items: ArchiveItem[];
};

const INITIAL_COUNT = 12;
const STEP = 9;

function ArchiveCard({ item }: { item: ArchiveItem }) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg leading-tight text-ink">{item.title}</h2>
        <span className="font-mono text-xs tracking-[0.08em] text-quiet">{item.year}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-quiet">{item.summary}</p>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-quiet">{item.tags.join(" · ")}</p>
    </>
  );

  if (item.detail) {
    return (
      <Link
        href={`/archive/${item.slug}`}
        className="block rounded-sm border border-line bg-white/60 p-5 transition-colors hover:border-ink"
      >
        {inner}
      </Link>
    );
  }

  if (item.href) {
    return (
      <Link
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-sm border border-line bg-white/60 p-5 transition-colors hover:border-ink"
      >
        {inner}
      </Link>
    );
  }

  return <article className="rounded-sm border border-line bg-white/60 p-5">{inner}</article>;
}

export function ArchiveGridClient({ items }: ArchiveGridClientProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const visibleItems = useMemo(() => items.slice(0, visibleCount), [items, visibleCount]);

  return (
    <section className="space-y-10" aria-label="Archive entries">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item) => (
          <ArchiveCard key={item.slug} item={item} />
        ))}
      </div>

      {visibleCount < items.length ? (
        <button
          type="button"
          onClick={() => setVisibleCount((count) => count + STEP)}
          className="rounded-sm border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-ink"
        >
          Load more projects
        </button>
      ) : null}
    </section>
  );
}
