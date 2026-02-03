import { listPosts } from '@/lib/posts';
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
    <div>
      {recentPosts.map((post, i) => (
        <BlogCard post={post} key={i} />
      ))}
    </div>
  );
}
