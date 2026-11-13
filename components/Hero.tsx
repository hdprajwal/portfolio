import Image from 'next/image';
import Link from 'next/link';
import GithubIcon from '@/components/icons/GithubIcon';
import LinkedinIcon from '@/components/icons/LinkedinIcon';
import TwitterIcon from '@/components/icons/TwitterIcon';
import { ArrowRight, Bug, Layers, Sparkles } from 'lucide-react';
import HeroLink from '@/components/hero-link';

export default function Hero() {
  return (
    <section id="hero" className="px-4 pt-20 pb-32">
      <div className="flex items-center gap-4">
        <Image
          src="https://assets.hdprajwal.dev/avatar.jpg"
          alt="Prajwal HD"
          width={48}
          height={48}
          priority
          className="size-12 rounded-md object-cover"
        />
        <h1 className="text-foreground-strong text-display">
          Hi, I&apos;m Prajwal
        </h1>
      </div>
      <div className="text-foreground text-body mt-6 space-y-4">
        <p>
          An AI engineer based in California. I build{' '}
          <HeroLink
            href="/projects"
            icon={<Sparkles className="size-3" />}
            tile="bg-linear-to-br from-violet-400 to-indigo-600"
            preview={{
              title: 'Projects',
              meta: 'All projects',
              body: 'Agent tooling and developer tools I have built, with live demos and writeups.',
            }}
          >
            AI agents and the developer tools around them
          </HeroLink>
          , right now{' '}
          <HeroLink
            href="https://emberd.hdprajwal.dev"
            icon={<Layers className="size-3" />}
            tile="bg-linear-to-b from-amber-400 to-orange-600"
            preview={{
              title: 'emberd',
              meta: 'emberd.hdprajwal.dev',
              body: 'Run untrusted AI-agent code in isolated microVMs you host yourself.',
              image: 'https://assets.hdprajwal.dev/projects/emberd.webp',
            }}
          >
            emberd
          </HeroLink>
          , a runtime that runs untrusted AI-agent code inside isolated
          microVMs. It&apos;s open source and self-hosted, so the code runs on
          your own machine inside your own network.
        </p>
        <p>
          Before this I spent{' '}
          <HeroLink
            href="/resume#experience"
            icon={
              <Image
                src="https://assets.hdprajwal.dev/logos/opslyft.png"
                alt=""
                width={18}
                height={18}
              />
            }
            tile="bg-[#0e1a22]"
            preview={{
              title: 'Opslyft',
              meta: '2021 to 2023',
              body: 'Cloud Engineer, and before that Software Development Engineer, on cloud cost and reliability.',
            }}
          >
            three years at Opslyft
          </HeroLink>{' '}
          on cloud cost and reliability systems, then a Master&apos;s on
          adversarial ML and{' '}
          <HeroLink
            href="#research"
            icon={<Bug className="size-3" />}
            tile="bg-linear-to-br from-rose-400 to-pink-600"
            preview={{
              title: 'Peer-reviewed paper',
              meta: 'Electronics, 2026',
              body: 'Re-Evaluating Android Malware Detection: Tabular Features, Vision Models, and Ensembles.',
            }}
          >
            Android malware detection
          </HeroLink>
          . At Opslyft that work saved enterprise AWS customers about $100K a
          month.
        </p>
        <p>
          I&apos;m open to full-time AI engineer, backend, and full-stack roles.
          If that sounds like your team, email me or book a call.
        </p>
      </div>
      <div className="text-meta mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link
          href="/resume"
          className="group text-foreground-strong decoration-accent-link hover:decoration-foreground-strong inline-flex items-center gap-1 underline underline-offset-4 transition-[text-decoration-color,scale] duration-160 ease-out active:scale-[0.97]"
        >
          Resume
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
        </Link>
        <Link
          href="/projects"
          className="text-muted-foreground hover:text-foreground transition-[color,scale] duration-160 ease-out active:scale-[0.97]"
        >
          View projects
        </Link>
        <Link
          href="mailto:hdprajwal01@gmail.com"
          className="text-muted-foreground hover:text-foreground transition-[color,scale] duration-160 ease-out active:scale-[0.97]"
        >
          Email
        </Link>
        <Link
          href="https://cal.com/hdprajwal/intro"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-[color,scale] duration-160 ease-out active:scale-[0.97]"
        >
          Book a call
        </Link>
        <span aria-hidden className="bg-border h-3 w-px" />
        <Link
          href="https://github.com/hdprajwal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-[color,scale] duration-160 ease-out active:scale-[0.97]"
          aria-label="GitHub"
        >
          <GithubIcon className="h-4 w-4" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/hdprajwal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-[color,scale] duration-160 ease-out active:scale-[0.97]"
          aria-label="LinkedIn"
        >
          <LinkedinIcon className="h-4 w-4" />
        </Link>
        <Link
          href="https://x.com/_hdprajwal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-[color,scale] duration-160 ease-out active:scale-[0.97]"
          aria-label="X/Twitter"
        >
          <TwitterIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
