import type { Metadata } from "next";
import { ArchiveGridClient } from "@/components/archive/ArchiveGridClient";
import { archiveItemsSorted } from "@/content/archive";

export const metadata: Metadata = {
  title: "Archive | jason.gold",
  description: "Projects and experiments from the local archive."
};

export default function ArchivePage() {
  return (
    <section className="space-y-10">
      <header className="max-w-3xl space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-quiet">Archive</p>
        <h1 className="text-4xl leading-tight text-ink sm:text-5xl">Projects, experiments, and fragments.</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-quiet">
          A local collection of ongoing work, arranged as an open-ended grid.
        </p>
      </header>

      <ArchiveGridClient items={archiveItemsSorted} />
    </section>
  );
}
