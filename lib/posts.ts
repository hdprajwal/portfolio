import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  content?: string;
  image?: string;
};

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export const baseUrl = 'https://prajwalhd.dev';

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export async function listPosts(): Promise<Post[]> {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '');
      const filePath = path.join(BLOG_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data, content: mdxContent } = matter(content);

      return {
        slug,
        title: data.title || slug,
        date: data.date || '1970-01-01',
        summary: data.summary,
        tags: data.tags || [],
        content: mdxContent,
        image: data.image || data.cover || data.banner || undefined,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export const getBlogPosts = listPosts;

export async function getPost(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: mdxContent } = matter(content);

  return {
    slug,
    title: data.title || slug,
    date: data.date || '1970-01-01',
    summary: data.summary,
    tags: data.tags || [],
    content: mdxContent,
  };
}
