import fs from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

// Hero link tile colors (Tailwind v4 violet-400/indigo-600, rose-400/pink-600, amber-400/orange-600).
const hero = {
  violet: '#a684ff',
  indigo: '#4f39f6',
  rose: '#ff637e',
  pink: '#e60076',
  amber: '#ffb900',
  orange: '#f54900',
};

// Theme tokens from app/globals.css (:root and .dark) as hex for Satori; glow alphas are per theme so both stay quiet.
const palettes = {
  light: {
    background: '#ffffff',
    foregroundStrong: '#171717',
    foregroundSoft: '#424242',
    muted: '#5b5b5b',
    border: '#e6e6e6',
    kicker: hero.indigo,
    glow: { violet: '24', rose: '14', amber: '2e' },
  },
  dark: {
    background: '#000000',
    foregroundStrong: '#eeeeee',
    foregroundSoft: '#b7b7b7',
    muted: '#8f8f8f',
    border: '#1a1a1a',
    kicker: hero.violet,
    glow: { violet: '38', rose: '24', amber: '2a' },
  },
};

export type OgTheme = keyof typeof palettes;

function loadFont(file: string) {
  return fs.readFile(path.join(process.cwd(), 'assets/fonts', file));
}

function loadFonts() {
  return Promise.all([
    loadFont('Geist-Regular.ttf'),
    loadFont('Geist-Medium.ttf'),
    loadFont('Geist-SemiBold.ttf'),
  ]).then(([regular, medium, semiBold]) => [
    { name: 'Geist', data: regular, weight: 400 as const },
    { name: 'Geist', data: medium, weight: 500 as const },
    { name: 'Geist', data: semiBold, weight: 600 as const },
  ]);
}

function glowBackground(theme: OgTheme) {
  const { glow } = palettes[theme];
  return `radial-gradient(circle at 100% 0%, ${hero.violet}${glow.violet} 0%, ${hero.violet}00 28%), radial-gradient(circle at 100% 55%, ${hero.rose}${glow.rose} 0%, ${hero.rose}00 22%), radial-gradient(circle at 100% 100%, ${hero.amber}${glow.amber} 0%, ${hero.amber}00 24%)`;
}

type OgProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  theme?: OgTheme;
  // Hides the footer name on cards whose title is already the name.
  hideName?: boolean;
};

export async function renderOgImage({
  kicker,
  title,
  subtitle,
  theme = 'dark',
  hideName = false,
}: OgProps) {
  const colors = palettes[theme];
  const fonts = await loadFonts();

  let trimmedSubtitle = subtitle;
  if (subtitle && subtitle.length > 120) {
    const cut = subtitle.slice(0, 117);
    const lastSpace = cut.lastIndexOf(' ');
    trimmedSubtitle = `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trimEnd()}...`;
  }

  const titleSize = title.length > 40 ? 60 : title.length > 20 ? 76 : 92;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 72px 0',
        backgroundColor: colors.background,
        backgroundImage: glowBackground(theme),
        color: colors.foregroundStrong,
        fontFamily: 'Geist',
        fontWeight: 400,
      }}
    >
      {kicker ? (
        // Site eyebrow role (uppercase, 0.16em tracking, weight 500) in the hero's violet/indigo.
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: 3.5,
            textTransform: 'uppercase',
            color: colors.kicker,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 28,
              height: 4,
              borderRadius: 2,
              backgroundImage: `linear-gradient(90deg, ${hero.violet}, ${hero.rose}, ${hero.amber})`,
            }}
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
            letterSpacing: -0.025 * titleSize,
            lineHeight: 1.1,
            maxWidth: 1000,
            color: colors.foregroundStrong,
          }}
        >
          {title}
        </div>
        {trimmedSubtitle ? (
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              lineHeight: 1.45,
              color: colors.foregroundSoft,
              maxWidth: 900,
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
          borderTop: `1px solid ${colors.border}`,
          padding: '26px 0 34px',
          fontSize: 23,
          color: colors.muted,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontWeight: 500,
            color: colors.foregroundStrong,
          }}
        >
          hdprajwal.dev
        </div>
        {hideName ? null : <div style={{ display: 'flex' }}>Prajwal HD</div>}
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts,
    }
  );
}

// Homepage card: the name as title and the pitch plus what's on the site as one paragraph; no kicker, so a spacer holds the title height.
export async function renderHomeOgImage({
  theme = 'dark',
}: { theme?: OgTheme } = {}) {
  const colors = palettes[theme];
  const fonts = await loadFonts();

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 72px 0',
        backgroundColor: colors.background,
        backgroundImage: glowBackground(theme),
        color: colors.foregroundStrong,
        fontFamily: 'Geist',
        fontWeight: 400,
      }}
    >
      <div style={{ display: 'flex', height: 31 }} />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontSize: 92,
            fontWeight: 600,
            letterSpacing: -2.3,
            lineHeight: 1.1,
          }}
        >
          Prajwal HD
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            lineHeight: 1.45,
            color: colors.foregroundSoft,
            maxWidth: 940,
            marginTop: 24,
          }}
        >
          Hey there. I like building things and sharing what I learn along the
          way. Check out some of what I&apos;ve built and read how it works.
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: `1px solid ${colors.border}`,
          padding: '26px 0 34px',
          fontSize: 23,
          color: colors.muted,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontWeight: 500,
            color: colors.foregroundStrong,
          }}
        >
          hdprajwal.dev
        </div>
      </div>
    </div>,
    { ...OG_SIZE, fonts }
  );
}
