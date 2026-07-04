import { getPost } from '@/lib/posts';
import { readingMinutes } from '@/lib/reading-time';
import { renderOgImage, OG_SIZE } from '@/lib/og/render';

export const alt = 'Blog post by Prajwal HD';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return renderOgImage({ kicker: 'Blog', title: 'Prajwal HD' });
  }
  return renderOgImage({
    kicker: `Blog / ${readingMinutes(post.content)} min read`,
    title: post.title,
    subtitle: post.summary,
    tags: post.tags,
  });
}
