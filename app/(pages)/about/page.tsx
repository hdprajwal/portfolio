import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex-1">
      <div className="px-4 py-14">
        <h1 className="text-xl font-medium tracking-tight text-balance sm:text-2xl">
          About
        </h1>
        <p className="text-muted-foreground pt-2 text-sm">
          Who I am, what I do, and what I care about.
        </p>
      </div>

      <section className="mb-8 px-4">
        <h2 className="mb-2 font-semibold">Background</h2>
        <div className="text-muted-foreground space-y-2 text-sm">
          <p>
            I&apos;m Prajwal. Software engineer with a background in CS and a
            strong lean toward security and systems work.
          </p>
          <p>
            Before grad school, I spent close to three years as a software and
            cloud engineer at Opslyft. I learned a lot there - production
            systems, customer-facing architecture, real constraints. Then I went
            back to do my Master&apos;s at Purdue Fort Wayne, where I spent the
            last year researching adversarial ML and malware detection under Dr.
            Zesheng Chen.
          </p>
          <p>
            Dr. Chen had one question he kept asking: &quot;Why are you assuming
            that&apos;s the right approach?&quot; That question changed how I
            think about almost everything.
          </p>
        </div>
      </section>

      <section className="mb-8 px-4">
        <h2 className="mb-2 font-semibold">How I Think About Building</h2>
        <div className="text-muted-foreground space-y-2 text-sm">
          <p>
            I don&apos;t have a favorite language or a preferred stack. Python,
            Go, Rust, AWS - none of them are sacred. I use whatever fits the
            problem.
          </p>
          <p>
            What I care about is writing code the next person can read without
            wanting to rewrite it, and building systems that fail loudly instead
            of quietly. Silent failures are the worst kind. Complexity is a
            cost. I try not to spend it unless I&apos;m getting something real
            back.
          </p>
        </div>
      </section>

      <section className="mb-8 px-4">
        <h2 className="mb-2 font-semibold">Outside the Terminal</h2>
        <div className="text-muted-foreground space-y-2 text-sm">
          <p>
            Gym and books. Not things I decided to be into - just things that
            stuck around. The gym taught me something about consistency that I
            haven&apos;t been able to learn any other way.
          </p>
          <p>
            The books I keep coming back to are the ones that change how I
            think, not just what I know. Kahneman on how we reason, Newport on
            how to actually do deep work, Aurelius on not complaining about
            things outside your control. That kind of reading compounds in a way
            that technical books alone don&apos;t.
          </p>
        </div>
      </section>

      <section className="mb-8 px-4">
        <h2 className="mb-2 font-semibold">More</h2>
        <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
          <Link
            href="/now"
            className="text-primary hover:text-primary/80 transition-colors hover:underline"
          >
            Now <ArrowRight className="inline-block size-4" />
          </Link>
          <Link
            href="/resume"
            className="text-primary hover:text-primary/80 transition-colors hover:underline"
          >
            Resume <ArrowRight className="inline-block size-4" />
          </Link>
          <Link
            href="/projects"
            className="text-primary hover:text-primary/80 transition-colors hover:underline"
          >
            Projects <ArrowRight className="inline-block size-4" />
          </Link>
          <Link
            href="/blog"
            className="text-primary hover:text-primary/80 transition-colors hover:underline"
          >
            Blog <ArrowRight className="inline-block size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Prajwal - background, experience, and interests.',
};
