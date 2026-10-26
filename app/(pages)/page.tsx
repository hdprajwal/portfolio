import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/section-header';
import RecentBlogs from '@/components/blogs/recent-blogs';
import FeaturedProjects from '@/components/projects/featured-projects';
import Talks from '@/components/talks';
import SectionViewTracker from '@/components/section-view-tracker';
import { listRegistryComponents } from '@/lib/registry';

export default async function Home() {
  const registryComponents = await listRegistryComponents();

  return (
    <>
      <Hero />
      <SectionViewTracker />
      <div className="space-y-14 px-4 pb-20">
        <section id="now">
          <SectionHeader label="Now" />
          <div className="text-muted-foreground text-read-14 space-y-4.5">
            <p>
              Open to AI engineer and backend/full-stack roles with end-to-end
              ownership. California, remote, or hybrid.
            </p>
            <p>
              Building{' '}
              <Link
                href="/projects/emberd"
                className="text-foreground decoration-muted-foreground hover:decoration-foreground underline underline-offset-4 transition-colors"
              >
                emberd
              </Link>
              , a Firecracker-based sandbox runtime that runs AI-agent code
              inside isolated microVMs. Also maintaining{' '}
              <Link
                href="/projects/quackcode"
                className="text-foreground decoration-muted-foreground hover:decoration-foreground underline underline-offset-4 transition-colors"
              >
                QuackCode
              </Link>{' '}
              and{' '}
              <Link
                href="/projects/gitwise"
                className="text-foreground decoration-muted-foreground hover:decoration-foreground underline underline-offset-4 transition-colors"
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
                className="text-foreground decoration-muted-foreground hover:decoration-foreground underline underline-offset-4 transition-colors"
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
            className="group text-muted-foreground hover:text-foreground text-label-13-mono mt-4.5 inline-flex items-center gap-1.5 transition-colors"
            href="/projects"
          >
            All projects{' '}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
          </Link>
        </section>

        <section id="research">
          <SectionHeader label="Featured work" />
          <div className="">
            <h3 className="text-foreground text-title-15">
              Re-Evaluating Android Malware Detection: Tabular Features, Vision
              Models, and Ensembles
            </h3>
            <p className="text-muted-foreground text-read-13 mt-1 italic">
              Hosahalli Dayananda, P.; Chen, Z.
            </p>
            <p className="text-muted-foreground text-read-13 mt-2.5">
              Compares tabular features, visual byte-plot images, and ensemble
              strategies for Android malware detection. Evaluates where modality
              choice changes the detection surface and where ensembles actually
              pay for themselves.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link
                href="https://doi.org/10.3390/electronics15030544"
                target="_blank"
                rel="noopener noreferrer"
                className="text-label-13-mono group text-foreground decoration-muted-foreground hover:decoration-foreground inline-flex items-center gap-1.5 underline underline-offset-4 transition-colors"
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
            className="group text-muted-foreground hover:text-foreground text-label-13-mono mt-4.5 inline-flex items-center gap-1.5 transition-colors"
            href="/blog"
          >
            All posts{' '}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
          </Link>
        </section>

        <section id="components">
          <SectionHeader label="Components" />
          <div className="space-y-5.5">
            {registryComponents.map((component) => (
              <div key={component.slug}>
                <Link
                  href={`/components/${component.slug}`}
                  className="text-foreground text-title-14 hover:underline hover:underline-offset-3"
                >
                  {component.name}
                </Link>
                <p className="text-muted-foreground text-read-13 mt-1">
                  {component.tagline}
                </p>
              </div>
            ))}
          </div>
          <Link
            className="group text-muted-foreground hover:text-foreground text-label-13-mono mt-4.5 inline-flex items-center gap-1.5 transition-colors"
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
          <p className="text-muted-foreground text-read-14 max-w-xl">
            Open to AI engineer and backend/full-stack roles, California,
            remote, or hybrid. Email is the fastest way to reach me.
          </p>
          <ul className="text-muted-foreground text-read-14 mt-4 max-w-xl space-y-1.5">
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
              { label: 'Resume', value: '/resume', href: '/resume' },
            ].map(({ label, value, href }) => {
              const external = href.startsWith('http');
              return (
                <li key={label} className="flex items-baseline gap-3.5">
                  <span className="text-muted-foreground text-label-11-mono w-17 shrink-0">
                    {label}
                  </span>
                  <Link
                    href={href}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="group text-foreground decoration-muted-foreground hover:decoration-foreground inline-flex items-center underline underline-offset-4 transition-colors"
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
