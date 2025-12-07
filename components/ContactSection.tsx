'use client';

import Link from 'next/link';
import Card from './Card';
import SectionHeader from './SectionHeader';

export default function ContactSection() {
  return (
    <section id="contact" className="grid-row p-0 grid grid-cols-3 divide-x divide-[var(--border)]">
      <Link
        href="mailto:hdprajwal01@gmail.com"
        className="p-4 text-center text-xs hover:text-[var(--accent)] hover:bg-white/5 transition-colors uppercase tracking-wider"
      >
        Email
      </Link>
      <Link
        href="https://github.com/hdprajwal"
        className="p-4 text-center text-xs hover:text-[var(--accent)] hover:bg-white/5 transition-colors uppercase tracking-wider"
      >
        GitHub
      </Link>
      <Link
        href="https://www.linkedin.com/in/hdprajwal"
        className="p-4 text-center text-xs hover:text-[var(--accent)] hover:bg-white/5 transition-colors uppercase tracking-wider"
      >
        LinkedIn
      </Link>
    </section>
  );
}
