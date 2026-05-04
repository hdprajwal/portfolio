const WORDS_PER_MINUTE = 225;

export function readingMinutes(content?: string): number {
  if (!content) return 1;
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
