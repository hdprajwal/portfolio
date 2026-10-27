import Link from 'next/link';
import Image from 'next/image';
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

export default async function Home() {
  const registryComponents = await listRegistryComponents();

  return (
    <>
      <Hero />
      <SectionViewTracker />
      <div className="space-y-14 px-4 pb-14">
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
          <SectionHeader label="Projects" />
          <FeaturedProjects />
          <Link
            className="group text-muted-foreground hover:text-foreground text-meta mt-4 inline-flex items-center gap-1.5 transition-colors"
            href="/projects"
          >
            All projects{' '}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
          </Link>
        </section>

        <section id="stack">
          <SectionHeader label="Stack" />
          <Stack />
        </section>

        <section id="research">
          <SectionHeader label="Featured work" />
          <div className="">
            <h3 className="text-foreground text-title">
              Re-Evaluating Android Malware Detection: Tabular Features, Vision
              Models, and Ensembles
            </h3>
            <p className="text-muted-foreground text-subtitle mt-1 italic">
              Hosahalli Dayananda, P.; Chen, Z.
            </p>
            <p className="text-muted-foreground text-subtitle mt-2">
              Compares tabular features, visual byte-plot images, and ensemble
              strategies for Android malware detection. Evaluates where modality
              choice changes the detection surface and where ensembles actually
              pay for themselves.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link
                href="https://doi.org/10.3390/electronics15030544"
                target="_blank"
                rel="noopener noreferrer"
                className="text-meta group text-foreground decoration-accent-link hover:decoration-foreground inline-flex items-center gap-1.5 underline underline-offset-4 transition-colors"
              >
                Read paper
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </section>

        <section id="blog">
          <SectionHeader label="Writing" />
          <RecentBlogs />
          <Link
            className="group text-muted-foreground hover:text-foreground text-meta mt-4 inline-flex items-center gap-1.5 transition-colors"
            href="/blog"
          >
            All posts{' '}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
          </Link>
        </section>

        <section id="components">
          <SectionHeader label="Components" />
          <div className="space-y-6">
            {registryComponents.map((component) => (
              <div key={component.slug}>
                <Link
                  href={`/components/${component.slug}`}
                  className="text-foreground text-title hover:underline hover:underline-offset-3"
                >
                  {component.name}
                </Link>
                <p className="text-muted-foreground text-subtitle mt-1">
                  {component.tagline}
                </p>
              </div>
            ))}
          </div>
          <Link
            className="group text-muted-foreground hover:text-foreground text-meta mt-4 inline-flex items-center gap-1.5 transition-colors"
            href="/components"
          >
            All components{' '}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
          </Link>
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
