import { categories, type Bookmark, type Category } from '@/content/bookmarks';

export function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function groupByCategory(
  bookmarks: Bookmark[]
): { category: Category; bookmarks: Bookmark[] }[] {
  return categories
    .map((category) => ({
      category,
      bookmarks: bookmarks.filter((b) => b.category === category),
    }))
    .filter((group) => group.bookmarks.length > 0);
}
