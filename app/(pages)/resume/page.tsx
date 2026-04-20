import Link from 'next/link';
import type { Metadata } from 'next';
import { Mail, ArrowUpRight, FileDown } from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';
import LinkedinIcon from '@/components/icons/LinkedinIcon';

// TODO: update this URL once the PDF is uploaded to the CDN
const RESUME_PDF_URL = 'https://assets.hdprajwal.dev/resume.pdf';

type Role = {
  title: string;
  type: 'Full-time' | 'Part-time' | 'Internship';
  from: string;
  to: string;
  bullets: string[];
};

type Company = {
  name: string;
  location: string;
  roles: Role[];
};

type Education = {
  school: string;
  degree: string;
  major: string;
  from: string;
  to: string;
  notes?: React.ReactNode;
};

const experience: Company[] = [
  {
    name: 'Opslyft',
    location: 'Bangalore, India',
    roles: [
      {
        title: 'Cloud Engineer',
        type: 'Full-time',
        from: 'Mar 2022',
        to: 'Nov 2023',
        bullets: [
          'Drove ~$100K/month in recurring cost savings across enterprise AWS customers by identifying idle infrastructure, reserved-instance gaps, and data-transfer inefficiencies.',
          'Built a multi-cloud asset management service that unified resource discovery across customer AWS, GCP, and Azure accounts for cost attribution and governance.',
          'Partnered with customer engineering teams to redesign cloud architectures for cost and security, shortening their deployment cycles.',
        ],
      },
      {
        title: 'Software Development Engineer',
        type: 'Full-time',
        from: 'Apr 2021',
        to: 'Mar 2022',
        bullets: [
          'Reduced SaaS platform page load times by 2x through UI component refactoring and render-path optimization.',
          'Redesigned backend logic for the instance scheduler to cover edge cases, reaching 99% service uptime in customer environments.',
          'Architected multi-cloud Data Transfer Visibility, solving a major pain point for teams trying to attribute cross-region and cross-AZ data transfer costs.',
        ],
      },
    ],
  },
  {
    name: 'Purdue University',
    location: 'Fort Wayne, IN',
    roles: [
      {
        title: 'Teaching Assistant, Machine Learning',
        type: 'Part-time',
        from: 'Jan 2025',
        to: 'Dec 2025',
        bullets: [
          'Supported an undergraduate Machine Learning course through grading and feedback for ~40 students per semester.',
          'Automated grading workflows in Python, improving consistency and reducing turnaround time on student evaluations.',
        ],
      },
      {
        title: 'Research Assistant',
        type: 'Full-time',
        from: 'Oct 2024',
        to: 'Dec 2024',
        bullets: [
          'Designed and shipped an MVP mobile application and backend in React Native and TypeScript for a faculty research project.',
        ],
      },
    ],
  },
  {
    name: 'Gradspace',
    location: 'Bangalore, India',
    roles: [
      {
        title: 'Full-stack Developer Intern',
        type: 'Internship',
        from: 'Sep 2020',
        to: 'Feb 2021',
        bullets: [
          'Rearchitected backend services on AWS, improving API response times and reducing deploy time.',
          'Implemented mobile push notifications to improve user engagement on the platform.',
          'Refactored the mobile codebase with the mobile team, cutting app load time by 60%.',
        ],
      },
    ],
  },
];

const education: Education[] = [
  {
    school: 'Purdue University, Fort Wayne, IN',
    degree: 'Master of Science',
    major: 'Computer Science',
    from: 'Jan 2024',
    to: 'Dec 2025',
    notes: (
      <>
        Thesis:{' '}
        <Link
          href="https://doi.org/10.3390/electronics15030544"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground underline underline-offset-2 transition-colors"
        >
          Re-Evaluating Android Malware Detection: Tabular Features, Vision
          Models, and Ensembles
        </Link>
        . Coursework: Deep Learning, Cryptography and Network Security, NLP,
        Algorithm Design, Database Systems.
      </>
    ),
  },
  {
    school: 'Govt. S.K.S.J Technological Institute, Bangalore, India',
    degree: 'Bachelor of Engineering',
    major: 'Computer Science and Engineering',
    from: 'Aug 2017',
    to: 'Jul 2021',
  },
];

function RoleBlock({ role }: { role: Role }) {
  return (
    <div className="border-border border-l pl-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="text-foreground text-sm font-medium tracking-tight">
          {role.title}
        </h4>
        <span className="text-muted-foreground/70 font-mono text-[11px] tabular-nums">
          {role.from} to {role.to}
        </span>
      </div>
      <p className="text-muted-foreground/70 font-mono text-[10px] tracking-wider uppercase">
        {role.type}
      </p>
      <ul className="text-muted-foreground mt-2 list-disc space-y-1.5 pl-4 text-sm leading-relaxed">
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
              <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
                Prajwal HD
              </h1>
              <span className="text-muted-foreground/60 font-mono text-xs">
                / Resume
              </span>
            </div>
            <p className="text-muted-foreground mt-2 font-mono text-xs">
              Software Engineer
              <span className="text-muted-foreground/40"> · </span>
              California, USA
              <span className="text-muted-foreground/40"> · </span>
              Backend / Platform / Applied AI
            </p>
          </div>
        </div>

        <p className="text-muted-foreground mt-4 max-w-3xl text-sm leading-relaxed">
          Backend systems and applied AI engineer. Three years shipping
          production cloud cost infrastructure at Opslyft (including
          ~$100K/month in recurring savings for enterprise AWS customers), plus
          peer-reviewed research on Android malware detection at Purdue.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2 print:hidden">
          <Link
            href="mailto:hdprajwal01@gmail.com"
            className="border-border text-muted-foreground hover:border-foreground hover:text-foreground inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-xs transition-colors"
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
          <Link
            href={RESUME_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-foreground text-foreground hover:bg-foreground hover:text-background inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-xs transition-colors"
          >
            <FileDown className="h-3 w-3" />
            Download PDF
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <p className="text-muted-foreground/80 mt-4 text-xs">
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

      <div className="space-y-12 px-4 pb-20 md:space-y-14">
        <section id="experience">
          <h2 className="text-foreground mb-6 text-sm font-semibold tracking-wide uppercase">
            Experience
          </h2>
          <div className="space-y-10">
            {experience.map((c) => (
              <div key={c.name}>
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-foreground text-base font-semibold tracking-tight">
                    {c.name}
                  </h3>
                  <span className="text-muted-foreground/70 font-mono text-[11px] tracking-wider uppercase">
                    {c.location}
                  </span>
                </div>
                <div className="space-y-5">
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
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-foreground text-sm font-medium tracking-tight">
                Re-Evaluating Android Malware Detection: Tabular Features,
                Vision Models, and Ensembles
              </h3>
              <span className="text-muted-foreground/70 font-mono text-[11px] tabular-nums">
                2026
              </span>
            </div>
            <p className="text-muted-foreground/70 mt-1 font-mono text-[10px] tracking-wider uppercase">
              Peer-reviewed
              <span className="text-muted-foreground/40"> · </span>
              MDPI Electronics
            </p>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Compares tabular static features, vision-based byte-plot models,
              and ensemble strategies for Android malware classification across
              1M+ samples. Evaluates where modality choice changes the detection
              surface and where ensembles actually pay for themselves.
            </p>
            <p className="text-muted-foreground/60 mt-2 font-mono text-[11px]">
              Hosahalli Dayananda, P.; Chen, Z. Electronics 2026, 15, 544.
            </p>
            <Link
              href="https://doi.org/10.3390/electronics15030544"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground group mt-2 inline-flex items-center gap-1 text-sm font-medium"
            >
              Read paper
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </section>

        <section id="speaking">
          <h2 className="text-foreground mb-6 text-sm font-semibold tracking-wide uppercase">
            Speaking
          </h2>
          <div className="space-y-4">
            <div className="border-border border-l pl-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-foreground text-sm font-medium tracking-tight">
                  Data Transfer Cost Optimization
                </h3>
                <span className="text-muted-foreground/70 font-mono text-[11px] tabular-nums">
                  Rootconf 2022
                </span>
              </div>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                Co-presented an approach to granular visibility into cloud data
                transfer costs using AWS Cost and Usage Reports and VPC flow
                logs.
              </p>
              <Link
                href="https://hasgeek.com/rootconf/optimizing-costs-of-cloud-infrastructure/sub/data-transfer-cost-optimization-KGSAciSRiEjTo1bjGNWChG"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground group mt-1.5 inline-flex items-center gap-1 text-xs transition-colors"
              >
                View talk
                <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            <div className="border-border border-l pl-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-foreground text-sm font-medium tracking-tight">
                  Simplifying the Complexities of Kubernetes Cost Visibility
                </h3>
                <span className="text-muted-foreground/70 font-mono text-[11px] tabular-nums">
                  Opslyft Webinar, Jun 2022
                </span>
              </div>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                Spoke alongside Aayush Kumar (Founder and CEO, Opslyft) on
                bridging Kubernetes orchestration and underlying cloud
                infrastructure costs: capacity misconfigurations, siloed
                visibility, and building a transparency layer for effective cost
                management.
              </p>
            </div>
          </div>
        </section>

        <section id="education">
          <h2 className="text-foreground mb-6 text-sm font-semibold tracking-wide uppercase">
            Education
          </h2>
          <div className="space-y-6">
            {education.map((e) => (
              <div key={e.school}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-foreground text-sm font-medium tracking-tight">
                    {e.school}
                  </h3>
                  <span className="text-muted-foreground/70 font-mono text-[11px] tabular-nums">
                    {e.from} to {e.to}
                  </span>
                </div>
                <p className="text-muted-foreground mt-0.5 text-sm">
                  {e.degree}, {e.major}
                </p>
                {e.notes && (
                  <div className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                    {e.notes}
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
    'Resume of Prajwal HD: backend systems, platform work, and applied AI, with Opslyft cloud cost engineering, peer-reviewed Android malware detection research, and public speaking.',
  alternates: {
    canonical: '/resume',
  },
};
