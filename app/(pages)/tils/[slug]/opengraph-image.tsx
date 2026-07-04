import { getTIL } from '@/lib/tils';
import { renderOgImage, OG_SIZE } from '@/lib/og/render';

export const alt = 'TIL by Prajwal HD';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const til = await getTIL(slug);
  if (!til) {
    return renderOgImage({ kicker: 'TIL', title: 'Prajwal HD' });
  }
  return renderOgImage({
    kicker: 'Today I Learned',
    title: til.title,
    subtitle: til.description,
    tags: til.tags,
  });
}
