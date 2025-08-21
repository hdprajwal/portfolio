'use client';

import Link from 'next/link';
import { useState } from 'react';
import BashTyping from './BashTyping';

export default function Hero({ now }: { now: string }) {
  const [showOutput, setShowOutput] = useState(false);
  return (
    <header className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-12 -z-10 bg-gradient-to-b  from-[var(--bg)] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black/10 via-transparent to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 [background:repeating-linear-gradient(90deg,var(--grid)_0_1px,transparent_1px_48px),repeating-linear-gradient(0deg,var(--grid)_0_1px,transparent_1px_48px)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 -z-10 bg-gradient-to-b from-transparent to-[var(--bg)]"
      />

      <div className="container mx-auto max-w-6xl px-4 py-24">
        <div className="flex flex-col gap-4 sm:gap-4">
          <BashTyping prompt="whoami" onDone={() => setShowOutput(true)} />
          <div
            className={`transition-all duration-500 font-mono border-l border-[var(--border)] pl-2 ${
              showOutput
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-1'
            }`}
            aria-hidden={!showOutput}
          >
            <h1 className="bg-gradient-to-r from-[var(--fg)] to-[var(--accent)] bg-clip-text text-transparent font-extrabold leading-tight tracking-tight text-[clamp(2.25rem,8vw,4.75rem)] not-italic normal-case">
              Prajwal
            </h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-[var(--fg)] not-italic">
              Security × AI (Grad Researcher)
            </h2>
            <p className="max-w-3xl text-base sm:text-lg text-[var(--muted-fg)]">
              Software Engineer and Security Researcher focusing on AI, and
              Security. Researching Static malware detection at Purdue Fort
              Wayne.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <EmailButton email="hdprajwal01@gmail.com" />
              <AboutButton href="/about" />
              <Link
                href="#projects"
                className="inline-flex items-center rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium bg-[var(--bg)] hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              >
                View projects
              </Link>
              {/* <SSHChip email="hdprajwal01@gmail.com" /> */}
              <CurlChip />
            </div>
            <div className="mt-2 sm:mt-4 text-sm text-[var(--muted-fg)]">
              It’s <span className="font-mono">{now || '--:--'}</span> for me —
              replies in &lt;24h.
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function EmailButton({ email }: { email: string }) {
  return (
    <Link
      href={`mailto:${email}`}
      className="inline-flex items-center rounded-md bg-[var(--fg)] px-4 py-2 text-sm font-medium text-[var(--bg)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
    >
      Email me
    </Link>
  );
}

function AboutButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium bg-[var(--bg)] hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
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
