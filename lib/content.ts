import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function isHiddenDraft(
  draft: boolean | undefined,
  nodeEnv: string | undefined = process.env.NODE_ENV
): boolean {
  return draft === true && nodeEnv === 'production';
}

// Drops top-level MDX import/export statements so raw content works for TOC, reading time, and .md output.
export function stripMdxEsm(source: string): string {
  return source
    .replace(/^import\s[\s\S]*?\sfrom\s+['"][^'"]+['"];?[ \t]*$/gm, '')
    .replace(/^import\s+['"][^'"]+['"];?[ \t]*$/gm, '')
    .replace(/^export\s.*$/gm, '')
    .replace(/^\s*\n/, '')
    .replace(/\n{3,}/g, '\n\n');
}

export type MdxEntry = {
  slug: string;
  data: Record<string, any>;
  content: string;
};

// Each post is a folder (<dir>/<slug>/index.mdx) so it can keep its own components next to it.
export function readMdxEntry(dir: string, slug: string): MdxEntry | null {
  const filePath = path.join(dir, slug, 'index.mdx');
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
  return { slug, data, content: stripMdxEsm(content) };
}

export function readMdxEntries(dir: string): MdxEntry[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => readMdxEntry(dir, entry.name))
    .filter((entry): entry is MdxEntry => entry !== null);
}
