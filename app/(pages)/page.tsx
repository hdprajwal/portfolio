'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import ProjectCard from '@/components/ProjectCard';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
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
    <div>
      <Hero now={mounted ? now : ''} />
      <section id="now" className="container mx-auto max-w-6xl px-4 py-12">
        <SectionHeader eyebrow="Now" title="What I'm focused on" />
        <div className="grid gap-6 md:grid-cols-1">
          <Card>
            <h3 className="text-lg font-semibold">
              Thesis - Static Malware Detection Across Modalities
            </h3>
            <p className="text-sm text-[var(--muted-fg)]">
              Static features, PyTorch experiments, and robustness evals.
              Target: Dec ’25.
            </p>
          </Card>
        </div>
        <p className="mt-3 text-xs text-[var(--muted-fg)]">
          Last updated: Aug 2025 •{' '}
          <Link className="underline" href="/now">
            /now
          </Link>
        </p>
      </section>

      <section id="projects" className="container mx-auto max-w-6xl px-4 py-12">
        <SectionHeader eyebrow="Projects" title="A few things I built" />
        <div className="grid gap-6 md:grid-cols-2">
          <ProjectCard
            name="DevAssist AI"
            tagline="AI Pair Programmer"
            flags={['--AI', '--OpenAI', '--Typescript']}
            impact="Helps developers write code faster with AI suggestions"
            codeHref="https://github.com/hdprajwal/DevAssist_AI"
          />
          <ProjectCard
            name="Podcast Creator (HF Space)"
            tagline="Text → podcast using Gemini"
            flags={['--python', '--gradio', '--hf']}
            impact="One-click demo; browser-only sandboxed flow"
            codeHref="https://github.com/hdprajwal"
            liveHref="https://huggingface.co/spaces/hdprajwal/podcast-creator"
          />
        </div>
        <div className="mt-6">
          <Link className="text-sm underline" href="/projects">
            View all Projects →
          </Link>
        </div>
      </section>
      <ContactSection />
      <Footer now={mounted ? now : ''} />
    </div>
  );
}
