import { listPosts } from '@/lib/posts';
import BlogCard from '@/components/blogs/blog-card';

export default async function RecentBlogs() {
  const posts = await listPosts();
  const recentPosts = posts.slice(0, 2);

  if (recentPosts.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">No blog posts found.</p>
    );
  }

  return (
    <div>
      {recentPosts.map((post) => (
        <BlogCard post={post} key={post.slug} />
      ))}
    </div>
  );
}
