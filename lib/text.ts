const ENTITY_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " "
};

export function unwrapCdata(value: string): string {
  return value.replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/i, "$1");
}

export function decodeEntities(value: string): string {
  return value.replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, (entity) => ENTITY_MAP[entity] ?? entity);
}

export function stripHtml(value: string): string {
  return value
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ");
}

export function cleanWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function summarizePlainText(value: string, maxLength = 180): string {
  if (value.length <= maxLength) {
    return value;
  }

  const short = value.slice(0, maxLength - 1);
  const atWordBoundary = short.replace(/\s+\S*$/, "").trim();

  return `${atWordBoundary || short}…`;
}

export function toPlainText(value: string): string {
  return cleanWhitespace(stripHtml(decodeEntities(unwrapCdata(value))));
}
