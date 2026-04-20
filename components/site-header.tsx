'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun, Menu, X, Search, Mail, ArrowUpRight } from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';
import LinkedinIcon from '@/components/icons/LinkedinIcon';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/tils', label: 'TILs' },
];

function triggerCommandMenu() {
  if (typeof window === 'undefined') return;
  document.dispatchEvent(
    new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true,
    })
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="text-muted-foreground hover:text-foreground inline-flex h-7 w-7 items-center justify-center transition-colors"
      aria-label="Toggle theme"
    >
      {!mounted ? (
        <span className="inline-block h-3.5 w-3.5" aria-hidden />
      ) : resolvedTheme === 'dark' ? (
        <Sun className="h-3.5 w-3.5" />
      ) : (
        <Moon className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

function CommandKButton({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <button
        type="button"
        onClick={triggerCommandMenu}
        className="text-muted-foreground hover:text-foreground inline-flex h-7 w-7 items-center justify-center transition-colors"
        aria-label="Open command menu"
      >
        <Search className="h-3.5 w-3.5" />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={triggerCommandMenu}
      className="border-border text-muted-foreground hover:border-foreground hover:text-foreground inline-flex items-center gap-1.5 rounded-sm border px-1.5 py-0.5 font-mono text-[10px] tracking-wider transition-colors"
      aria-label="Open command menu"
    >
      <Search className="h-3 w-3" />
      <span aria-hidden>⌘K</span>
    </button>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-background/90 border-border sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          aria-label="Go to home page"
          className="group inline-flex items-center gap-2"
        >
          <span
            aria-hidden
            className="text-foreground inline-flex h-6 w-6 items-center justify-center"
          >
            <svg
              viewBox="0 0 955 414"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_17_13)">
                <path
                  d="M0 389.419V23.9344C0 9.70315 9.69922 0 23.9247 0H214.029C228.255 0 237.954 9.70315 237.954 23.9344V51.1031H259.292C273.518 51.1031 283.217 60.8063 283.217 75.0375V183.713C283.217 197.944 273.518 207.647 259.292 207.647H250.886V228.994C250.886 243.225 241.187 252.928 226.962 252.928H212.09V273.628C212.09 287.859 202.39 297.562 188.165 297.562H84.0599V389.419C84.0599 403.65 74.3607 413.353 60.1352 413.353H23.9247C9.69922 413.353 0 403.65 0 389.419ZM84.0599 219.938H175.233V179.831C175.233 165.6 184.932 155.897 199.157 155.897V77.625H84.0599V219.938ZM334.674 390.066V23.9344C334.674 9.70315 344.373 0 358.599 0H394.809C409.034 0 418.734 9.70315 418.734 23.9344V206.353C420.673 205.706 422.613 205.706 424.553 205.706H439.425V185.006C439.425 170.775 449.125 161.072 463.35 161.072H528.658V23.9344C528.658 9.70315 538.357 0 552.583 0H588.793C603.019 0 612.718 9.70315 612.718 23.9344V390.066C612.718 404.297 603.019 414 588.793 414H552.583C538.357 414 528.658 404.297 528.658 390.066V238.697H476.282V265.866C476.282 280.097 466.583 289.8 452.358 289.8H424.553C422.613 289.8 420.673 289.8 418.734 289.153V390.066C418.734 404.297 409.034 414 394.809 414H358.599C344.373 414 334.674 404.297 334.674 390.066ZM677.557 390.066V23.9344C677.557 9.70315 687.256 0 701.481 0H885.12C899.345 0 909.045 9.70315 909.045 23.9344V51.1031H930.383C944.608 51.1031 954.308 60.8063 954.308 75.0375V300.15C954.308 314.381 944.608 324.084 930.383 324.084H921.977V345.431C921.977 359.663 912.278 369.366 898.052 369.366H883.18V390.066C883.18 404.297 873.481 414 859.255 414H701.481C687.256 414 677.557 404.297 677.557 390.066ZM761.616 336.375H846.323V296.269C846.323 282.038 856.022 272.334 870.248 272.334V77.625H761.616V336.375Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </span>
          <span className="text-muted-foreground group-hover:text-foreground hidden font-mono text-xs tracking-tight transition-colors sm:inline">
            hdprajwal<span className="text-muted-foreground/50">.dev</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center md:flex">
          <div className="flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={href}
                  href={href}
                  aria-label={`Go to ${label} page`}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-2.5 py-1 font-mono text-sm tracking-wide transition-colors ${
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isActive && (
                    <span className="bg-foreground absolute right-2.5 bottom-0 left-2.5 h-px" />
                  )}
                  {label}
                </Link>
              );
            })}
          </div>
          <span className="bg-border mx-2 h-4 w-px" />
          <div className="flex items-center gap-1.5">
            <CommandKButton />
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <CommandKButton compact />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            className="text-muted-foreground hover:text-foreground inline-flex h-7 w-7 items-center justify-center transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav"
          className="border-border bg-background/95 border-t backdrop-blur-md md:hidden"
        >
          <nav className="flex flex-col px-4 py-3">
            {navLinks.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`border-border/40 flex items-baseline justify-between border-b py-2.5 font-mono text-sm tracking-wide transition-colors last:border-b-0 ${
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="inline-flex items-center gap-2">
                    {label}
                  </span>
                  {isActive && (
                    <span className="bg-foreground h-1 w-1 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="border-border/40 border-t px-4 py-3">
            <div className="text-muted-foreground/60 mb-2 font-mono text-[10px] tracking-wider uppercase">
              Reach me
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="mailto:hdprajwal01@gmail.com"
                onClick={() => setIsMobileMenuOpen(false)}
                className="border-border text-muted-foreground hover:border-foreground hover:text-foreground inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-xs transition-colors"
              >
                <Mail className="h-3 w-3" />
                Email
              </Link>
              <Link
                href="https://www.linkedin.com/in/hdprajwal"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="border-border text-muted-foreground hover:border-foreground hover:text-foreground inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-xs transition-colors"
              >
                <LinkedinIcon className="h-3 w-3" />
                LinkedIn
                <ArrowUpRight className="h-3 w-3" />
              </Link>
              <Link
                href="https://github.com/hdprajwal"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="border-border text-muted-foreground hover:border-foreground hover:text-foreground inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-xs transition-colors"
              >
                <GithubIcon className="h-3 w-3" />
                GitHub
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="border-border/40 border-t px-4 py-3">
            <p className="text-muted-foreground font-mono text-[10px] tracking-wider">
              California, USA
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
