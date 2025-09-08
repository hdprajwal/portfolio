'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import BashTyping from './BashTyping';

export default function Hero() {
  const [showOutput, setShowOutput] = useState(false);
  const [now, setNow] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fmt = new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Indiana/Indianapolis',
    });
    const update = () => setNow(fmt.format(new Date()));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-12 -z-10 bg-gradient-to-b  from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black/10 via-transparent to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 [background:repeating-linear-gradient(90deg,var(--foreground)_0_1px,transparent_1px_48px),repeating-linear-gradient(0deg,var(--foreground)_0_1px,transparent_1px_48px)] opacity-[0.08]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 -z-10 bg-gradient-to-b from-transparent to-background"
      />

      <div className="container mx-auto max-w-4xl px-6 md:px-8 py-32 md:py-40">
        <div className="flex flex-col gap-6 sm:gap-8">
          <BashTyping prompt="whoami" onDone={() => setShowOutput(true)} />
          <div
            className={`transition-all duration-500 font-mono border-l border-[var(--border)] pl-3 md:pl-4 space-y-5 sm:space-y-6 ${
              showOutput
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-1'
            }`}
            aria-hidden={!showOutput}
          >
            <h1 className="text-foreground bg-clip-text font-extrabold leading-tight tracking-tight text-[clamp(2.25rem,8vw,4.75rem)] not-italic normal-case">
              Prajwal HD
            </h1>
            <h2 className="text-xl sm:text-3xl font-semibold text-foreground not-italic">
              Software Engineer
            </h2>
            <p className="max-w-2xl text-base sm:text-lg text-muted-fg">
              I build reliable services with clean APIs and strong observability.
              MS CS @ Purdue Fort Wayne. Security background and practical AI
              experience.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <EmailButton email="hdprajwal01@gmail.com" />
              <AboutButton href="/about" />
              <Link
                href="#projects"
                className="inline-flex items-center rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium bg-background hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              >
                View projects
              </Link>
              <CurlChip />
            </div>
            <div className="text-sm text-muted-foreground">
              It's <span className="font-mono">{mounted ? now : '--:--'}</span> for me —
              replies in &lt;24h.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmailButton({ email }: { email: string }) {
  return (
    <Link
      href={`mailto:${email}`}
      className="inline-flex items-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
    >
      Email me
    </Link>
  );
}

function AboutButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium bg-background hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
    >
      About me
    </Link>
  );
}

function SSHChip({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className="inline-flex items-center rounded-md bg-[var(--chip)] px-3 py-1.5 font-mono text-xs text-[var(--chip-fg)] ring-1 ring-inset ring-[var(--border)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
      aria-label="Copy email to clipboard"
    >
      {copied ? 'copied ✔' : `ssh hdprajwal01@gmail.com`}
    </button>
  );
}

function CurlChip() {
  const cmd =
    'curl -L https://hdprajwal.dev/resume.pdf -o Prajwal_HD_Resume.pdf';
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(cmd);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className="inline-flex items-center rounded-md bg-[var(--chip)] px-3 py-1.5 font-mono text-[11px] text-[var(--chip-fg)] ring-1 ring-inset ring-[var(--border)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
      aria-label="Copy curl command for resume"
    >
      {copied ? 'copied ✔' : 'curl resume'}
    </button>
  );
}
