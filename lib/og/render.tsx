import fs from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

function loadFont(file: string) {
  return fs.readFile(path.join(process.cwd(), 'assets/fonts', file));
}

type OgProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  tags?: string[];
};

function slugifyTag(tag: string) {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export async function renderOgImage({
  kicker,
  title,
  subtitle,
  tags = [],
}: OgProps) {
  const [medium, semiBold, mono] = await Promise.all([
    loadFont('OverusedGrotesk-Medium.otf'),
    loadFont('OverusedGrotesk-SemiBold.otf'),
    loadFont('IBMPlexMono-Regular.ttf'),
  ]);

  let trimmedSubtitle = subtitle;
  if (subtitle && subtitle.length > 150) {
    const cut = subtitle.slice(0, 147);
    const lastSpace = cut.lastIndexOf(' ');
    trimmedSubtitle = `${(lastSpace > 100 ? cut.slice(0, lastSpace) : cut).trimEnd()}...`;
  }

  const titleSize = title.length > 40 ? 55 : title.length > 20 ? 70 : 88;

  const footTags = tags.slice(0, 4).map(slugifyTag);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px 0',
          backgroundColor: '#09090b',
          color: '#fafafa',
          fontFamily: 'Overused Grotesk',
          fontWeight: 500,
        }}
      >
        {kicker ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              fontFamily: 'IBM Plex Mono',
              fontSize: 24,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: '#71717a',
            }}
          >
            <div
              style={{ display: 'flex', width: 16, height: 16, backgroundColor: '#fafafa' }}
            />
            <div style={{ display: 'flex' }}>{kicker}</div>
          </div>
        ) : (
          // Spacer keeps the title block vertically stable without a kicker.
          <div style={{ display: 'flex', height: 31 }} />
        )}

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: titleSize,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {trimmedSubtitle ? (
            <div
              style={{
                display: 'flex',
                fontSize: 30,
                lineHeight: 1.42,
                color: '#a1a1aa',
                maxWidth: 940,
                marginTop: 24,
              }}
            >
              {trimmedSubtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #27272a',
            padding: '26px 0 34px',
            fontFamily: 'IBM Plex Mono',
            fontSize: 23,
            color: '#71717a',
          }}
        >
          <div style={{ display: 'flex' }}>hdprajwal.dev</div>
          {footTags.length > 0 ? (
            <div style={{ display: 'flex', gap: 8 }}>
              {footTags.map((tag, i) => (
                <div key={tag} style={{ display: 'flex', gap: 8 }}>
                  {i > 0 ? <div style={{ display: 'flex' }}>/</div> : null}
                  <div style={{ display: 'flex' }}>{tag}</div>
                </div>
              ))}
            </div>
          ) : null}
          <div style={{ display: 'flex' }}>Prajwal HD</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Overused Grotesk', data: medium, weight: 500 },
        { name: 'Overused Grotesk', data: semiBold, weight: 600 },
        { name: 'IBM Plex Mono', data: mono, weight: 400 },
      ],
    }
  );
}
