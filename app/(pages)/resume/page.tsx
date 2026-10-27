import Link from 'next/link';
import type { Metadata } from 'next';
import { Mail, ArrowUpRight, FileDown } from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';
import LinkedinIcon from '@/components/icons/LinkedinIcon';
import { resume, type ResumeRole } from '@/lib/resume';
import { stack } from '@/lib/stack';

const RESUME_PDF_URL = resume.pdfUrl;

function RoleBlock({ role }: { role: ResumeRole }) {
  return (
    <div className="border-border border-l pl-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="text-foreground text-title">{role.title}</h4>
        <span className="text-muted-foreground/70 text-meta tabular-nums">
          {role.from} to {role.to}
        </span>
      </div>
      <p className="text-muted-foreground/70 text-eyebrow">{role.type}</p>
      <ul className="text-foreground text-body mt-2 list-disc space-y-2 pl-4">
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
              <h1 className="text-foreground text-display">Prajwal HD</h1>
              <span className="text-muted-foreground/60 text-meta">
                / Resume
              </span>
            </div>
            <p className="text-muted-foreground text-meta mt-2">
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

        <p className="text-foreground text-body mt-4">{resume.summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-2 print:hidden">
          <Link
            href="mailto:hdprajwal01@gmail.com"
            className="border-border text-foreground hover:border-foreground text-meta inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 transition-colors"
          >
            <Mail className="h-3 w-3" />
            Email
          </Link>
          <Link
            href="https://www.linkedin.com/in/hdprajwal"
            target="_blank"
            rel="noopener noreferrer"
            className="border-border text-foreground hover:border-foreground text-meta inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 transition-colors"
          >
            <LinkedinIcon className="h-3 w-3" />
            LinkedIn
            <ArrowUpRight className="h-3 w-3" />
          </Link>
          <Link
            href="https://github.com/hdprajwal"
            target="_blank"
            rel="noopener noreferrer"
            className="border-border text-foreground hover:border-foreground text-meta inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 transition-colors"
          >
            <GithubIcon className="h-3 w-3" />
            GitHub
            <ArrowUpRight className="h-3 w-3" />
          </Link>
          <Link
            href={RESUME_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-foreground text-foreground hover:bg-foreground hover:text-background text-meta inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 transition-colors"
          >
            <FileDown className="h-3 w-3" />
            Download PDF
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <p className="text-muted-foreground/80 text-subtitle mt-4">
          Selected projects and writing:{' '}
          <Link
            href="/projects"
            className="text-foreground decoration-accent-link hover:decoration-foreground underline underline-offset-4 transition-colors"
          >
            hdprajwal.dev/projects
          </Link>
          <span className="text-muted-foreground/40"> · </span>
          <Link
            href="/blog"
            className="text-foreground decoration-accent-link hover:decoration-foreground underline underline-offset-4 transition-colors"
          >
            hdprajwal.dev/blog
          </Link>
        </p>
      </section>

      <div className="space-y-14 px-4 pb-20">
        <section id="experience">
          <h2 className="text-muted-foreground text-header mb-4">Experience</h2>
          <div className="space-y-10">
            {resume.experience.map((c) => (
              <div key={c.name}>
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-foreground text-title">{c.name}</h3>
                  <span className="text-muted-foreground/70 text-eyebrow">
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

        <section id="skills">
          <h2 className="text-muted-foreground text-header mb-4">Skills</h2>
          <div className="space-y-2">
            {stack.map((category) => (
              <div
                key={category.label}
                className="flex flex-col gap-x-4 gap-y-1 sm:flex-row sm:items-baseline"
              >
                <span className="text-muted-foreground text-meta w-40 shrink-0">
                  {category.label}
                </span>
                <p className="text-foreground text-body">
                  {category.items.map((item) => item.name).join(', ')}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="publications">
          <h2 className="text-muted-foreground text-header mb-4">
            Publications
          </h2>
          <div className="space-y-6">
            {resume.publications.map((pub) => (
              <div key={pub.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-foreground text-title">{pub.title}</h3>
                  <span className="text-muted-foreground/70 text-meta tabular-nums">
                    {pub.year}
                  </span>
                </div>
                <p className="text-muted-foreground/70 text-eyebrow mt-1">
                  Peer-reviewed
                  <span className="text-muted-foreground/40"> · </span>
                  {pub.venue}
                </p>
                <p className="text-foreground text-body mt-2">{pub.summary}</p>
                <p className="text-muted-foreground/60 text-subtitle mt-2">
                  {pub.citation}
                </p>
                <Link
                  href={pub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground text-meta group mt-2 inline-flex items-center gap-1"
                >
                  Read paper
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section id="speaking">
          <h2 className="text-muted-foreground text-header mb-4">Speaking</h2>
          <div className="space-y-6">
            {resume.talks.map((talk) => (
              <div key={talk.title} className="border-border border-l pl-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-foreground text-title">{talk.title}</h3>
                  <span className="text-muted-foreground/70 text-meta tabular-nums">
                    {talk.venue}
                  </span>
                </div>
                <p className="text-foreground text-body mt-1">{talk.summary}</p>
                {talk.href && (
                  <Link
                    href={talk.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground text-meta group mt-1.5 inline-flex items-center gap-1 transition-colors"
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
          <h2 className="text-muted-foreground text-header mb-4">Education</h2>
          <div className="space-y-6">
            {resume.education.map((e) => (
              <div key={e.school}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-foreground text-title">{e.school}</h3>
                  <span className="text-muted-foreground/70 text-meta tabular-nums">
                    {e.from} to {e.to}
                  </span>
                </div>
                <p className="text-foreground text-body mt-0.5">
                  {e.degree}, {e.major}
                </p>
                {(e.thesis || e.coursework) && (
                  <div className="text-foreground text-body mt-1.5">
                    {e.thesis && (
                      <>
                        Thesis:{' '}
                        <Link
                          href={e.thesis.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground decoration-accent-link hover:decoration-foreground underline underline-offset-4 transition-colors"
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
