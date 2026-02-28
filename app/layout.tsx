import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "jason.gold",
  description: "A minimalist, contemplative journal and archive.",
  metadataBase: new URL("https://jason.gold")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-10 sm:px-10 sm:py-14">
          <header className="mb-20 flex items-baseline justify-between">
            <Link href="/" className="text-sm tracking-[0.12em] text-ink transition-colors hover:text-accent">
              jason.gold
            </Link>
            <nav aria-label="Primary" className="flex items-center gap-6 text-sm text-quiet">
              <Link href="/journal" className="transition-colors hover:text-ink">
                Journal
              </Link>
              <Link href="/archive" className="transition-colors hover:text-ink">
                Archive
              </Link>
            </nav>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="mt-24 border-t border-line pt-6 text-xs text-quiet">
            <p>Observations, experiments, and unfinished thoughts.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
