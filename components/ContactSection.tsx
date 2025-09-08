'use client';

import Link from 'next/link';
import Card from './Card';
import SectionHeader from './SectionHeader';

export default function ContactSection() {
  return (
    <section id="contact" className="container mx-auto max-w-4xl px-4 py-16">
      <SectionHeader eyebrow="Contact" title="Say hello" />
      <div className="">
        <Card>
          <p className="text-sm text-muted-foreground">
            Open to Software and AI Engineer roles (start Jan 2026).
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="mailto:hdprajwal01@gmail.com"
              className="inline-flex items-center rounded-md border border-[var(--border)] px-4 py-2 text-sm hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]"
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

          <p className="mt-4 text-xs text-muted-foreground/90">
            Prefer email for research chat. Code & models live on GitHub/HF.
          </p>
        </Card>
      </div>
    </section>
  );
}
