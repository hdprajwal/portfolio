import Link from 'next/link';
import { CONTACT_EMAIL } from '@/lib/tracking';

const link =
  'text-foreground-strong decoration-accent-link hover:decoration-foreground-strong underline underline-offset-4 transition-colors';

// Closing prompt for project and blog pages so a reader always has a way to reach out.
export default function NextStep({ subject }: { subject: string }) {
  return (
    <p className="text-foreground text-body mt-10">
      Want to talk about {subject}?{' '}
      <Link href={`mailto:${CONTACT_EMAIL}`} className={link}>
        Email me
      </Link>{' '}
      or{' '}
      <Link
        href="https://cal.com/hdprajwal/intro"
        target="_blank"
        rel="noopener noreferrer"
        className={link}
      >
        book a call
      </Link>
      .
    </p>
  );
}
