'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState, useSyncExternalStore } from 'react';
import {
  Moon,
  Sun,
  Menu,
  X,
  Search,
  Mail,
  ArrowUpRight,
  CalendarDays,
} from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';
import LinkedinIcon from '@/components/icons/LinkedinIcon';
import { ViewTransition } from '@/components/view-transition';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/resume', label: 'Resume' },
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

const emptySubscribe = () => () => {};

// True only after hydration, so the theme icon never mismatches the server render.
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="text-muted-foreground hover:text-foreground inline-flex h-7 w-7 items-center justify-center transition-[color,scale] duration-160 ease-out active:scale-[0.97]"
      aria-label="Toggle theme"
    >
      <span aria-hidden className="relative inline-block h-3.5 w-3.5">
        <Sun
          className={cn(
            'absolute inset-0 h-3.5 w-3.5 transition-[opacity,rotate,scale] duration-200 ease-out motion-reduce:transition-[opacity]',
            mounted && resolvedTheme === 'dark'
              ? 'scale-100 rotate-0 opacity-100'
              : 'scale-90 -rotate-90 opacity-0'
          )}
        />
        <Moon
          className={cn(
            'absolute inset-0 h-3.5 w-3.5 transition-[opacity,rotate,scale] duration-200 ease-out motion-reduce:transition-[opacity]',
            mounted && resolvedTheme !== 'dark'
              ? 'scale-100 rotate-0 opacity-100'
              : 'scale-90 rotate-90 opacity-0'
          )}
        />
      </span>
    </button>
  );
}

function CommandKButton({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <button
        type="button"
        onClick={triggerCommandMenu}
        className="text-muted-foreground hover:text-foreground inline-flex h-7 w-7 items-center justify-center transition-[color,scale] duration-160 ease-out active:scale-[0.97]"
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
      className="border-border text-muted-foreground hover:border-foreground hover:text-foreground text-meta inline-flex items-center gap-1.5 rounded-md border px-1.5 py-0.5 transition-[color,border-color,scale] duration-160 ease-out active:scale-[0.97]"
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
  const [menuPathname, setMenuPathname] = useState(pathname);

  // Close the drawer on navigation, including routes reached via the command menu.
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isMobileMenuOpen]);

  return (
    <header className="relative z-50">
      <div className="flex items-center justify-between px-4 pt-6 pb-2">
        <Link
          href="/"
          aria-label="Go to home page"
          className="text-foreground-strong text-title hover:text-foreground-soft transition-colors"
        >
          Prajwal HD
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
                  className={`text-meta relative rounded-md px-2.5 py-1 transition-colors ${
                    isActive
                      ? 'text-foreground-strong'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isActive && (
                    <ViewTransition name="nav-active-pill">
                      <span
                        aria-hidden
                        className="bg-accent absolute inset-0 -z-10 rounded-md"
                      />
                    </ViewTransition>
                  )}
                  {/* Own transition layer so the label stays above the sliding pill mid-animation. */}
                  <ViewTransition name={`nav-label-${label.toLowerCase()}`}>
                    <span className="inline-block">{label}</span>
                  </ViewTransition>
                </Link>
              );
            })}
          </div>
          <span className="bg-border mx-2 h-4 w-px" />
          <div className="flex items-center gap-1.5">
            <Link
              href="https://cal.com/hdprajwal/intro"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border text-foreground-strong hover:border-foreground text-meta rounded-md border px-2.5 py-0.5 transition-[border-color,scale] duration-160 ease-out active:scale-[0.97]"
            >
              Book a call
            </Link>
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
            className="text-muted-foreground hover:text-foreground inline-flex h-7 w-7 items-center justify-center transition-[color,scale] duration-160 ease-out active:scale-[0.97]"
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

      {/* Mobile drawer: stays mounted and rides allow-discrete on display so it unfolds from the header bar on the way out as well as in. */}
      <div
        id="mobile-nav"
        className={`border-border bg-background/95 border-t backdrop-blur-md transition-[opacity,translate,display] transition-discrete duration-200 ease-out motion-reduce:translate-y-0 md:hidden starting:-translate-y-2 starting:opacity-0 motion-reduce:starting:translate-y-0 ${
          isMobileMenuOpen
            ? 'block translate-y-0 opacity-100'
            : 'hidden -translate-y-2 opacity-0'
        }`}
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
                className={`border-border/40 text-meta flex items-baseline justify-between border-b py-2.5 transition-colors last:border-b-0 ${
                  isActive
                    ? 'text-foreground-strong'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="inline-flex items-center gap-2">{label}</span>
                {isActive && (
                  <span className="bg-foreground h-1 w-1 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-border/40 border-t px-4 py-3">
          <div className="text-muted-foreground text-eyebrow mb-2">
            Reach me
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="mailto:hdprajwal01@gmail.com"
              onClick={() => setIsMobileMenuOpen(false)}
              className="border-border text-muted-foreground hover:border-foreground hover:text-foreground text-meta inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 transition-[color,border-color,scale] duration-160 ease-out active:scale-[0.97]"
            >
              <Mail className="h-3 w-3" />
              Email
            </Link>
            <Link
              href="https://cal.com/hdprajwal/intro"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="border-border text-muted-foreground hover:border-foreground hover:text-foreground text-meta inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 transition-[color,border-color,scale] duration-160 ease-out active:scale-[0.97]"
            >
              <CalendarDays className="h-3 w-3" />
              Book a call
              <ArrowUpRight className="h-3 w-3" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/hdprajwal"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="border-border text-muted-foreground hover:border-foreground hover:text-foreground text-meta inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 transition-[color,border-color,scale] duration-160 ease-out active:scale-[0.97]"
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
              className="border-border text-muted-foreground hover:border-foreground hover:text-foreground text-meta inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 transition-[color,border-color,scale] duration-160 ease-out active:scale-[0.97]"
            >
              <GithubIcon className="h-3 w-3" />
              GitHub
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        <div className="border-border/40 border-t px-4 py-3">
          <p className="text-muted-foreground text-eyebrow">California, USA</p>
        </div>
      </div>
    </header>
  );
}
