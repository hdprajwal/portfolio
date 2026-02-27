import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/section-header';
import ContactSection from '@/components/ContactSection';
import RecentBlogs from '@/components/blogs/recent-blogs';
import FeaturedProjects from '@/components/projects/featured-projects';

export default async function Home() {
  return (
    <>
      <Hero />
      <div className="space-y-16 px-4 pb-18 md:space-y-20">
        <section id="now">
          <SectionHeader label="Now" />
          <div className="mt-4">
            <p className="text-muted-foreground text-xs leading-relaxed">
              MS done. Going deep on Go and Rust - building a private tunneling
              service and a personal dashboard. Shipping things I actually want
              to use.
            </p>
            <p className="text-muted-foreground mt-2 font-mono text-xs opacity-70">
              Last updated: Feb 2026 &middot;{' '}
              <Link
                className="text-primary hover:text-foreground transition-colors"
                href="/now"
              >
                /now
              </Link>
            </p>
          </div>
        </section>

        <section id="research">
          <SectionHeader label="Research" />
          <div className="mt-4">
            <span className="text-primary font-mono text-[10px] tracking-wider uppercase opacity-70">
              Peer-reviewed · MDPI Electronics 2026
            </span>
            <Link
              href="https://doi.org/10.3390/electronics15030544"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 block"
            >
              <h3 className="text-primary text-sm font-medium tracking-tight group-hover:underline">
                Re-Evaluating Android Malware Detection: Tabular Features,
                Vision Models, and Ensembles
                <ArrowUpRight className="ml-1 inline-block h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </h3>
            </Link>
            <p className="text-muted-foreground mt-1.5 font-mono text-xs leading-relaxed">
              Hosahalli Dayananda, P.; Chen, Z. Compares tabular static
              features, vision-based models, and ensemble strategies for Android
              malware classification.
            </p>
          </div>
        </section>

        <section id="projects">
          <SectionHeader label="Projects" />
          <FeaturedProjects />
          <Link
            className="text-primary hover:text-primary/80 mt-4 inline-block font-mono text-xs transition-colors"
            href="/projects"
          >
            View all →
          </Link>
        </section>

        <section id="blog">
          <SectionHeader label="Writing" />
          <RecentBlogs />
          <Link
            className="text-primary hover:text-primary/80 mt-4 inline-block font-mono text-xs transition-colors"
            href="/blog"
          >
            View all →
          </Link>
        </section>

        <section id="contact">
          <SectionHeader label="Connect" />
          <ContactSection />
        </section>
      </div>
    </>
  );
}

export const metadata: Metadata = {
  title: 'Home',
  description: "Prajwal's personal site - projects, writing, and links.",
};
