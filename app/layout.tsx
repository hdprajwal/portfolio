import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import AnalyticsProvider from '@/components/analytics';
import { baseUrl } from '@/lib/site';

import { IBM_Plex_Mono } from 'next/font/google';

// Sans/display is Overused Grotesk, loaded via @font-face in globals.css from
// the assets CDN. IBM Plex Mono is self-hosted through next/font and exposed as
// the --font-mono variable.
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Prajwal HD | AI Engineer, Backend & Full-Stack',
    template: '%s | Prajwal HD',
  },
  description:
    'AI engineer building agent tooling and applied ML, with three years of backend and full-stack engineering at Opslyft. Peer-reviewed Android malware detection research and open-source tools like QuackCode and Gitwise.',
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: 'Prajwal HD | AI Engineer, Backend & Full-Stack',
    description:
      'AI engineer building agent tooling and applied ML, with three years of backend and full-stack engineering at Opslyft. Peer-reviewed Android malware detection research and open-source tools like QuackCode and Gitwise.',
    url: baseUrl,
    siteName: 'Prajwal HD',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prajwal HD | AI Engineer, Backend & Full-Stack',
    description:
      'AI engineer building agent tooling and applied ML, with three years of backend and full-stack engineering at Opslyft. Peer-reviewed Android malware detection research and open-source tools like QuackCode and Gitwise.',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', sizes: '64x64', type: 'image/x-icon' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
    other: [],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={ibmPlexMono.variable}>
      <body className="antialiased">
        <link
          rel="preconnect"
          href="https://assets.hdprajwal.dev"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://assets.hdprajwal.dev/fonts/OverusedGrotesk-VF.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Prajwal HD, Blog RSS Feed"
          href="/rss.xml"
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': `${baseUrl}/#website`,
                  url: baseUrl,
                  name: 'Prajwal HD',
                  description:
                    'Portfolio, projects, writing, and resume of Prajwal HD.',
                  inLanguage: 'en-US',
                },
                {
                  '@type': 'Person',
                  '@id': `${baseUrl}/#person`,
                  name: 'Prajwal HD',
                  url: baseUrl,
                  jobTitle: 'AI Engineer',
                  alumniOf: [
                    {
                      '@type': 'CollegeOrUniversity',
                      name: 'Purdue University Fort Wayne',
                    },
                  ],
                  knowsAbout: [
                    'Applied AI',
                    'AI Agents',
                    'Developer Tools',
                    'Backend Systems',
                    'Full-Stack Development',
                    'Android Malware Detection',
                    'Platform Engineering',
                    'Cloud Cost Engineering',
                    'Multi-cloud Infrastructure',
                    'Python',
                    'TypeScript',
                    'Go',
                  ],
                  sameAs: [
                    'https://github.com/hdprajwal',
                    'https://www.linkedin.com/in/hdprajwal',
                    'https://x.com/_hdprajwal',
                  ],
                },
              ],
            }),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <AnalyticsProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
