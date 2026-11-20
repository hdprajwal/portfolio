export const CONTENT_SIGNAL = 'search=yes, ai-input=yes, ai-train=no';
export const SKILLS_INDEX_PATH = '/.well-known/agent-skills/index.json';
export const SKILL_NAME = 'read-hdprajwal-dev';
export const SKILL_PATH = `/.well-known/agent-skills/${SKILL_NAME}/SKILL.md`;
const SKILLS_SCHEMA =
  'https://schemas.agentskills.io/discovery/0.2.0/schema.json';

function qualityOf(accept: string, mediaType: string): number {
  let best = 0;
  for (const part of accept.split(',')) {
    const [type, ...params] = part.trim().toLowerCase().split(';');
    const name = type.trim();
    if (name !== mediaType) continue;
    const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
    const value = q ? Number(q.slice(2)) : 1;
    if (Number.isFinite(value)) best = Math.max(best, value);
  }
  return best;
}

// True when Accept lists text/markdown with a q at least as high as text/html; wildcards don't count.
export function wantsMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  const markdown = qualityOf(accept, 'text/markdown');
  return markdown > 0 && markdown >= qualityOf(accept, 'text/html');
}

function normalizePath(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}

// Maps an HTML page path to the internal route that renders its markdown, or null if it has none.
export function markdownPathFor(pathname: string): string | null {
  const path = normalizePath(pathname);
  if (path === '/') return '/md/home';
  if (path === '/resume') return '/md/resume';
  const match = path.match(/^\/(blog|projects|tils)\/([^/.]+)$/);
  return match ? `/md/${match[1]}/${match[2]}` : null;
}

// Pages that exist but only render as HTML; keep in sync with app/(pages) (a test checks this).
const HTML_ONLY_PATHS = new Set([
  '/blog',
  '/projects',
  '/tils',
  '/bucket-list',
  '/colophon',
  '/components',
  '/reinvent',
]);
const HTML_ONLY_PATTERNS = [
  /^\/hi\/[^/]+$/,
  /^\/r\/[^/]+$/,
  /(^|\/)(opengraph-image|twitter-image|icon|apple-icon)[^/]*$/,
];

export type MarkdownTarget =
  | { kind: 'markdown'; path: string }
  | { kind: 'html' }
  | { kind: 'not-found' };

// Decides what a markdown-preferring request to a page path should get.
export function resolveMarkdownTarget(pathname: string): MarkdownTarget {
  const markdownPath = markdownPathFor(pathname);
  if (markdownPath) return { kind: 'markdown', path: markdownPath };
  const path = normalizePath(pathname);
  if (
    HTML_ONLY_PATHS.has(path) ||
    HTML_ONLY_PATTERNS.some((re) => re.test(path))
  ) {
    return { kind: 'html' };
  }
  return { kind: 'not-found' };
}

export function buildNotFoundMarkdown(
  pathname: string,
  siteUrl: string
): string {
  const path = pathname.replace(/[`\n\r]/g, '');
  return `# Page not found

There is no page at \`${path}\` on this site. It may have moved, or the link may have a typo.

- [Site index with every page (llms.txt)](${siteUrl}/llms.txt)
- [Sitemap](${siteUrl}/sitemap.xml)
- [Home page](${siteUrl}/)
`;
}

// Rough token count (about 4 characters per token) for the x-markdown-tokens header.
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export function markdownResponse(markdown: string, status = 200): Response {
  return new Response(markdown, {
    status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': String(estimateTokens(markdown)),
      Vary: 'Accept',
      'Cache-Control':
        status === 200
          ? 'public, s-maxage=3600, stale-while-revalidate=86400'
          : 'public, max-age=0, must-revalidate',
    },
  });
}

// RFC 8288 Link header for the homepage, pointing agents at machine-readable views of the site.
export const HOME_LINK_HEADER = [
  '</llms.txt>; rel="describedby"; type="text/plain"',
  `<${SKILLS_INDEX_PATH}>; rel="describedby"; type="application/json"`,
  '</>; rel="alternate"; type="text/markdown"',
  '</rss.xml>; rel="alternate"; type="application/rss+xml"',
].join(', ');

export function buildRobotsTxt(siteUrl: string): string {
  return [
    'User-agent: *',
    `Content-Signal: ${CONTENT_SIGNAL}`,
    'Allow: /',
    'Disallow: /r/',
    'Disallow: /hi/',
    '',
    `Host: ${siteUrl}`,
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
  ].join('\n');
}

export function buildSkillMarkdown(siteUrl: string): string {
  return `---
name: ${SKILL_NAME}
description: Read Prajwal HD's portfolio (projects, blog posts, TILs, resume) as markdown, plus contact details.
---

# Reading hdprajwal.dev

This is the personal site of Prajwal HD, an AI engineer who also does backend and full-stack work. Everything on it is public and read-only. There is no API and no login.

## Start here

- ${siteUrl}/llms.txt lists every project, post, and TIL with a one-line summary and a markdown link.
- ${siteUrl}/llms-full.txt has the whole site, resume included, in one file.

## Get any page as markdown

Either add \`.md\` to a content URL, or send \`Accept: text/markdown\`:

- \`${siteUrl}/blog/<slug>.md\`
- \`${siteUrl}/projects/<slug>.md\`
- \`${siteUrl}/tils/<slug>.md\`
- \`${siteUrl}/\` and \`${siteUrl}/resume\` with \`Accept: text/markdown\`

Responses carry an \`x-markdown-tokens\` header with a rough token count.

## Other feeds

- RSS: ${siteUrl}/rss.xml
- Sitemap: ${siteUrl}/sitemap.xml

## In the browser

Pages register WebMCP tools (\`search_site\`, \`read_page\`, \`get_contact_info\`, \`open_page\`) when \`document.modelContext\` is available.

## Usage

Quoting and summarizing pages for a user is fine. Please don't use the content for model training (\`Content-Signal: ${CONTENT_SIGNAL}\` in robots.txt).
`;
}

// Web Crypto keeps this module importable from client components too.
export async function sha256Digest(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  const hex = Array.from(new Uint8Array(hash), (b) =>
    b.toString(16).padStart(2, '0')
  ).join('');
  return `sha256:${hex}`;
}

export async function buildSkillsIndex(siteUrl: string) {
  return {
    $schema: SKILLS_SCHEMA,
    skills: [
      {
        name: SKILL_NAME,
        type: 'skill-md',
        description:
          "Read Prajwal HD's portfolio (projects, blog posts, TILs, resume) as markdown, plus contact details.",
        url: `${siteUrl}${SKILL_PATH}`,
        digest: await sha256Digest(buildSkillMarkdown(siteUrl)),
      },
    ],
  };
}
