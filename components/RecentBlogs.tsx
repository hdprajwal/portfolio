import Link from 'next/link';
import { listPosts } from '@/lib/posts';
import Card from '@/components/Card';

export default async function RecentBlogs() {
  const posts = await listPosts();
  const recentPosts = posts.slice(0, 2);

  if (recentPosts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No blog posts found.</p>
    );
  }

  return (
    <ul className="space-y-4">
      {recentPosts.map((post) => (
        <li key={post.slug} className="">
          <Link href={`/blog/${post.slug}`} className="block group">
            <Card>
              <h3 className="text-lg font-semibold group-hover:underline">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              {post.summary && (
                <p className="text-sm text-muted-foreground mt-2">{post.summary}</p>
              )}
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
