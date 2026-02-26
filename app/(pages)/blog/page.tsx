import { listPosts } from '@/lib/posts';
import BlogCard from '@/components/blogs/blog-card';
import type { Metadata } from 'next';

export default async function BlogIndexPage() {
  const posts = await listPosts();
  return (
    <div className="flex-1">
      <div className="px-4 py-14">
        <h1 className="text-xl font-medium tracking-tight text-balance sm:text-2xl">
          Blogs
        </h1>
        <p className="text-muted-foreground pt-2 text-sm">
          Essays, notes, and more.
        </p>
      </div>

      <div className="px-4">
        {posts.map((p) => (
          <BlogCard post={p} key={p.slug} />
        ))}

        {posts.length === 0 && (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Writing on software engineering, development, and technology.',
};
