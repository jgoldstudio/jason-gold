import Link from "next/link";
import { formatDisplayDate } from "@/lib/date";
import { getSubstackBaseUrl, getSubstackPosts } from "@/lib/substack";

export default async function HomePage() {
  const substackUrl = getSubstackBaseUrl();
  const posts = await getSubstackPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <section className="space-y-16">
      <div className="max-w-3xl space-y-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-quiet">journal + archive</p>
        <h1 className="text-balance text-4xl leading-tight text-ink sm:text-5xl">
          in search of something that doesn&apos;t quite exist, yet.
        </h1>
        <div className="flex flex-wrap gap-5 text-sm text-quiet">
          <Link href="/journal" className="underline-offset-4 hover:text-ink hover:underline">
            Journal
          </Link>
          <Link href="/archive" className="underline-offset-4 hover:text-ink hover:underline">
            Archive
          </Link>
          <Link
            href={substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-ink hover:underline"
          >
            Substack
          </Link>
        </div>
      </div>

      <section className="space-y-6" aria-labelledby="latest-posts-heading">
        <div className="flex items-center justify-between gap-6">
          <h2 id="latest-posts-heading" className="font-mono text-xs uppercase tracking-[0.18em] text-quiet">
            Latest from Journal
          </h2>
          <Link href="/journal" className="text-sm text-accent underline-offset-4 hover:underline">
            View all
          </Link>
        </div>

        {latestPosts.length === 0 ? (
          <p className="text-sm text-quiet">No entries yet. Add `SUBSTACK_RSS_URL` to load your feed.</p>
        ) : (
          <ol className="divide-y divide-line border-y border-line">
            {latestPosts.map((post) => (
              <li key={post.id} className="grid gap-4 py-5 sm:grid-cols-[9.5rem_1fr] sm:gap-8">
                <p className="font-mono text-xs tracking-[0.08em] text-quiet">{formatDisplayDate(post.date)}</p>
                <article>
                  <h3 className="text-xl leading-tight text-ink">
                    <Link
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  {post.excerpt ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-quiet">{post.excerpt}</p> : null}
                </article>
              </li>
            ))}
          </ol>
        )}
      </section>
    </section>
  );
}
