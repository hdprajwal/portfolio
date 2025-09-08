'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <header className="bg-transparent backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-flex h-7 w-7 items-center justify-center"
          >
            <Image
              src="/favicon-dark.svg"
              alt="Prajwal HD"
              width={24}
              height={24}
            />
          </span>
          <span className="font-semibold tracking-tight">Prajwal HD</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/about" className="text-sm hover:underline">
            About
          </Link>

          <Link href="/projects" className="text-sm hover:underline">
            Projects
          </Link>
          <Link href="/blog" className="text-sm hover:underline">
            Blog
          </Link>
          {mounted && theme === 'dark' ? (
            <button
              onClick={() => setTheme('light')}
              className="text-sm hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => setTheme('dark')}
              className="text-sm hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
