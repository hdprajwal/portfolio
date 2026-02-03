import { listPosts } from '@/lib/posts';
import Reveal from '@/components/Reveal';
import BlogCard from '@/components/BlogCard';
import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';

export default async function BlogIndexPage() {
  const posts = await listPosts();
  return (
    <div className="flex-1">
      <div className="px-4 pt-20 pb-10">
        <h1 className="text-[2.5rem] font-extrabold tracking-tight leading-[1.2]">Blogs</h1>
        <p className="text-[0.9rem] text-muted-foreground mt-2">
          Essays, notes, and more.
        </p>
        <Separator className="mt-1 bg-muted-foreground" />
      </div>

      <div className="px-4">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 60}>
            <BlogCard post={p} />
          </Reveal>
        ))}

        {posts.length === 0 && (
          <p className="text-[0.9rem] text-muted-foreground">
            No posts yet.
          </p>
        )}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Writing on software engineering, development, and technology.',
};
