import Link from 'next/link';
import GithubIcon from '@/components/icons/GithubIcon';
import LinkedinIcon from '@/components/icons/LinkedinIcon';
import TwitterIcon from '@/components/icons/TwitterIcon';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="px-4 pt-16 pb-12 md:pt-20 md:pb-16">
      <p className="text-foreground/90 text-lg leading-relaxed">
        Hi, I&apos;m Prajwal
      </p>
      <p className="text-foreground/90 mt-3 max-w-2xl text-base leading-relaxed">
        An AI engineer based in California. I build AI agents and the developer
        tools around them, right now emberd, a runtime that runs untrusted
        AI-agent code inside isolated microVMs. Before this I spent three years
        at Opslyft on cloud cost and reliability systems, then a Master&apos;s
        on adversarial ML and Android malware detection. I&apos;m open to
        full-time AI engineer, backend, and full-stack roles.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <Link
          href="/resume"
          className="text-foreground hover:text-foreground inline-flex items-center gap-1 underline underline-offset-2 transition-colors"
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
        <span aria-hidden className="bg-border h-4 w-px" />
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
