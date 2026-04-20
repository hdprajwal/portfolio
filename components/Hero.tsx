import Link from 'next/link';
import GithubIcon from '@/components/icons/GithubIcon';
import LinkedinIcon from '@/components/icons/LinkedinIcon';
import TwitterIcon from '@/components/icons/TwitterIcon';
import { Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="px-4 pt-16 pb-12 md:pt-20 md:pb-16">
      <h1 className="text-foreground text-3xl font-semibold tracking-tight md:text-4xl">
        Prajwal HD
      </h1>
      <p className="text-muted-foreground mt-3 max-w-xl text-base leading-relaxed">
        Software engineer focused on backend systems and applied AI. Three years
        building production infrastructure at Opslyft. I care more about how a
        system behaves under pressure than what it&apos;s built with.
      </p>
      <div className="mt-5 flex items-center gap-4">
        <Link
          href="https://github.com/hdprajwal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="GitHub"
        >
          <GithubIcon className="h-4 w-4" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/hdprajwal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="LinkedIn"
        >
          <LinkedinIcon className="h-4 w-4" />
        </Link>
        <Link
          href="https://x.com/_hdprajwal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="X/Twitter"
        >
          <TwitterIcon className="h-4 w-4" />
        </Link>
        <Link
          href="mailto:hdprajwal01@gmail.com"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Email"
        >
          <Mail className="h-4 w-4" />
        </Link>
        <span className="bg-border mx-1 h-4 w-px" />
        <Link
          href="/resume"
          className="text-muted-foreground hover:text-foreground font-mono text-xs transition-colors"
        >
          Resume
        </Link>
      </div>
    </section>
  );
}
