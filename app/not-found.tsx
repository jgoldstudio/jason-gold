import Link from "next/link";

export default function NotFound() {
  return (
    <section className="space-y-6 py-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-quiet">404</p>
      <h1 className="text-3xl text-ink">This page drifted out of range.</h1>
      <Link href="/" className="text-sm text-accent underline-offset-4 hover:underline">
        Return home
      </Link>
    </section>
  );
}
