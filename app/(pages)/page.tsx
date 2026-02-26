import Link from 'next/link';
import type { Metadata } from 'next';
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
