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
    <section className="grid-row relative overflow-hidden group">
      <div className="px-6 md:px-8 py-24 md:py-28">
        <div className="flex flex-col gap-4 sm:gap-6">
          <BashTyping prompt="whoami" onDone={() => setShowOutput(true)} />
          <div
            className={`transition-all duration-500 font-mono space-y-4 sm:space-y-5 ${
              showOutput
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-1'
            }`}
            aria-hidden={!showOutput}
          >
            <h1 className="text-foreground font-extrabold leading-tight tracking-tight text-[clamp(2rem,7vw,4rem)]">
              Prajwal HD
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Software Engineer • Security Researcher
            </p>
            <p className="max-w-2xl text-base sm:text-lg text-foreground/90">
              I build reliable services with clean APIs and strong observability.
              MS CS @ Purdue Fort Wayne. Security background and practical AI
              experience.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[var(--chip)] text-[var(--chip-fg)] px-3 py-1.5 rounded text-xs border border-[var(--accent)]/20">
                Available Jan 2026
              </span>
              <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1.5 rounded text-xs border border-cyan-500/20">
                Fort Wayne, IN
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <EmailButton email="hdprajwal01@gmail.com" />
              <AboutButton href="/about" />
              <Link
                href="#projects"
                className="inline-flex items-center rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium bg-background hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              >
                View projects
              </Link>
              <CurlChip />
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
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
      className="inline-flex items-center rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-black hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
    >
      Email me
    </Link>
  );
}

function AboutButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium bg-background hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
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
