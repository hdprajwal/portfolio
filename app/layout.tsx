import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import AnalyticsProvider from '@/components/analytics';
import { baseUrl } from '@/lib/site';

import { Geist, Geist_Mono } from 'next/font/google';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'Prajwal HD | Backend, Platform & Applied AI',
    template: '%s | Prajwal HD',
  },
  description:
    'Software engineer building backend systems, developer tools, and applied AI. Shipped cloud cost infrastructure at Opslyft, published Android malware detection research, and builds tools like QuackCode and Gitwise.',
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: 'Prajwal HD | Backend, Platform & Applied AI',
    description:
      'Software engineer building backend systems, developer tools, and applied AI. Shipped cloud cost infrastructure at Opslyft, published Android malware detection research, and builds tools like QuackCode and Gitwise.',
    url: baseUrl,
    siteName: 'Prajwal HD',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prajwal HD | Backend, Platform & Applied AI',
    description:
      'Software engineer building backend systems, developer tools, and applied AI. Shipped cloud cost infrastructure at Opslyft, published Android malware detection research, and builds tools like QuackCode and Gitwise.',
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.className} ${geistMono.className}`}
    >
      <body className="antialiased">
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
                  jobTitle: 'Software Engineer',
                  alumniOf: [
                    {
                      '@type': 'CollegeOrUniversity',
                      name: 'Purdue University Fort Wayne',
                    },
                  ],
                  knowsAbout: [
                    'Backend Systems',
                    'Platform Engineering',
                    'Developer Tools',
                    'Applied AI',
                    'Cloud Cost Engineering',
                    'Android Malware Detection',
                    'Multi-cloud Infrastructure',
                    'Python',
                    'Go',
                    'TypeScript',
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
