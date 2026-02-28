import type { Metadata } from "next";
import Link from "next/link";
import { getSubstackBaseUrl } from "@/lib/substack";

export const metadata: Metadata = {
  title: "About | jason.gold",
  description: "Who I am, what I do, and current focus areas."
};

const focusAreas = [
  "Product strategy and narrative architecture",
  "Editorial systems and knowledge operations",
  "AI-assisted research and writing workflows",
  "Interface design for calm, high-signal experiences"
];

const timeline = [
  {
    period: "Now",
    title: "Independent builder and writer",
    detail: "Designing digital products, publishing essays, and shipping experiments in public."
  },
  {
    period: "2023-2025",
    title: "Creative systems and product consulting",
    detail: "Worked with teams on product clarity, positioning, and execution across design and engineering."
  },
  {
    period: "2018-2023",
    title: "Digital product and content leadership",
    detail: "Led cross-functional work spanning editorial, product, and audience growth."
  }
];

export default function AboutPage() {
  const substackUrl = getSubstackBaseUrl();

  return (
    <section className="mx-auto max-w-4xl space-y-14">
      <header className="space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-quiet">About</p>
        <h1 className="text-4xl leading-tight text-ink sm:text-5xl">Who I am and what I do.</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-quiet">
          I build and write at the intersection of product, design, and ideas. My work is structured like a living CV:
          outcomes, context, and an ongoing log of what I&apos;m learning.
        </p>
      </header>

      <section className="space-y-4" aria-labelledby="focus-heading">
        <h2 id="focus-heading" className="font-mono text-xs uppercase tracking-[0.18em] text-quiet">
          Focus
        </h2>
        <ul className="space-y-2 text-sm leading-relaxed text-ink">
          {focusAreas.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-4" aria-labelledby="timeline-heading">
        <h2 id="timeline-heading" className="font-mono text-xs uppercase tracking-[0.18em] text-quiet">
          Timeline
        </h2>
        <ol className="divide-y divide-line border-y border-line">
          {timeline.map((item) => (
            <li key={item.period + item.title} className="grid gap-4 py-5 sm:grid-cols-[9.5rem_1fr] sm:gap-8">
              <p className="font-mono text-xs tracking-[0.08em] text-quiet">{item.period}</p>
              <div>
                <h3 className="text-lg text-ink">{item.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-quiet">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-4" aria-labelledby="links-heading">
        <h2 id="links-heading" className="font-mono text-xs uppercase tracking-[0.18em] text-quiet">
          Links
        </h2>
        <div className="flex flex-wrap gap-5 text-sm text-quiet">
          <Link href="/archive" className="underline-offset-4 hover:text-ink hover:underline">
            Archive
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
      </section>
    </section>
  );
}
