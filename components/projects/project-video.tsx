'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { youtubeId } from '@/lib/youtube';

// Poster with a play button; the player (mp4 or YouTube) only loads after the click.
export default function ProjectVideo({
  src,
  poster,
  title,
  duration,
  tile,
}: {
  src: string;
  poster?: string;
  title: string;
  duration?: string;
  tile: string;
}) {
  const [playing, setPlaying] = useState(false);
  const yt = youtubeId(src);

  if (playing) {
    return yt ? (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0`}
        title={`${title} walkthrough`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    ) : (
      <video
        src={src}
        poster={poster}
        controls
        autoPlay
        playsInline
        className="absolute inset-0 h-full w-full bg-black object-contain"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group absolute inset-0 flex cursor-pointer items-center justify-center"
      aria-label={`Play ${title} walkthrough${duration ? `, ${duration}` : ''}`}
    >
      {poster && (
        <Image
          src={poster}
          alt=""
          fill
          priority
          sizes="(max-width: 672px) 100vw, 640px"
          className="object-cover"
        />
      )}
      <span className="absolute inset-0 bg-black/10 transition-colors duration-200 group-hover:bg-black/20" />
      <span
        className={cn(
          'relative inline-flex size-14 items-center justify-center rounded-full text-white shadow-lg ring-4 ring-white/30 transition-transform duration-200 ease-out group-hover:scale-110 group-active:scale-95 motion-reduce:transform-none',
          tile
        )}
      >
        <Play className="size-6 translate-x-px fill-current" />
      </span>
      <span className="text-meta absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-black/70 px-2 py-1 text-white backdrop-blur-sm">
        Watch the walkthrough
        {duration && <span className="text-white/70">{duration}</span>}
      </span>
    </button>
  );
}
