import Link from 'next/link';
import type { Metadata } from 'next';
import { Mail, ArrowUpRight } from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';
import LinkedinIcon from '@/components/icons/LinkedinIcon';
import SectionHeader from '@/components/section-header';

export default function AboutPage() {
  return (
    <div className="flex-1">
      <section className="px-4 pt-14 pb-8">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            About
          </h1>
          <span className="text-muted-foreground/60 font-mono text-xs">
            / who, what, why
          </span>
        </div>
        <p className="text-muted-foreground mt-3 max-w-2xl text-base leading-relaxed">
          I build backend systems, developer tools, and applied AI. Most of the
          work I enjoy sits where product decisions and infrastructure decisions
          overlap: reliability, cost, safety, and usability all pulling on the
          same system at once.
        </p>
      </section>

      <div className="space-y-12 px-4 pb-20 md:space-y-14">
        <section id="how-i-think">
          <SectionHeader label="How I think about building" />
          <div className="text-muted-foreground space-y-3 text-base leading-relaxed">
            <p>
              I care about systems that fail loudly, APIs that are hard to
              misuse, and code the next person can read without reverse-
              engineering my intent. Complexity is a cost. I try not to spend it
              unless I&apos;m getting something real back.
            </p>
            <p>
              I also care a lot about recovery. A lot of engineering mistakes
              are survivable if the system makes them obvious and cheap to fix.
              Silent failures are the worst kind.
            </p>
          </div>
        </section>

        <section id="how-i-work">
          <SectionHeader label="How I work with teams" />
          <div className="text-muted-foreground space-y-3 text-base leading-relaxed">
            <p>
              I like ambiguous problems when the constraint is real. At Opslyft
              that meant customer-facing architecture work, cost investigations,
              and shipping changes into environments I did not fully control.
            </p>
            <p>
              I try to reduce ambiguity for everyone else: make the tradeoff
              explicit and the failure mode visible.
            </p>
          </div>
        </section>

        <section id="background">
          <SectionHeader label="Background" />
          <div className="text-muted-foreground space-y-3 text-base leading-relaxed">
            <p>
              Before grad school, I spent close to three years at Opslyft
              working on cloud cost infrastructure, multi-cloud visibility, and
              reliability-sensitive backend systems. That&apos;s where I learned
              the difference between code that works and systems that hold up in
              production. Alongside the work, I co-presented{' '}
              <Link
                href="https://hasgeek.com/rootconf/optimizing-costs-of-cloud-infrastructure/sub/data-transfer-cost-optimization-KGSAciSRiEjTo1bjGNWChG"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground/70 underline underline-offset-2 transition-colors"
              >
                data transfer cost optimization at Rootconf 2022
              </Link>
              .
            </p>
            <p>
              Then I went to Purdue Fort Wayne for my Master&apos;s, where I
              worked on adversarial ML and Android malware detection under Dr.
              Zesheng Chen. That work became a peer-reviewed paper in{' '}
              <Link
                href="https://doi.org/10.3390/electronics15030544"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground/70 underline underline-offset-2 transition-colors"
              >
                MDPI Electronics
              </Link>
              .
            </p>
            <p>
              Dr. Chen had one question he kept asking: &quot;Why are you
              assuming that&apos;s the right approach?&quot; That question
              changed how I think about almost everything.
            </p>
            <p>
              Alongside the research, I TA&apos;d undergraduate machine learning
              for two semesters. I automated parts of the grading pipeline, but
              the better part of the experience was explaining where the math,
              implementation, and model behavior actually meet.
            </p>
          </div>
        </section>

        <section id="outside">
          <SectionHeader label="Outside the terminal" />
          <div className="text-muted-foreground space-y-3 text-base leading-relaxed">
            <p>
              Gym and books. The gym taught me something about consistency that
              I haven&apos;t been able to learn any other way.
            </p>
            <p>
              The books I come back to are usually the ones that change how I
              think, not just what I know.
            </p>
          </div>
        </section>

        <section id="reach-me">
          <SectionHeader label="Reach me" />
          <p className="text-muted-foreground mb-4 max-w-2xl text-base leading-relaxed">
            If you&apos;re hiring for backend, platform, developer tooling, or
            applied AI work, email is the fastest way to reach me.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="mailto:hdprajwal01@gmail.com"
              className="border-foreground text-foreground hover:bg-foreground hover:text-background inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-xs transition-colors"
            >
              <Mail className="h-3 w-3" />
              Email
            </Link>
            <Link
              href="https://www.linkedin.com/in/hdprajwal"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border text-muted-foreground hover:border-foreground hover:text-foreground inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-xs transition-colors"
            >
              <LinkedinIcon className="h-3 w-3" />
              LinkedIn
              <ArrowUpRight className="h-3 w-3" />
            </Link>
            <Link
              href="https://github.com/hdprajwal"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border text-muted-foreground hover:border-foreground hover:text-foreground inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-xs transition-colors"
            >
              <GithubIcon className="h-3 w-3" />
              GitHub
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <p className="text-muted-foreground mt-4 text-xs">
            Or keep reading:{' '}
            <Link
              href="/projects"
              className="hover:text-foreground underline underline-offset-2 transition-colors"
            >
              projects
            </Link>
            <span className="text-muted-foreground/40"> · </span>
            <Link
              href="/blog"
              className="hover:text-foreground underline underline-offset-2 transition-colors"
            >
              blog
            </Link>
            <span className="text-muted-foreground/40"> · </span>
            <Link
              href="/resume"
              className="hover:text-foreground underline underline-offset-2 transition-colors"
            >
              resume
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'Background, working style, and experience of Prajwal HD: production cloud infrastructure at Opslyft, Android malware detection research at Purdue, and teaching machine learning.',
  alternates: {
    canonical: '/about',
  },
};
