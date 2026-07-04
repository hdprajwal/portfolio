import posthog from 'posthog-js';

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (key) {
  posthog.init(key, {
    // PostHog-hosted reverse proxy on our subdomain so blockers don't drop events.
    api_host: 'https://ingest.hdprajwal.dev',
    ui_host: 'https://us.posthog.com',
    // Dated default set; auto-captures pageviews and pageleaves.
    defaults: '2026-01-30',
  });
}
