'use client';

import Link from 'next/link';
import Card from './Card';
import SectionHeader from './SectionHeader';

export default function ContactSection() {
  return (
    <section id="contact" className="container mx-auto max-w-6xl px-4 py-16">
      <SectionHeader eyebrow="Contact" title="Say hello" />
      <div className="">
        <Card>
          <p className="text-sm text-[var(--muted-fg)]">
            Open to research collaborations and Security × AI roles (start Dec
            2025).
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="mailto:hdprajwal01@gmail.com"
              className="inline-flex items-center rounded-md bg-[var(--fg)] px-4 py-2 text-sm font-medium text-[var(--bg)] hover:opacity-90"
            >
              Email
            </Link>
            <Link
              href="https://github.com/hdprajwal"
              className="inline-flex items-center rounded-md border border-[var(--border)] px-4 py-2 text-sm hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]"
            >
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/hdprajwal"
              className="inline-flex items-center rounded-md border border-[var(--border)] px-4 py-2 text-sm hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]"
            >
              LinkedIn
            </Link>
            <Link
              href="https://huggingface.co/hdprajwal"
              className="inline-flex items-center rounded-md border border-[var(--border)] px-4 py-2 text-sm hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]"
            >
              Hugging Face
            </Link>
          </div>

          <p className="mt-4 text-xs text-[var(--muted-fg)]/90">
            Prefer email for research chat. Code & models live on GitHub/HF.
          </p>
        </Card>
      </div>
    </section>
  );
}
