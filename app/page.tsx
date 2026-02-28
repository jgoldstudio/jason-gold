import Link from "next/link";
import { formatDisplayDate } from "@/lib/date";
import { featuredArchiveItems } from "@/content/archive";
import { getSubstackBaseUrl, getSubstackPosts } from "@/lib/substack";
import type { ArchiveItem } from "@/lib/types";

function SelectedWorkLink({ item }: { item: ArchiveItem }) {
  if (item.detail) {
    return (
      <Link href={`/archive/${item.slug}`} className="underline-offset-4 hover:underline">
        {item.title}
      </Link>
    );
  }

  if (item.href) {
    return (
      <Link href={item.href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
        {item.title}
      </Link>
    );
  }

  return (
    <Link href="/archive" className="underline-offset-4 hover:underline">
      {item.title}
    </Link>
  );
}

export default async function HomePage() {
  const substackUrl = getSubstackBaseUrl();
  const posts = await getSubstackPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <section className="space-y-20">
      <header className="max-w-4xl space-y-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-quiet">JASON.GOLD</p>
        <h1 className="text-balance text-4xl leading-tight text-ink sm:text-6xl">CV as a living log.</h1>
        <p className="max-w-2xl text-base leading-relaxed text-quiet">
          I design, build, and publish systems for thoughtful digital work. This site tracks what I&apos;m making and how that
          practice evolves over time.
        </p>
        <div className="flex flex-wrap gap-5 text-sm text-quiet">
          <Link href="/about" className="underline-offset-4 hover:text-ink hover:underline">
            About
          </Link>
          <Link href="/archive" className="underline-offset-4 hover:text-ink hover:underline">
            Selected Work
          </Link>
          <Link href="/journal" className="underline-offset-4 hover:text-ink hover:underline">
            Journal
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
      </header>

      <section className="space-y-6" aria-labelledby="selected-work-heading">
        <div className="flex items-center justify-between gap-6">
          <h2 id="selected-work-heading" className="font-mono text-xs uppercase tracking-[0.18em] text-quiet">
            Selected Work
          </h2>
          <Link href="/archive" className="text-sm text-accent underline-offset-4 hover:underline">
            View archive
          </Link>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {featuredArchiveItems.map((item) => (
            <li key={item.slug} className="grid gap-4 py-5 sm:grid-cols-[9.5rem_1fr] sm:gap-8">
                <p className="font-mono text-xs tracking-[0.08em] text-quiet">{item.year}</p>
                <article>
                  <h3 className="text-xl leading-tight text-ink">
                    <SelectedWorkLink item={item} />
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-quiet">{item.summary}</p>
                </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-6" aria-labelledby="latest-posts-heading">
        <div className="flex items-center justify-between gap-6">
          <h2 id="latest-posts-heading" className="font-mono text-xs uppercase tracking-[0.18em] text-quiet">
            Latest Journal Entries
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
