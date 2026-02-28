"use client";

import { Fragment, useMemo, useState } from "react";
import Link from "next/link";
import { formatDisplayDate } from "@/lib/date";
import type { SubstackPost } from "@/lib/types";
import { SubscribeModule } from "@/components/SubscribeModule";

type JournalFeedClientProps = {
  posts: SubstackPost[];
  substackUrl: string;
};

const INITIAL_COUNT = 12;
const STEP = 12;

export function JournalFeedClient({ posts, substackUrl }: JournalFeedClientProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const visiblePosts = useMemo(() => posts.slice(0, visibleCount), [posts, visibleCount]);

  if (posts.length === 0) {
    return (
      <p className="text-sm leading-relaxed text-quiet">
        No journal entries yet. Add `SUBSTACK_RSS_URL` to load the feed.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <ol className="space-y-0" aria-label="Journal feed">
        {visiblePosts.map((post, index) => (
          <Fragment key={`${post.id}-${index}`}>
            <li className="border-b border-line py-6">
              <article className="grid gap-4 sm:grid-cols-[9.5rem_1fr] sm:gap-8">
                <p className="font-mono text-xs tracking-[0.08em] text-quiet">{formatDisplayDate(post.date)}</p>
                <div>
                  <h2 className="text-xl leading-tight text-ink">
                    <Link
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt ? <p className="mt-3 max-w-2xl text-sm leading-relaxed text-quiet">{post.excerpt}</p> : null}
                  <Link
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm text-accent underline-offset-4 hover:underline"
                  >
                    Read on Substack
                  </Link>
                </div>
              </article>
            </li>

            {(index + 1) % 6 === 0 ? (
              <li className="py-8">
                <SubscribeModule substackUrl={substackUrl} />
              </li>
            ) : null}
          </Fragment>
        ))}
      </ol>

      {visibleCount < posts.length ? (
        <button
          type="button"
          onClick={() => setVisibleCount((count) => count + STEP)}
          className="rounded-sm border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-ink"
        >
          Load more entries
        </button>
      ) : null}
    </div>
  );
}
