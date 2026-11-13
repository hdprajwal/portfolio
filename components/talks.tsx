import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

type Talk = {
  title: string;
  event: string;
  href?: string;
};

const talks: Talk[] = [
  {
    title: 'Data Transfer Cost Optimization',
    event: 'Rootconf 2022',
    href: 'https://hasgeek.com/rootconf/optimizing-costs-of-cloud-infrastructure/sub/data-transfer-cost-optimization-KGSAciSRiEjTo1bjGNWChG',
  },
  {
    title: 'Simplifying Kubernetes Cost Visibility',
    event: 'Opslyft 2022',
  },
];

export default function Talks() {
  return (
    <ul className="space-y-2">
      {talks.map((talk) => (
        <li
          key={talk.title}
          className="flex items-baseline justify-between gap-4"
        >
          {talk.href ? (
            <Link
              href={talk.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-foreground-strong decoration-accent-link hover:decoration-foreground-strong text-body inline-flex items-center underline underline-offset-4 transition-colors"
            >
              {talk.title}
              <ArrowUpRight className="ml-1 h-3 w-3 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ) : (
            <span className="text-foreground text-body">{talk.title}</span>
          )}
          <span className="text-muted-foreground text-meta shrink-0">
            {talk.event}
          </span>
        </li>
      ))}
    </ul>
  );
}
