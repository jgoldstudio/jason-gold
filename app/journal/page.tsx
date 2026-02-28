import type { Metadata } from "next";
import Link from "next/link";
import { JournalFeedClient } from "@/components/journal/JournalFeedClient";
import { getSubstackBaseUrl, getSubstackPosts } from "@/lib/substack";

export const metadata: Metadata = {
  title: "Journal | jason.gold",
  description: "Full Substack feed rendered as a date-first log."
};

export default async function JournalPage() {
  const substackUrl = getSubstackBaseUrl();
  const posts = await getSubstackPosts();

  return (
    <section className="space-y-10">
      <header className="max-w-3xl space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-quiet">Journal</p>
        <h1 className="text-4xl leading-tight text-ink sm:text-5xl">Full feed, date first.</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-quiet">
          Every Substack entry appears here as a chronological log with server-side caching.
        </p>
        <Link
          href={substackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-accent underline-offset-4 hover:underline"
        >
          Read on Substack
        </Link>
      </header>

      <JournalFeedClient posts={posts} substackUrl={substackUrl} />
    </section>
  );
}
