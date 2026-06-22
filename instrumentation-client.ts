import posthog from 'posthog-js';

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (key) {
  posthog.init(key, {
    // Managed reverse proxy on our own subdomain so ad/tracker blockers don't
    // drop events. PostHog hosts the proxy; DNS CNAME points at PostHog US.
    api_host: 'https://ingest.hdprajwal.dev',
    ui_host: 'https://us.posthog.com',
    // Auto-captures pageviews + pageleaves (incl. App Router SPA navigation),
    // which powers PostHog Web Analytics. Pins behavior to a dated default set.
    defaults: '2026-01-30',
  });
}
