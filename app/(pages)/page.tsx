import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/section-header';
import RecentBlogs from '@/components/blogs/recent-blogs';
import FeaturedProjects from '@/components/projects/featured-projects';
import Talks from '@/components/talks';

export default async function Home() {
  return (
    <>
      <Hero />
      <div className="space-y-14 px-4 pb-20 md:space-y-20">
        <section id="now">
          <SectionHeader label="Now" />
          <div className="text-muted-foreground text-sm leading-relaxed">
            <p>
              Open to AI engineer and backend/full-stack roles with end-to-end
              ownership. California, remote, or hybrid.
            </p>
            <p>
              Building{' '}
              <Link
                href="/projects/emberd"
                className="hover:text-foreground underline underline-offset-2 transition-colors"
              >
                emberd
              </Link>
              , a Firecracker-based sandbox runtime that runs AI-agent code
              inside isolated microVMs. Also maintaining{' '}
              <Link
                href="/projects/quackcode"
                className="hover:text-foreground underline underline-offset-2 transition-colors"
              >
                QuackCode
              </Link>{' '}
              and{' '}
              <Link
                href="/projects/gitwise"
                className="hover:text-foreground underline underline-offset-2 transition-colors"
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
                className="hover:text-foreground underline underline-offset-2 transition-colors"
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
            className="text-muted-foreground hover:text-foreground mt-6 inline-flex items-center gap-2 text-sm transition-colors"
            href="/projects"
          >
            All projects{' '}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </section>

        <section id="research">
          <SectionHeader label="Featured work" />
          <div className="grid gap-6 sm:grid-cols-2 sm:items-start">
            <div className="">
              <div className="border-border relative aspect-video w-full overflow-hidden rounded-lg border">
                <Image
                  src="https://assets.hdprajwal.dev/images/research-malware-thumbnail.png"
                  alt="Android malware detection research"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="">
              <h3 className="text-foreground text-base font-semibold tracking-tight md:text-lg">
                Re-Evaluating Android Malware Detection: Tabular Features,
                Vision Models, and Ensembles
              </h3>
              <p className="text-muted-foreground mt-1 text-xs italic">
                Hosahalli Dayananda, P.; Chen, Z.
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                Compares tabular features, visual byte-plot images, and ensemble
                strategies for Android malware detection. Evaluates where
                modality choice changes the detection surface and where
                ensembles actually pay for themselves.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                <Link
                  href="https://doi.org/10.3390/electronics15030544"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground group inline-flex items-center gap-1 text-sm font-medium"
                >
                  Read paper
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="blog">
          <SectionHeader label="Writing" />
          <RecentBlogs />
          <Link
            className="text-muted-foreground hover:text-foreground mt-6 inline-flex items-center gap-2 text-sm transition-colors"
            href="/blog"
          >
            All posts{' '}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </section>

        <section id="talks">
          <SectionHeader label="Talks" />
          <Talks />
        </section>

        <section id="contact">
          <SectionHeader label="Get in touch" />
          <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
            Open to AI engineer and backend/full-stack roles, California,
            remote, or hybrid. Email is the fastest way to reach me.
          </p>
          <ul className="text-muted-foreground mt-5 max-w-xl space-y-2 text-base leading-relaxed">
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
                <li key={label} className="flex items-baseline gap-3">
                  <span className="text-muted-foreground/50 w-16 shrink-0 font-mono text-2xs">
                    {label}
                  </span>
                  <Link
                    href={href}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="group hover:text-foreground inline-flex items-center underline underline-offset-2 transition-colors"
                  >
                    {value}
                    <ArrowUpRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:rotate-45" />
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
