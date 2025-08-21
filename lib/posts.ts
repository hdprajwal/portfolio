export type Post = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
};

// Placeholder loader; replace with a file-system backed MDX loader later
export async function listPosts(): Promise<Post[]> {
  return [
    { slug: "example-post", title: "Hello MDX", date: "2025-01-01", summary: "Replace with real MDX loader." },
  ];
}


