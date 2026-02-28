import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { archiveItems } from "@/content/archive";

type ArchiveDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function findArchiveItem(slug: string) {
  return archiveItems.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: ArchiveDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = findArchiveItem(slug);

  if (!item) {
    return {
      title: "Not Found | jason.gold"
    };
  }

  return {
    title: `${item.title} | Archive | jason.gold`,
    description: item.summary
  };
}

export function generateStaticParams() {
  return archiveItems.filter((item) => Boolean(item.detail)).map((item) => ({ slug: item.slug }));
}

export default async function ArchiveDetailPage({ params }: ArchiveDetailPageProps) {
  const { slug } = await params;
  const item = findArchiveItem(slug);

  if (!item || !item.detail) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-quiet">Archive / {item.year}</p>
        <h1 className="text-4xl leading-tight text-ink sm:text-5xl">{item.title}</h1>
        <p className="text-sm leading-relaxed text-quiet">{item.detail.intro}</p>
      </header>

      <section className="space-y-8">
        {item.detail.sections.map((section) => (
          <div key={section.heading} className="space-y-3">
            <h2 className="text-xl text-ink">{section.heading}</h2>
            <p className="text-base leading-relaxed text-quiet">{section.body}</p>
          </div>
        ))}
      </section>

      <div className="border-t border-line pt-6">
        <Link href="/archive" className="text-sm text-accent underline-offset-4 hover:underline">
          Back to archive
        </Link>
      </div>
    </article>
  );
}
