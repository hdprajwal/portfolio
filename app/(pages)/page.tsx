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
    <div>
      <Hero />
      <section id="now" className="container mx-auto max-w-4xl px-4 py-12">
        <SectionHeader eyebrow="Now" title="What I'm focused on" />
        <div className="grid gap-6 md:grid-cols-1">
          <Card>
            <h3 className="text-lg font-semibold">
              Thesis - Static Malware Detection Across Modalities
            </h3>
            <p className="text-sm text-muted-foreground">
              Static features, PyTorch experiments, and robustness evals.
              Target: Dec '25.
            </p>
          </Card>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Last updated: Aug 2025 •{' '}
          <Link className="underline" href="/now">
            /now
          </Link>
        </p>
      </section>

      <section id="projects" className="container mx-auto max-w-4xl px-4 py-12">
        <SectionHeader eyebrow="Projects" title="A few things I built" />
        <div className="grid gap-6 md:grid-cols-2">
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
            tags={['python', 'gradio', 'hf']}
            impact="One-click demo; browser-only sandboxed flow"
            codeHref="https://github.com/hdprajwal"
            liveHref="https://huggingface.co/spaces/hdprajwal/podcast-creator"
          />
          </Reveal>
        </div>
        <div className="mt-6">
          <Link className="text-sm underline" href="/projects">
            View all Projects →
          </Link>
        </div>
      </section>

      <section id="blog" className="container mx-auto max-w-4xl px-4 py-12">
        <SectionHeader eyebrow="Writing" title="Recent blogs" />
        <RecentBlogs />
        <div className="mt-6">
          <Link className="text-sm underline" href="/blog">
            View all blogs →
          </Link>
        </div>
      </section>
      <ContactSection />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Home',
};
