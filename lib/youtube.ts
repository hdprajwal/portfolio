const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'music.youtube.com',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com',
]);
const ID = /^[\w-]{11}$/;

// Video ID from watch, shorts, embed, live, and youtu.be links; undefined for anything else so callers fall back to a native <video>.
export function youtubeId(src: string): string | undefined {
  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return undefined;
  }
  const host = url.hostname.toLowerCase();
  const [first, second] = url.pathname.split('/').filter(Boolean);

  let id: string | null | undefined;
  if (host === 'youtu.be') id = first;
  else if (YOUTUBE_HOSTS.has(host)) {
    if (first === 'watch') id = url.searchParams.get('v');
    else if (['shorts', 'embed', 'live', 'v'].includes(first ?? ''))
      id = second;
  }
  return id && ID.test(id) ? id : undefined;
}
