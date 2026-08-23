import Link from 'next/link';
import GithubIcon from '@/components/icons/GithubIcon';
import LinkedinIcon from '@/components/icons/LinkedinIcon';
import TwitterIcon from '@/components/icons/TwitterIcon';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="px-4 pt-14 pb-12">
      <p className="text-muted-foreground text-read-14">Hi, I&apos;m Prajwal</p>
      <p className="text-muted-foreground text-read-14 mt-4.5">
        An AI engineer based in California. I build AI agents and the developer
        tools around them, right now{' '}
        <strong className="text-foreground font-medium">emberd</strong>, a
        runtime that runs untrusted AI-agent code inside isolated microVMs.
        Before this I spent three years at Opslyft on cloud cost and reliability
        systems, then a Master&apos;s on adversarial ML and Android malware
        detection. I&apos;m open to full-time AI engineer, backend, and
        full-stack roles.
      </p>
      <div className="text-label-13-mono mt-5 flex flex-wrap items-center gap-x-4.5 gap-y-1.5">
        <Link
          href="/resume"
          className="text-foreground decoration-muted-foreground hover:decoration-foreground inline-flex items-center gap-1 underline underline-offset-4 transition-colors"
        >
          Resume
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          href="/projects"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          View projects
        </Link>
        <Link
          href="mailto:hdprajwal01@gmail.com"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Email
        </Link>
        <span aria-hidden className="bg-border h-3 w-px" />
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
      </div>
    </section>
  );
}
