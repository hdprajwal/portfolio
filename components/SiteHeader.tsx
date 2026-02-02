'use client';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="grid-row sticky top-0 z-50 bg-background">
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-flex h-7 w-7 items-center justify-center"
          >
            <svg viewBox="0 0 955 414" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_17_13)">
                <path d="M0 389.419V23.9344C0 9.70315 9.69922 0 23.9247 0H214.029C228.255 0 237.954 9.70315 237.954 23.9344V51.1031H259.292C273.518 51.1031 283.217 60.8063 283.217 75.0375V183.713C283.217 197.944 273.518 207.647 259.292 207.647H250.886V228.994C250.886 243.225 241.187 252.928 226.962 252.928H212.09V273.628C212.09 287.859 202.39 297.562 188.165 297.562H84.0599V389.419C84.0599 403.65 74.3607 413.353 60.1352 413.353H23.9247C9.69922 413.353 0 403.65 0 389.419ZM84.0599 219.938H175.233V179.831C175.233 165.6 184.932 155.897 199.157 155.897V77.625H84.0599V219.938ZM334.674 390.066V23.9344C334.674 9.70315 344.373 0 358.599 0H394.809C409.034 0 418.734 9.70315 418.734 23.9344V206.353C420.673 205.706 422.613 205.706 424.553 205.706H439.425V185.006C439.425 170.775 449.125 161.072 463.35 161.072H528.658V23.9344C528.658 9.70315 538.357 0 552.583 0H588.793C603.019 0 612.718 9.70315 612.718 23.9344V390.066C612.718 404.297 603.019 414 588.793 414H552.583C538.357 414 528.658 404.297 528.658 390.066V238.697H476.282V265.866C476.282 280.097 466.583 289.8 452.358 289.8H424.553C422.613 289.8 420.673 289.8 418.734 289.153V390.066C418.734 404.297 409.034 414 394.809 414H358.599C344.373 414 334.674 404.297 334.674 390.066ZM677.557 390.066V23.9344C677.557 9.70315 687.256 0 701.481 0H885.12C899.345 0 909.045 9.70315 909.045 23.9344V51.1031H930.383C944.608 51.1031 954.308 60.8063 954.308 75.0375V300.15C954.308 314.381 944.608 324.084 930.383 324.084H921.977V345.431C921.977 359.663 912.278 369.366 898.052 369.366H883.18V390.066C883.18 404.297 873.481 414 859.255 414H701.481C687.256 414 677.557 404.297 677.557 390.066ZM761.616 336.375H846.323V296.269C846.323 282.038 856.022 272.334 870.248 272.334V77.625H761.616V336.375Z" fill="currentcolor" />
              </g>
            </svg>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/about" className="text-sm transition-colors">
            About
          </Link>
          <Link href="/projects" className="text-sm transition-colors">
            Projects
          </Link>
          <Link href="/blog" className="text-sm transition-colors">
            Blog
          </Link>
          <Link href="/tils" className="text-sm transition-colors">
            TILs
          </Link>
          <div className="w-px h-6 bg-border" />
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-sm hover:underline"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
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
              ) : (
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
              )}
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-sm hover:underline"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
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
              ) : (
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
              )}
            </button>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu - Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg">
          <nav className="flex flex-col gap-1 p-4">
            <Link
              href="/about"
              className="text-sm transition-colors py-2 rounded hover:bg-border/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/projects"
              className="text-sm transition-colors py-2 rounded hover:bg-border/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className="text-sm transition-colors py-2 rounded hover:bg-border/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/tils"
              className="text-sm transition-colors py-2 rounded hover:bg-border/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              TILs
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
