'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MapPin, Clock, Mail, User, Terminal, Globe } from 'lucide-react';
import BashTyping from './BashTyping';

const clockFmt = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'America/Indiana/Indianapolis',
});

export default function Hero() {
  const [showOutput, setShowOutput] = useState(false);
  const [now, setNow] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => setNow(clockFmt.format(new Date()));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="px-4 py-14 md:py-18">
        <div className="flex flex-col gap-5">
          <BashTyping prompt="whoami" onDone={() => setShowOutput(true)} />

          <div
            className={`space-y-5 transition-[opacity,transform] duration-500 ${
              showOutput
                ? 'translate-y-0 opacity-100'
                : 'translate-y-2 opacity-0'
            }`}
            aria-hidden={!showOutput}
          >
            <div>
              <h1 className="text-foreground text-2xl font-medium tracking-tight text-balance md:text-3xl">
                Hi, I&apos;m Prajwal
              </h1>
              <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed">
                Software engineer focused on backend systems and applied AI.
                Three years building production systems at Opslyft. I care more
                about how a system behaves under pressure than what it&apos;s
                built with.
              </p>
            </div>

            <div className="grid max-w-xl grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
              <div className="flex flex-col gap-2.5">
                <InfoItem icon={<User className="h-3.5 w-3.5" />}>
                  Software Engineer
                </InfoItem>
                <InfoItem icon={<MapPin className="h-3.5 w-3.5" />}>
                  Fort Wayne, IN
                </InfoItem>
                <InfoItem icon={<Mail className="h-3.5 w-3.5" />}>
                  <Link
                    href="mailto:hdprajwal01@gmail.com"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    hdprajwal01@gmail.com
                  </Link>
                </InfoItem>
                <InfoItem icon={<Globe className="h-3.5 w-3.5" />}>
                  <Link
                    href="#projects"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    hdprajwal.dev
                  </Link>
                </InfoItem>
              </div>
              <div className="flex flex-col gap-2.5">
                <AvailabilityItem />
                <InfoItem icon={<Clock className="h-4 w-4" />}>
                  {mounted ? now : '--:--'} ET
                </InfoItem>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoItem({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
      <span className="flex-shrink-0 opacity-60">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

function AvailabilityItem() {
  return (
    <div className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
      <div className="relative flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center">
        <span className="absolute inline-flex h-3.5 w-3.5 rounded-full bg-green-500 opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </div>
      <span>Open to collaboration</span>
    </div>
  );
}
