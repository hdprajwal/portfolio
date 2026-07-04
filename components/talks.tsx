import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

type Talk = {
  title: string;
  event: string;
  description: string;
  href?: string;
};

const talks: Talk[] = [
  {
    title: 'Data Transfer Cost Optimization',
    event: 'Rootconf 2022',
    description:
      'Granular visibility into cloud data transfer costs using AWS CUR and VPC flow logs.',
    href: 'https://hasgeek.com/rootconf/optimizing-costs-of-cloud-infrastructure/sub/data-transfer-cost-optimization-KGSAciSRiEjTo1bjGNWChG',
  },
  {
    title: 'Simplifying Kubernetes Cost Visibility',
    event: 'Opslyft 2022',
    description:
      'Webinar on reducing the complexity of understanding and attributing Kubernetes infrastructure costs.',
  },
];

export default function Talks() {
  return (
    <div className="divide-border divide-y">
      {talks.map((talk) => (
        <div key={talk.title} className="py-4 first:pt-0">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-foreground text-label-18">{talk.title}</h3>
            <span className="text-muted-foreground text-label-13-mono shrink-0">
              {talk.event}
            </span>
          </div>
          <p className="text-muted-foreground text-copy-16">
            {talk.description}
          </p>
          {talk.href && (
            <Link
              href={talk.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground text-label-16 group inline-flex items-center gap-1 transition-colors"
            >
              View talk
              <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
