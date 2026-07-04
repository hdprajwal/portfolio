import Link from 'next/link';
import type { Metadata } from 'next';
import { Mail, ArrowUpRight, FileDown } from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';
import LinkedinIcon from '@/components/icons/LinkedinIcon';
import { resume, type ResumeRole } from '@/lib/resume';

const RESUME_PDF_URL = resume.pdfUrl;

function RoleBlock({ role }: { role: ResumeRole }) {
  return (
    <div className="border-border border-l pl-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="text-foreground text-heading-14">{role.title}</h4>
        <span className="text-muted-foreground/70 text-label-13-mono tabular-nums">
          {role.from} to {role.to}
        </span>
      </div>
      <p className="text-muted-foreground/70 text-3xs font-mono tracking-wider uppercase">
        {role.type}
      </p>
      <ul className="text-muted-foreground text-copy-16 mt-2 list-disc space-y-2 pl-4">
        {role.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ResumePage() {
  return (
    <div className="flex-1">
      <section className="px-4 pt-14 pb-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h1 className="text-foreground text-heading-24 sm:text-heading-32">
                Prajwal HD
              </h1>
              <span className="text-muted-foreground/60 text-label-14-mono">
                / Resume
              </span>
            </div>
            <p className="text-muted-foreground text-label-14-mono mt-2">
              Software Engineer
              <span className="text-muted-foreground/40"> · </span>
              California, USA
              <span className="text-muted-foreground/40"> · </span>
              AI Engineer / Backend / Full-Stack
              <span className="text-muted-foreground/40"> · </span>
              Updated {resume.updated}
            </p>
          </div>
        </div>

        <p className="text-muted-foreground text-copy-16 mt-4 max-w-3xl">
          {resume.summary}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2 print:hidden">
          <Link
            href="mailto:hdprajwal01@gmail.com"
            className="border-border text-muted-foreground hover:border-foreground hover:text-foreground text-label-14 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 transition-colors"
          >
            <Mail className="h-3 w-3" />
            Email
          </Link>
          <Link
            href="https://www.linkedin.com/in/hdprajwal"
            target="_blank"
            rel="noopener noreferrer"
            className="border-border text-muted-foreground hover:border-foreground hover:text-foreground text-label-14 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 transition-colors"
          >
            <LinkedinIcon className="h-3 w-3" />
            LinkedIn
            <ArrowUpRight className="h-3 w-3" />
          </Link>
          <Link
            href="https://github.com/hdprajwal"
            target="_blank"
            rel="noopener noreferrer"
            className="border-border text-muted-foreground hover:border-foreground hover:text-foreground text-label-14 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 transition-colors"
          >
            <GithubIcon className="h-3 w-3" />
            GitHub
            <ArrowUpRight className="h-3 w-3" />
          </Link>
          <Link
            href={RESUME_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-foreground text-foreground hover:bg-foreground hover:text-background text-label-14 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 transition-colors"
          >
            <FileDown className="h-3 w-3" />
            Download PDF
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <p className="text-muted-foreground/80 text-copy-14 mt-4">
          Selected projects and writing:{' '}
          <Link
            href="/projects"
            className="hover:text-foreground underline underline-offset-2 transition-colors"
          >
            hdprajwal.dev/projects
          </Link>
          <span className="text-muted-foreground/40"> · </span>
          <Link
            href="/blog"
            className="hover:text-foreground underline underline-offset-2 transition-colors"
          >
            hdprajwal.dev/blog
          </Link>
        </p>
      </section>

      <div className="space-y-14 px-4 pb-20 md:space-y-20">
        <section id="experience">
          <h2 className="text-foreground mb-6 text-sm font-semibold tracking-wide uppercase">
            Experience
          </h2>
          <div className="space-y-10">
            {resume.experience.map((c) => (
              <div key={c.name}>
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-foreground text-heading-16">{c.name}</h3>
                  <span className="text-muted-foreground/70 text-3xs font-mono tracking-wider uppercase">
                    {c.location}
                  </span>
                </div>
                <div className="space-y-6">
                  {c.roles.map((r) => (
                    <RoleBlock key={r.title + r.from} role={r} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="publications">
          <h2 className="text-foreground mb-6 text-sm font-semibold tracking-wide uppercase">
            Publications
          </h2>
          <div className="space-y-6">
            {resume.publications.map((pub) => (
              <div key={pub.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-foreground text-heading-14">
                    {pub.title}
                  </h3>
                  <span className="text-muted-foreground/70 text-label-13-mono tabular-nums">
                    {pub.year}
                  </span>
                </div>
                <p className="text-muted-foreground/70 text-3xs mt-1 font-mono tracking-wider uppercase">
                  Peer-reviewed
                  <span className="text-muted-foreground/40"> · </span>
                  {pub.venue}
                </p>
                <p className="text-muted-foreground text-copy-16 mt-2">
                  {pub.summary}
                </p>
                <p className="text-muted-foreground/60 text-copy-13-mono mt-2">
                  {pub.citation}
                </p>
                <Link
                  href={pub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground text-label-16 group mt-2 inline-flex items-center gap-1"
                >
                  Read paper
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section id="speaking">
          <h2 className="text-foreground mb-6 text-sm font-semibold tracking-wide uppercase">
            Speaking
          </h2>
          <div className="space-y-6">
            {resume.talks.map((talk) => (
              <div key={talk.title} className="border-border border-l pl-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-foreground text-heading-14">
                    {talk.title}
                  </h3>
                  <span className="text-muted-foreground/70 text-label-13-mono tabular-nums">
                    {talk.venue}
                  </span>
                </div>
                <p className="text-muted-foreground text-copy-16 mt-1">
                  {talk.summary}
                </p>
                {talk.href && (
                  <Link
                    href={talk.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground text-label-14 group mt-1.5 inline-flex items-center gap-1 transition-colors"
                  >
                    View talk
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="education">
          <h2 className="text-foreground mb-6 text-sm font-semibold tracking-wide uppercase">
            Education
          </h2>
          <div className="space-y-6">
            {resume.education.map((e) => (
              <div key={e.school}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-foreground text-heading-14">
                    {e.school}
                  </h3>
                  <span className="text-muted-foreground/70 text-label-13-mono tabular-nums">
                    {e.from} to {e.to}
                  </span>
                </div>
                <p className="text-muted-foreground text-copy-16 mt-0.5">
                  {e.degree}, {e.major}
                </p>
                {(e.thesis || e.coursework) && (
                  <div className="text-muted-foreground text-copy-16 mt-1.5">
                    {e.thesis && (
                      <>
                        Thesis:{' '}
                        <Link
                          href={e.thesis.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-foreground underline underline-offset-2 transition-colors"
                        >
                          {e.thesis.title}
                        </Link>
                        .{' '}
                      </>
                    )}
                    {e.coursework && <>Coursework: {e.coursework}.</>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Resume of Prajwal HD: AI engineer, backend, and full-stack, with Opslyft cloud cost engineering, peer-reviewed Android malware detection research, and public speaking.',
  alternates: {
    canonical: '/resume',
  },
};
