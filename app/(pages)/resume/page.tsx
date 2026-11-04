import Link from 'next/link';
import type { Metadata } from 'next';
import { Mail, ArrowUpRight, FileDown } from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';
import LinkedinIcon from '@/components/icons/LinkedinIcon';
import { resume, type ResumeRole } from '@/lib/resume';
import Stack from '@/components/stack';
import SectionHeader from '@/components/section-header';

const RESUME_PDF_URL = resume.pdfUrl;

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// "Mar 2022" -> months since year 0; "Present" resolves to the current month.
function monthIndex(label: string) {
  if (label === 'Present') {
    const now = new Date();
    return now.getUTCFullYear() * 12 + now.getUTCMonth();
  }
  const [month, year] = label.split(' ');
  return Number(year) * 12 + MONTHS.indexOf(month);
}

// Inclusive span, so Mar 2022 to Nov 2023 reads as 1y 9m.
function duration(from: string, to: string) {
  const total = monthIndex(to) - monthIndex(from) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  return [years && `${years}y`, months && `${months}m`]
    .filter(Boolean)
    .join(' ');
}

function RoleBlock({ role }: { role: ResumeRole }) {
  return (
    <div>
      <h4 className="text-foreground text-title">{role.title}</h4>
      <p className="text-muted-foreground text-meta mt-0.5 tabular-nums">
        {role.type}
        <span className="text-muted-foreground/40"> · </span>
        {role.from} to {role.to}
        <span className="text-muted-foreground/40"> · </span>
        {duration(role.from, role.to)}
      </p>
      <ul className="text-foreground text-body marker:text-muted-foreground/60 mt-2 list-disc space-y-2 pl-4">
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
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <h1 className="text-foreground text-display">Prajwal HD</h1>
              <span className="text-muted-foreground text-meta">/ Resume</span>
            </div>
            <p className="text-muted-foreground text-meta mt-2">
              {resume.headline}
              <span className="whitespace-nowrap">
                <span className="text-muted-foreground/40"> · </span>
                California, USA
              </span>{' '}
              <span className="whitespace-nowrap">
                <span className="text-muted-foreground/40">· </span>
                Updated{' '}
                {new Date(resume.updated).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                  timeZone: 'UTC',
                })}
              </span>
            </p>
          </div>
        </div>

        <p className="text-foreground text-body mt-4">{resume.summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-2 print:hidden">
          <Link
            href={RESUME_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-foreground bg-foreground text-background text-meta inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 transition-opacity hover:opacity-90"
          >
            <FileDown className="h-3 w-3" />
            Download PDF
            <ArrowUpRight className="h-3 w-3" />
          </Link>
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
        </div>
      </section>

      <div className="space-y-16 px-4 pb-20">
        <section id="education">
          <SectionHeader label="Education" />
          <div className="space-y-6">
            {resume.education.map((e) => (
              <div key={e.school}>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-4 sm:[&>span]:shrink-0">
                  <h3 className="text-foreground text-title">{e.school}</h3>
                  <span className="text-muted-foreground text-meta tabular-nums">
                    {e.from} to {e.to}
                  </span>
                </div>
                <p className="text-foreground text-body mt-0.5">
                  {e.degree}, {e.major}
                </p>
                {(e.thesis || e.coursework) && (
                  <div className="text-foreground-soft text-subtitle mt-1.5">
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

        <section id="experience">
          <SectionHeader label="Experience" />
          <div className="space-y-10">
            {resume.experience.map((c) => (
              <div key={c.name}>
                <div className="border-border mb-4 flex flex-col gap-0.5 border-b pb-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-4">
                  <h3 className="text-foreground text-title">{c.name}</h3>
                  <span className="text-muted-foreground text-meta shrink-0">
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
          <SectionHeader label="Skills" />
          <Stack />
        </section>

        <section id="publications">
          <SectionHeader label="Publications" />
          <div className="space-y-6">
            {resume.publications.map((pub) => (
              <div key={pub.title}>
                <h3 className="text-foreground text-title">{pub.title}</h3>
                <p className="text-muted-foreground text-meta mt-1">
                  Peer-reviewed
                  <span className="text-muted-foreground/40"> · </span>
                  {pub.venue}
                  <span className="text-muted-foreground/40"> · </span>
                  <span className="tabular-nums">{pub.year}</span>
                </p>
                <p className="text-foreground text-body mt-2">{pub.summary}</p>
                <p className="text-muted-foreground text-subtitle mt-2">
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
          <SectionHeader label="Speaking" />
          <div className="space-y-6">
            {resume.talks.map((talk) => (
              <div key={talk.title}>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-4 sm:[&>span]:shrink-0">
                  <h3 className="text-foreground text-title">{talk.title}</h3>
                  <span className="text-muted-foreground text-meta tabular-nums">
                    {talk.venue}
                  </span>
                </div>
                <p className="text-foreground text-body mt-1">{talk.summary}</p>
                {talk.href && (
                  <Link
                    href={talk.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground decoration-accent-link hover:decoration-foreground text-meta group mt-1.5 inline-flex items-center gap-1 underline underline-offset-4 transition-colors"
                  >
                    View talk
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
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
