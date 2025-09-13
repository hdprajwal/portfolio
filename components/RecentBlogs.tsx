import { listPosts } from '@/lib/posts';
import Reveal from '@/components/Reveal';
import BlogCard from '@/components/BlogCard';

export default async function RecentBlogs() {
  const posts = await listPosts();
  const recentPosts = posts.slice(0, 2);

  if (recentPosts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No blog posts found.</p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {recentPosts.map((post, i) => (
        <li key={post.slug}>
          <Reveal delay={i * 80}>
            <BlogCard post={post} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
