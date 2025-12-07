import Link from 'next/link';
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import ContactSection from '@/components/ContactSection';
import RecentBlogs from '@/components/RecentBlogs';

export default async function Home() {
  return (
    <>
      <Hero />

      <section id="now">
        <div className='grid-row'>
          <SectionHeader eyebrow="Now" title="What I'm focused on" />
        </div>
        <div className="grid-row p-6">
          <div>
            <h3 className="text-base font-semibold mb-2">
              Thesis - Static Malware Detection Across Modalities
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Static features, PyTorch experiments, and robustness evals.
              Target: Dec '25.
            </p>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Last updated: Aug 2025 •{' '}
            <Link className="underline hover:text-[var(--accent)] transition-colors" href="/now">
              /now
            </Link>
          </p>
        </div>
        </section>

        <section id="projects">
          <div className="grid-row">
            <SectionHeader eyebrow="Projects" title="A few things I built" />
          </div>
          <Reveal>
            <ProjectCard
              name="DevAssist AI"
              tagline="AI Pair Programmer"
              tags={['AI Agents', 'OpenAI', 'Gemini', 'VS Code Extension']}
              impact="Helps developers write code faster with AI suggestions"
              codeHref="https://github.com/hdprajwal/DevAssist_AI"
            />
          </Reveal>
          <Reveal delay={80}>
            <ProjectCard
              name="Podcast Creator (HF Space)"
              tagline="Text to podcast using Gemini"
              tags={['Audio/ML', 'Gradio', 'HuggingFace']}
              impact="One-click demo; browser-only sandboxed flow"
              codeHref="https://github.com/hdprajwal"
              liveHref="https://huggingface.co/spaces/hdprajwal/podcast-creator"
            />
          </Reveal>
          <div className="grid-row p-6">
            <Link className="text-sm text-muted-foreground hover:text-[var(--accent)] transition-colors underline" href="/projects">
              View all Projects →
            </Link>
          </div>
        </section>

        <section id="blog">
          <div className="grid-row">
            <SectionHeader eyebrow="Writing" title="Recent blogs" />
          </div>
          <RecentBlogs />
          <div className="grid-row p-6">
            <Link className="text-sm text-muted-foreground hover:text-[var(--accent)] transition-colors underline" href="/blog">
              View all blogs →
            </Link>
          </div>
        </section>

      <ContactSection />
    </>
  );
}

export const metadata: Metadata = {
  title: 'Home',
};
