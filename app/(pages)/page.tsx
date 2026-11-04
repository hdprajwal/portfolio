import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/section-header';
import RecentBlogs from '@/components/blogs/recent-blogs';
import FeaturedProjects from '@/components/projects/featured-projects';
import Talks from '@/components/talks';
import Stack from '@/components/stack';
import SectionViewTracker from '@/components/section-view-tracker';
import { listRegistryComponents } from '@/lib/registry';

const inlineLink =
  'text-foreground decoration-accent-link hover:decoration-foreground underline underline-offset-4 transition-colors';

export default async function Home() {
  const registryComponents = await listRegistryComponents();

  return (
    <>
      <Hero />
      <SectionViewTracker />
      <div className="space-y-16 px-4 pb-16">
        <section id="now">
          <SectionHeader label="Now" />
          <div className="text-foreground text-body space-y-4">
            <p>
              Open to AI engineer and backend/full-stack roles with end-to-end
              ownership. California, remote, or hybrid.
            </p>
            <p>
              Building{' '}
              <Link
                href="https://emberd.hdprajwal.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground decoration-accent-link hover:decoration-foreground underline underline-offset-4 transition-colors"
              >
                emberd
              </Link>
              , a Firecracker-based sandbox runtime that runs AI-agent code
              inside isolated microVMs. Also maintaining{' '}
              <Link
                href="/projects/quackcode"
                className="text-foreground decoration-accent-link hover:decoration-foreground underline underline-offset-4 transition-colors"
              >
                QuackCode
              </Link>{' '}
              and{' '}
              <Link
                href="/projects/gitwise"
                className="text-foreground decoration-accent-link hover:decoration-foreground underline underline-offset-4 transition-colors"
              >
                Gitwise
              </Link>
              .
            </p>
            <p>
              Reading:{' '}
              <Link
                href="https://a.co/d/050niXpi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground decoration-accent-link hover:decoration-foreground underline underline-offset-4 transition-colors"
              >
                AI Systems Performance Engineering
              </Link>{' '}
              right now, and papers on AI agents.
            </p>
          </div>
        </section>

        <section id="projects">
          <SectionHeader
            label="Projects"
            href="/projects"
            linkLabel="All projects"
          />
          <FeaturedProjects />
        </section>

        <section id="stack">
          <SectionHeader label="Stack" />
          <Stack />
        </section>

        <section id="research">
          <SectionHeader label="Featured work" />
          <div>
            <h3 className="text-foreground text-title text-balance">
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

        <section id="blog">
          <SectionHeader
            label="Writing"
            href="/blog"
            linkLabel="All posts"
          />
          <RecentBlogs />
        </section>

        <section id="components">
          <SectionHeader
            label="Components"
            href="/components"
            linkLabel="All components"
          />
          <div className="-mx-3 space-y-1">
            {registryComponents.map((component) => (
              <Link
                key={component.slug}
                href={`/components/${component.slug}`}
                className="group hover:bg-accent/60 block rounded-md px-3 py-2.5 transition-colors duration-150"
              >
                <span className="flex items-baseline gap-1.5">
                  <span className="text-foreground text-title">
                    {component.name}
                  </span>
                  <ArrowRight className="text-muted-foreground size-3.5 shrink-0 -translate-x-1 opacity-0 transition-[opacity,translate] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:translate-x-0" />
                </span>
                <span className="text-foreground-soft text-subtitle mt-1 block">
                  {component.tagline}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="talks">
          <SectionHeader label="Talks" />
          <Talks />
        </section>

        <section id="contact">
          <SectionHeader label="Get in touch" />
          <p className="text-foreground text-body">
            Open to AI engineer and backend/full-stack roles, California,
            remote, or hybrid. Email is the fastest way to reach me.
          </p>
          <ul className="text-foreground text-body mt-4 space-y-2">
            {[
              {
                label: 'Email',
                value: 'hdprajwal01@gmail.com',
                href: 'mailto:hdprajwal01@gmail.com',
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
                    className="group text-foreground decoration-accent-link hover:decoration-foreground inline-flex items-center underline underline-offset-4 transition-colors"
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
