import { summarizePlainText, toPlainText, unwrapCdata } from "@/lib/text";
import type { SubstackPost } from "@/lib/types";

const RSS_REVALIDATE_SECONDS = 2700;

function readFirstTag(xml: string, tagNames: string[]): string | null {
  for (const tagName of tagNames) {
    const escaped = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`, "i");
    const match = xml.match(pattern);

    if (match?.[1]) {
      return unwrapCdata(match[1]).trim();
    }
  }

  return null;
}

function parsePost(itemXml: string, index: number): SubstackPost | null {
  const title = toPlainText(readFirstTag(itemXml, ["title"]) ?? "Untitled");
  const url = readFirstTag(itemXml, ["link"])?.trim();
  const guid = readFirstTag(itemXml, ["guid", "id"])?.trim();
  const rawDate = readFirstTag(itemXml, ["pubDate", "dc:date"]);
  const description = readFirstTag(itemXml, ["description", "content:encoded"]) ?? "";

  if (!url) {
    return null;
  }

  const parsedDate = rawDate ? new Date(rawDate) : null;
  const date = parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : new Date(0).toISOString();
  const excerpt = summarizePlainText(toPlainText(description), 180);

  return {
    id: guid || `${url}#${index}`,
    title,
    url,
    date,
    excerpt
  };
}

function parseSubstackRss(xml: string): SubstackPost[] {
  const items = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];

  return items
    .map((itemXml, index) => parsePost(itemXml, index))
    .filter((post): post is SubstackPost => post !== null)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getSubstackBaseUrl(): string {
  const value = process.env.SUBSTACK_RSS_URL;

  if (!value) {
    return "https://substack.com";
  }

  try {
    const parsed = new URL(value);
    return `${parsed.protocol}//${parsed.hostname}`;
  } catch {
    return "https://substack.com";
  }
}

export async function getSubstackPosts(): Promise<SubstackPost[]> {
  const rssUrl = process.env.SUBSTACK_RSS_URL;

  if (!rssUrl) {
    return [];
  }

  try {
    const response = await fetch(rssUrl, {
      next: {
        revalidate: RSS_REVALIDATE_SECONDS
      }
    });

    if (!response.ok) {
      console.error(`Substack RSS fetch failed: ${response.status}`);
      return [];
    }

    const xml = await response.text();
    return parseSubstackRss(xml);
  } catch (error) {
    console.error("Substack RSS fetch error", error);
    return [];
  }
}
