'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';
import { classifyLink, CONTACT_EMAIL, isEmailCopy } from '@/lib/tracking';
import { resume } from '@/lib/resume';

// Delegated listener that turns outbound/resume link clicks into named
// PostHog events, so funnels don't have to lean on noisy autocapture.
export default function TrackingEvents() {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      const anchor = target?.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      const event = classifyLink(href, window.location.hostname, resume.pdfUrl);
      if (event) posthog.capture(event.name, event.properties);
    };
    const onCopy = () => {
      const selection = document.getSelection()?.toString() ?? '';
      if (isEmailCopy(selection, CONTACT_EMAIL)) {
        posthog.capture('copy_email', { via: 'selection' });
      }
    };
    document.addEventListener('click', onClick, { capture: true });
    document.addEventListener('copy', onCopy);
    return () => {
      document.removeEventListener('click', onClick, { capture: true });
      document.removeEventListener('copy', onCopy);
    };
  }, []);

  return null;
}
