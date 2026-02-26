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
    default: 'Prajwal',
    template: '%s | Prajwal',
  },
  description: "Prajwal's personal site - projects, writing, and links.",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: 'Prajwal',
    description: "Prajwal's personal site - projects, writing, and links.",
    url: baseUrl,
    siteName: 'Prajwal',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prajwal',
    description: "Prajwal's personal site - projects, writing, and links.",
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
