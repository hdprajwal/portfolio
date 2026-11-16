import { describe, expect, it } from 'vitest';
import { youtubeId } from '@/lib/youtube';

const ID = 'dQw4w9WgXcQ';

describe('youtubeId', () => {
  it.each([
    `https://www.youtube.com/watch?v=${ID}`,
    `https://www.youtube.com/watch?feature=shared&v=${ID}`,
    `https://m.youtube.com/watch?v=${ID}&t=42s`,
    `https://youtube.com/shorts/${ID}`,
    `https://www.youtube.com/embed/${ID}`,
    `https://www.youtube-nocookie.com/embed/${ID}`,
    `https://www.youtube.com/live/${ID}`,
    `https://youtu.be/${ID}?si=abc`,
  ])('reads the ID from %s', (src) => {
    expect(youtubeId(src)).toBe(ID);
  });

  it.each([
    'https://assets.hdprajwal.dev/projects/emberd.mp4',
    `https://notyoutube.com/watch?v=${ID}`,
    'https://www.youtube.com/watch?v=short',
    'https://www.youtube.com/@channel',
    'not a url',
  ])('returns undefined for %s', (src) => {
    expect(youtubeId(src)).toBeUndefined();
  });
});
