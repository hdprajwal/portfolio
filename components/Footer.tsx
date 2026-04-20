import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import GithubIcon from '@/components/icons/GithubIcon';
import LinkedinIcon from '@/components/icons/LinkedinIcon';
import TwitterIcon from '@/components/icons/TwitterIcon';

export default function Footer() {
  return (
    <footer className="px-4">
      <Separator className="bg-muted mt-1" />
      <div className="flex flex-col items-start justify-between gap-4 py-4 sm:flex-row sm:items-center">
        <p className="text-muted-foreground text-sm">&copy; 2026 Prajwal HD</p>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/hdprajwal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/hdprajwal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="https://x.com/_hdprajwal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="X/Twitter"
          >
            <TwitterIcon className="h-3.5 w-3.5" />
          </Link>
          <span className="bg-border h-3.5 w-px" />
          <Link
            href="/colophon"
            className="text-muted-foreground hover:text-foreground text-xs transition-colors"
          >
            Colophon
          </Link>
        </div>
      </div>
    </footer>
  );
}
