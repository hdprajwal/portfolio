const CAMPAIGN_CODE_PATTERN = /^[a-z0-9-]{1,64}$/;

export function campaignRedirectPath(code: string): string | null {
  const normalized = code.toLowerCase();
  if (!CAMPAIGN_CODE_PATTERN.test(normalized)) return null;
  return `/?utm_source=application&utm_campaign=${normalized}`;
}

export const CONTACT_EMAIL = 'hdprajwal01@gmail.com';

export function isEmailCopy(copiedText: string, email: string): boolean {
  return copiedText.toLowerCase().includes(email.toLowerCase());
}

export type LinkEvent = {
  name: 'resume_download' | 'outbound_click';
  properties: Record<string, string>;
};

export function classifyLink(
  href: string,
  siteHost: string,
  resumePdfUrl: string
): LinkEvent | null {
  if (href === resumePdfUrl) {
    return { name: 'resume_download', properties: { url: href } };
  }
  if (href.startsWith('mailto:')) {
    return {
      name: 'outbound_click',
      properties: { url: href, domain: '', kind: 'mailto' },
    };
  }
  let url: URL;
  try {
    url = new URL(href, `https://${siteHost}`);
  } catch {
    return null;
  }
  if (!url.protocol.startsWith('http') || url.hostname === siteHost) {
    return null;
  }
  return {
    name: 'outbound_click',
    properties: { url: href, domain: url.hostname, kind: 'external' },
  };
}
