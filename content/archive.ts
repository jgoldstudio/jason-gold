import type { ArchiveItem } from "@/lib/types";

export const archiveItems: ArchiveItem[] = [
  {
    slug: "thirty-day-silence-log",
    title: "Thirty-Day Silence Log",
    year: 2026,
    summary: "A quiet daily log tracking how silence changes writing rhythm.",
    tags: ["writing", "practice"],
    featured: true,
    detail: {
      intro: "I paused new inputs for a month and tracked how ideas formed without constant noise.",
      sections: [
        {
          heading: "Method",
          body: "Each morning started without screens for ninety minutes. I wrote by hand first, then distilled one sentence worth keeping."
        },
        {
          heading: "What Changed",
          body: "The pace slowed, but the signal improved. Fewer drafts, clearer intent, and better memory of what mattered."
        }
      ]
    }
  },
  {
    slug: "ambient-reading-room",
    title: "Ambient Reading Room",
    year: 2026,
    summary: "An experiment in low-friction reading sessions with timed notes.",
    tags: ["tools", "learning"],
    featured: true,
    href: "https://example.com/ambient-reading-room"
  },
  {
    slug: "index-of-open-questions",
    title: "Index of Open Questions",
    year: 2026,
    summary: "A living page of unresolved questions grouped by horizon.",
    tags: ["notes", "systems"],
    featured: true,
    detail: {
      intro: "This index exists to keep uncertainty visible instead of pretending everything has a tidy conclusion.",
      sections: [
        {
          heading: "Near Horizon",
          body: "Questions that can be tested in a week, usually with concrete constraints and observable outcomes."
        },
        {
          heading: "Far Horizon",
          body: "Questions that shape direction, not tasks. These stay open by design and get revisited monthly."
        }
      ]
    }
  },
  {
    slug: "small-web-atlas",
    title: "Small Web Atlas",
    year: 2025,
    summary: "A hand-curated map of independent sites worth returning to.",
    tags: ["web", "curation"],
    href: "https://example.com/small-web-atlas"
  },
  {
    slug: "slow-interface-study",
    title: "Slow Interface Study",
    year: 2025,
    summary: "UI patterns that reward attention instead of extracting it.",
    tags: ["design", "interaction"],
    featured: true,
    detail: {
      intro: "I cataloged interfaces that intentionally avoid urgency while still feeling alive.",
      sections: [
        {
          heading: "Patterns",
          body: "Long-form defaults, gentle hierarchy, and deliberate dead-ends that invite reflection before action."
        },
        {
          heading: "Tradeoffs",
          body: "Some users perceive calm as slow. The challenge is clarity without pressure, not speed at any cost."
        }
      ]
    }
  },
  {
    slug: "future-letters",
    title: "Future Letters",
    year: 2025,
    summary: "Yearly letters to future collaborators about what to protect.",
    tags: ["writing", "collaboration"],
    href: "https://example.com/future-letters"
  },
  {
    slug: "one-block-walks",
    title: "One-Block Walks",
    year: 2025,
    summary: "Micro-walk prompts used between deep work sessions.",
    tags: ["habits", "energy"]
  },
  {
    slug: "error-garden",
    title: "Error Garden",
    year: 2025,
    summary: "A visual archive of mistakes with notes on what each one taught.",
    tags: ["engineering", "learning"],
    featured: true,
    detail: {
      intro: "Instead of hiding failures in commit history, this project frames errors as reusable pattern language.",
      sections: [
        {
          heading: "Collection",
          body: "Each entry captures context, trigger, and recovery path, then tags the mistake with a memorable name."
        },
        {
          heading: "Result",
          body: "Patterns emerged quickly: assumption drift, invisible defaults, and rushed handoffs were repeat offenders."
        }
      ]
    }
  },
  {
    slug: "minimal-publishing-kit",
    title: "Minimal Publishing Kit",
    year: 2024,
    summary: "A set of templates for publishing essays with almost no tooling.",
    tags: ["publishing", "tools"],
    href: "https://example.com/minimal-publishing-kit"
  },
  {
    slug: "morning-protocol-v2",
    title: "Morning Protocol v2",
    year: 2024,
    summary: "A structured start-of-day protocol with fewer decisions.",
    tags: ["protocol", "personal systems"]
  },
  {
    slug: "field-notes-index",
    title: "Field Notes Index",
    year: 2024,
    summary: "Cross-referenced snippets from travel and studio visits.",
    tags: ["notes", "research"],
    href: "https://example.com/field-notes-index"
  },
  {
    slug: "one-sentence-dashboard",
    title: "One-Sentence Dashboard",
    year: 2024,
    summary: "A daily dashboard where progress is captured in one sentence.",
    tags: ["metrics", "writing"]
  },
  {
    slug: "attention-ledger",
    title: "Attention Ledger",
    year: 2024,
    summary: "A ledger for tracking where focus was spent versus intended.",
    tags: ["attention", "systems"],
    featured: true,
    detail: {
      intro: "The ledger reframes focus as a finite budget that can be audited, not a vague feeling.",
      sections: [
        {
          heading: "Tracking",
          body: "Every block of deep work is logged with a purpose tag and a confidence score after completion."
        },
        {
          heading: "Reflection",
          body: "Weekly reviews compare intended focus with actual allocation to spot drift before it compounds."
        }
      ]
    }
  },
  {
    slug: "letterpress-digital",
    title: "Letterpress Digital",
    year: 2023,
    summary: "A typographic study translating letterpress constraints to web layouts.",
    tags: ["typography", "web"],
    href: "https://example.com/letterpress-digital"
  },
  {
    slug: "tiny-rituals",
    title: "Tiny Rituals",
    year: 2023,
    summary: "A notebook of lightweight rituals for transitions between contexts.",
    tags: ["rituals", "wellbeing"]
  },
  {
    slug: "workbench-notes",
    title: "Workbench Notes",
    year: 2023,
    summary: "Fragments from unfinished prototypes, kept public on purpose.",
    tags: ["prototypes", "public notes"],
    href: "https://example.com/workbench-notes"
  },
  {
    slug: "archive-of-first-drafts",
    title: "Archive of First Drafts",
    year: 2023,
    summary: "Unpolished drafts kept as references for future thinking.",
    tags: ["writing", "archive"]
  },
  {
    slug: "manual-recommendation-engine",
    title: "Manual Recommendation Engine",
    year: 2022,
    summary: "A human-curated recommendation flow based on short interviews.",
    tags: ["curation", "research"],
    href: "https://example.com/manual-recommendation-engine"
  }
];

export const archiveItemsSorted = [...archiveItems].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));

export const featuredArchiveItems = archiveItemsSorted.filter((item) => item.featured).slice(0, 6);
