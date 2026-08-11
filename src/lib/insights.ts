import type { CollectionEntry } from "astro:content";

export type InsightEntry = CollectionEntry<"insights">;

const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const monthDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function sortInsightsByNewest(entries: InsightEntry[]): InsightEntry[] {
  return [...entries].sort(
    (left, right) => right.data.publishedAt.getTime() - left.data.publishedAt.getTime(),
  );
}

export function getInsightSlug(entry: InsightEntry): string {
  return entry.id
    .replace(/\\/g, "/")
    .replace(/\.(?:md|mdx)$/i, "")
    .replace(/^\/+|\/+$/g, "");
}

export function getInsightPath(entry: InsightEntry): string {
  return `/insights/${getInsightSlug(entry)}/`;
}

export function formatInsightDate(date: Date, includeDay = true): string {
  return (includeDay ? longDateFormatter : monthDateFormatter).format(date);
}

export function getInsightDateTime(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function getDisplayCategory(entry: InsightEntry): string | undefined {
  return entry.data.categories.find(
    (category) => category.trim().toLowerCase() !== "uncategorized",
  );
}

export function getRelatedInsights(
  entries: InsightEntry[],
  current: InsightEntry,
  limit = 3,
): InsightEntry[] {
  const currentCategories = new Set(
    current.data.categories.map((category) => category.trim().toLowerCase()),
  );

  return entries
    .filter((entry) => entry.id !== current.id && !entry.data.draft)
    .sort((left, right) => {
      const leftMatches = left.data.categories.some((category) =>
        currentCategories.has(category.trim().toLowerCase()),
      );
      const rightMatches = right.data.categories.some((category) =>
        currentCategories.has(category.trim().toLowerCase()),
      );

      if (leftMatches !== rightMatches) return leftMatches ? -1 : 1;
      return right.data.publishedAt.getTime() - left.data.publishedAt.getTime();
    })
    .slice(0, limit);
}
