import { renderOgImage, OG_SIZE } from '@/lib/og/render';

export const alt = 'About Prajwal HD';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return renderOgImage({
    kicker: 'About',
    title: 'Prajwal HD',
    subtitle:
      'From cloud cost systems at Opslyft to adversarial ML research at Purdue to building AI agent tooling.',
  });
}
