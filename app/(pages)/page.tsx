import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/section-header';
import RecentBlogs from '@/components/blogs/recent-blogs';
import FeaturedProjects from '@/components/projects/featured-projects';

export default async function Home() {
  return (
    <>
      <Hero />
      <div className="space-y-14 px-4 pb-20 md:space-y-20">
        <section id="now">
          <SectionHeader label="Now" />
          <p className="text-muted-foreground/70 mb-3 font-mono text-[11px] tracking-wider uppercase">
            Updated April 2026
          </p>
          <ul className="text-muted-foreground space-y-2 text-sm leading-relaxed">
            <li>
              Looking for backend, platform, and applied AI roles with
              end-to-end ownership. California, remote, or hybrid.
            </li>
            <li>
              Building{' '}
              <Link
                href="/projects/quackcode"
                className="hover:text-foreground underline underline-offset-2 transition-colors"
              >
                QuackCode
              </Link>
              , a Linux-first desktop agent, and{' '}
              <Link
                href="/projects/gitwise"
                className="hover:text-foreground underline underline-offset-2 transition-colors"
              >
                Gitwise
              </Link>
              , a CLI that writes commit messages from staged diffs.
            </li>
            <li>
              Stress-testing agent workflows on real codebases: tool use, git
              safety, isolation, and recovery when the model gets it wrong.
            </li>
            <li>
              Reading: Designing Data-Intensive Applications (re-read), papers
              on LLM tool use evaluation.
            </li>
          </ul>
        </section>

        <section id="research">
          <SectionHeader label="Featured work" />
          <div className="grid gap-6 sm:grid-cols-2 sm:items-start">
            <div className="">
              <div className="border-border relative aspect-video w-full overflow-hidden rounded-md border">
                <Image
                  src="https://assets.hdprajwal.dev/images/research-malware-thumbnail.png"
                  alt="Android malware detection research"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="">
              <div className="flex flex-wrap items-center gap-2">
                <span className="border-border text-muted-foreground inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-[10px] tracking-wider uppercase">
                  Peer-reviewed
                </span>
                <span className="text-muted-foreground/60 font-mono text-[10px] tracking-wider uppercase">
                  MDPI Electronics &middot; 2026
                </span>
              </div>
              <h3 className="text-foreground mt-2 text-base font-semibold tracking-tight md:text-lg">
                Re-Evaluating Android Malware Detection: Tabular Features,
                Vision Models, and Ensembles
              </h3>
              <p className="text-muted-foreground mt-1 text-xs italic">
                Hosahalli Dayananda, P.; Chen, Z.
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                Compares tabular static features, vision-based byte-plot models,
                and ensemble strategies for Android malware classification.
                Evaluates where modality choice changes the detection surface
                and where ensembles actually pay for themselves.
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
          <div className="divide-border divide-y">
            <div className="py-4 first:pt-0">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-foreground text-sm font-medium tracking-tight">
                  Data Transfer Cost Optimization
                </h3>
                <span className="text-muted-foreground/60 shrink-0 font-mono text-xs">
                  Rootconf 2022
                </span>
              </div>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                Granular visibility into cloud data transfer costs using AWS CUR
                and VPC flow logs.
              </p>
              <Link
                href="https://hasgeek.com/rootconf/optimizing-costs-of-cloud-infrastructure/sub/data-transfer-cost-optimization-KGSAciSRiEjTo1bjGNWChG"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground group mt-2 inline-flex items-center gap-1 text-xs transition-colors"
              >
                View talk
                <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="py-4">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-foreground text-sm font-medium tracking-tight">
                  Simplifying Kubernetes Cost Visibility
                </h3>
                <span className="text-muted-foreground/60 shrink-0 font-mono text-xs">
                  Opslyft 2022
                </span>
              </div>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                Webinar on reducing the complexity of understanding and
                attributing Kubernetes infrastructure costs.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const metadata: Metadata = {
  title: {
    absolute: 'Prajwal HD | Backend Systems, Developer Tools & Applied AI',
  },
  description:
    'Software engineer building backend systems, developer tools, and applied AI. Three years shipping production cloud cost infrastructure at Opslyft, peer-reviewed Android malware detection research, and ongoing tools like QuackCode and Gitwise.',
  alternates: {
    canonical: '/',
  },
};
