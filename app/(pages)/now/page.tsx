import type { Metadata } from 'next';

export default function NowPage() {
  return (
    <div className="flex-1">
      <div className="px-4 py-14">
        <h1 className="text-xl font-medium tracking-tight text-balance sm:text-2xl">
          Now
        </h1>
        <p className="text-muted-foreground pt-2 text-sm">
          What I'm focused on right now.
        </p>
      </div>

      <section className="mb-8 px-4">
        <h2 className="mb-2 font-semibold md:text-lg">Building</h2>
        <div className="text-muted-foreground space-y-2 text-sm">
          <p>
            Two things right now. A private tunneling service - like ngrok, but
            running on my own VPS. No third-party relay, no subscription. I
            don&apos;t like traffic going places I can&apos;t see.
          </p>
          <p>
            The other is a personal dashboard to track what I&apos;m working on
            and how things are going. One&apos;s in Go, the other TypeScript.
            Both are things I actually need, which makes them easier to finish.
          </p>
          <p>
            Also picking up Rust. No clear reason - I just got tired of avoiding
            it. The ownership model breaks your brain in ways that turn out to
            be useful.
          </p>
        </div>
      </section>

      <section className="mb-8 px-4">
        <h2 className="mb-2 font-semibold md:text-lg">Just Finished</h2>
        <div className="text-muted-foreground space-y-2 text-sm">
          <p>Wrapped up my MS in Computer Science at Purdue Fort Wayne.</p>
          <p>
            The thesis was on Android malware detection - specifically whether
            tabular features or visual representations work better, and whether
            that holds up under adversarial conditions rather than just clean
            benchmark data. Turns out the simpler, more thoughtful approach beat
            the trendy one. Dr. Chen kept asking why I was assuming things. That
            stuck.
          </p>
          <p>Glad it&apos;s done. Ready to build things that actually ship.</p>
        </div>
      </section>

      <section className="mb-8 px-4">
        <h2 className="mb-2 font-semibold md:text-lg">Everything Else</h2>
        <div className="text-muted-foreground space-y-2 text-sm">
          <p>
            Gym every day. More coffee than I probably need. Reading when I have
            the patience for it - mostly technical, sometimes not. Trying to
            keep the number of things I&apos;m doing at once low enough to
            actually finish any of them.
          </p>
          <p className="font-mono text-xs opacity-70">Last updated: Feb 2026</p>
        </div>
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Now',
  description:
    'What Prajwal is working on, learning, and focused on right now.',
};
