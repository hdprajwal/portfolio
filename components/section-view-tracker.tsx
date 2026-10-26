'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

// Fires section_viewed once per section per pageview so drop-off along the
// home page is visible in PostHog funnels.
export default function SectionViewTracker() {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    const sections = document.querySelectorAll<HTMLElement>('main section[id]');
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          posthog.capture('section_viewed', {
            section: entry.target.id,
            path: window.location.pathname,
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return null;
}
