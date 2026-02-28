import Link from "next/link";

type SubscribeModuleProps = {
  substackUrl: string;
};

export function SubscribeModule({ substackUrl }: SubscribeModuleProps) {
  return (
    <aside className="rounded-sm border border-line bg-white/60 p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-quiet">Subscribe</p>
      <h3 className="mt-3 text-lg text-ink">Receive new entries in your inbox.</h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-quiet">
        Essays and field notes are published quietly through Substack.
      </p>
      <Link
        href={substackUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-sm text-accent underline-offset-4 hover:underline"
      >
        Open Substack
      </Link>
    </aside>
  );
}
