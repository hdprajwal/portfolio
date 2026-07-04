import { renderOgImage, OG_SIZE } from '@/lib/og/render';

export const alt = 'Resume of Prajwal HD';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return renderOgImage({
    kicker: 'Resume',
    title: 'Prajwal HD',
    subtitle:
      'AI engineer, backend, and full-stack. Opslyft, Purdue research, open source at Translation Commons.',
    tags: ['AI Engineer', 'Backend', 'Full-Stack'],
  });
}
