import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import "./globals.css";

const neueMontreal = localFont({
  src: [
    { path: "../public/fonts/neue-montreal/PPNeueMontreal-Thin.ttf", weight: "100", style: "normal" },
    { path: "../public/fonts/neue-montreal/PPNeueMontreal-ThinItalic.ttf", weight: "100", style: "italic" },
    { path: "../public/fonts/neue-montreal/PPNeueMontreal-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/neue-montreal/PPNeueMontreal-Book.ttf", weight: "350", style: "normal" },
    { path: "../public/fonts/neue-montreal/PPNeueMontreal-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/neue-montreal/PPNeueMontreal-Italic.ttf", weight: "400", style: "italic" },
    { path: "../public/fonts/neue-montreal/PPNeueMontreal-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/neue-montreal/PPNeueMontreal-Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/neue-montreal/PPNeueMontreal-BoldItalic.ttf", weight: "700", style: "italic" }
  ],
  variable: "--font-sans",
  display: "swap"
});

const supplyMono = localFont({
  src: [
    { path: "../public/fonts/supply/PPSupplyMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/supply/PPSupplyMono-Medium.ttf", weight: "500", style: "normal" }
  ],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: "JASON.GOLD — CV as a living log",
  description: "Curated work, journal entries, and an evolving CV.",
  metadataBase: new URL("https://jason.gold")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${neueMontreal.variable} ${supplyMono.variable}`}>
      <body className="antialiased">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-10 sm:px-10 sm:py-14">
          <header className="mb-20 flex items-baseline justify-between">
            <Link href="/" className="text-sm tracking-[0.12em] text-ink transition-colors hover:text-accent">
              jason.gold
            </Link>
            <nav aria-label="Primary" className="flex items-center gap-6 text-sm text-quiet">
              <Link href="/about" className="transition-colors hover:text-ink">
                About
              </Link>
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
            <p>JASON.GOLD — CV as a living log.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
