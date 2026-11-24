import { renderHomeOgImage, OG_SIZE } from '@/lib/og/render';

export const alt = 'Prajwal HD, AI Engineer, Backend and Full-Stack';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return renderHomeOgImage();
}
