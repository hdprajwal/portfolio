import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/section-header';
import RecentBlogs from '@/components/blogs/recent-blogs';
import FeaturedProjects from '@/components/projects/featured-projects';
import Talks from '@/components/talks';
import Stack from '@/components/stack';
import SectionViewTracker from '@/components/section-view-tracker';

const inlineLink =
  'text-foreground-strong decoration-accent-link hover:decoration-foreground-strong underline underline-offset-4 transition-colors';

export default function Home() {
  return (
    <>
      <Hero />
      <SectionViewTracker />
      <div className="px-4 pb-16">
        <section id="projects">
          <SectionHeader
            label="Projects"
            href="/projects"
            linkLabel="All projects"
          />
          <FeaturedProjects />
        </section>

        <section id="research" className="mt-24">
          <SectionHeader label="Research" />
          <div>
            <h3 className="text-foreground-strong text-title text-balance">
              Re-Evaluating Android Malware Detection: Tabular Features, Vision
              Models, and Ensembles
            </h3>
            <p className="text-muted-foreground text-meta mt-1">
              Hosahalli Dayananda, P.;{' '}
              <span className="whitespace-nowrap">Chen, Z.</span>
              <span className="whitespace-nowrap">
                <span className="text-muted-foreground/50"> · </span>
                Peer-reviewed, Electronics (MDPI), 2026
              </span>
            </p>
            <p className="text-foreground-soft text-subtitle mt-2 text-pretty">
              Compares tabular features, visual byte-plot images, and ensemble
              strategies for Android malware detection. Evaluates where modality
              choice changes the detection surface and where ensembles actually
              pay for themselves.
            </p>
            <Link
              href="https://doi.org/10.3390/electronics15030544"
              target="_blank"
              rel="noopener noreferrer"
              className={`${inlineLink} text-meta group mt-3 inline-flex items-center gap-1`}
            >
              Read paper
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </section>

        <section id="blog" className="mt-24">
          <SectionHeader label="Writing" href="/blog" linkLabel="All posts" />
          <RecentBlogs />
        </section>

        <section id="stack" className="mt-24">
          <SectionHeader label="Stack" />
          <Stack />
        </section>

        <section id="talks" className="mt-24">
          <SectionHeader label="Talks" />
          <Talks />
        </section>

        <section id="contact" className="mt-24">
          <SectionHeader label="Get in touch" />
          <p className="text-foreground text-body">
            Email is the fastest way to reach me, or you can book a call.
          </p>
          <ul className="text-foreground text-body mt-4 space-y-2">
            {[
              {
                label: 'Email',
                value: 'hdprajwal01@gmail.com',
                href: 'mailto:hdprajwal01@gmail.com',
              },
              {
                label: 'Call',
                value: 'cal.com/hdprajwal/intro',
                href: 'https://cal.com/hdprajwal/intro',
              },
              {
                label: 'LinkedIn',
                value: 'linkedin.com/in/hdprajwal',
                href: 'https://www.linkedin.com/in/hdprajwal',
              },
              {
                label: 'GitHub',
                value: 'github.com/hdprajwal',
                href: 'https://github.com/hdprajwal',
              },
              {
                label: 'X',
                value: 'x.com/_hdprajwal',
                href: 'https://x.com/_hdprajwal',
              },
            ].map(({ label, value, href }) => {
              const external = href.startsWith('http');
              return (
                <li key={label} className="flex items-baseline gap-4">
                  <span className="text-muted-foreground text-meta w-20 shrink-0">
                    {label}
                  </span>
                  <Link
                    href={href}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="group text-foreground-strong decoration-accent-link hover:decoration-foreground-strong inline-flex items-center underline underline-offset-4 transition-colors"
                  >
                    {value}
                    <ArrowUpRight className="ml-1 h-3 w-3 transition-transform duration-200 ease-out group-hover:rotate-45" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </>
  );
}

export const metadata: Metadata = {
  title: {
    absolute: 'Prajwal HD | AI Engineer, Backend & Full-Stack',
  },
  description:
    'AI engineer building agent tooling and applied ML, with three years of backend and full-stack engineering at Opslyft. Peer-reviewed Android malware detection research and ongoing tools like QuackCode and Gitwise.',
  alternates: {
    canonical: '/',
  },
};
