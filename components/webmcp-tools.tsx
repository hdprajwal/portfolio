'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import posthog from 'posthog-js';
import { searchContent, type ContentIndexItem } from '@/lib/content-index';
import { markdownPathFor } from '@/lib/agent-discovery';
import { resume } from '@/lib/resume';

type ToolInput = Record<string, unknown>;

type WebMCPTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean };
  execute: (input: ToolInput) => Promise<string>;
};

type ModelContext = {
  registerTool: (
    tool: WebMCPTool,
    options?: { signal?: AbortSignal }
  ) => Promise<void> | void;
};

// Spec puts the API on document; older Chrome builds put it on navigator.
function getModelContext(): ModelContext | null {
  const fromDocument = (document as Document & { modelContext?: ModelContext })
    .modelContext;
  const fromNavigator = (
    navigator as Navigator & { modelContext?: ModelContext }
  ).modelContext;
  return fromDocument ?? fromNavigator ?? null;
}

function toResult(item: ContentIndexItem, origin: string) {
  const url = `${origin}${item.href}`;
  return { ...item, url, markdownUrl: `${url}.md` };
}

// Internal paths only, so open_page can't be used to send visitors off-site.
function toInternalPath(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  if (!value.startsWith('/') || value.startsWith('//')) return null;
  return value;
}

// Registers WebMCP tools so browser agents can search, read, and navigate the site without scraping it.
export default function WebMCPTools({
  contentItems,
}: {
  contentItems: ContentIndexItem[];
}) {
  const router = useRouter();

  useEffect(() => {
    const modelContext = getModelContext();
    if (!modelContext) return;
    const controller = new AbortController();
    const origin = window.location.origin;

    const track = (tool: string) => {
      if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        posthog.capture('webmcp_tool_call', { tool });
      }
    };

    const tools: WebMCPTool[] = [
      {
        name: 'search_site',
        description:
          "Searches Prajwal HD's projects, blog posts, and TILs by keyword. Returns titles, summaries, tags, and URLs (including a markdown URL for each).",
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Keywords to match, e.g. "agents" or "malware".',
            },
            type: {
              type: 'string',
              enum: ['blog', 'project', 'til'],
              description: 'Only return this kind of content.',
            },
          },
          required: ['query'],
        },
        annotations: { readOnlyHint: true },
        execute: async ({ query, type }) => {
          track('search_site');
          const results = searchContent(
            contentItems,
            typeof query === 'string' ? query : '',
            type === 'blog' || type === 'project' || type === 'til'
              ? type
              : undefined
          );
          return JSON.stringify(results.map((item) => toResult(item, origin)));
        },
      },
      {
        name: 'read_page',
        description:
          'Returns the markdown text of a page on this site. Works for "/", "/resume", and "/blog/<slug>", "/projects/<slug>", "/tils/<slug>" paths.',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Site path, e.g. "/blog/r2-mailbox" or "/resume".',
            },
          },
          required: ['path'],
        },
        annotations: { readOnlyHint: true },
        execute: async ({ path }) => {
          track('read_page');
          const internal = toInternalPath(path);
          const target = internal ? markdownPathFor(internal) : null;
          if (!target) return `No markdown version for ${String(path)}.`;
          const response = await fetch(target);
          if (!response.ok) return `Page not found: ${internal}`;
          return response.text();
        },
      },
      {
        name: 'get_contact_info',
        description:
          'Returns how to reach Prajwal HD: email, GitHub, LinkedIn, and resume PDF.',
        inputSchema: { type: 'object', properties: {} },
        annotations: { readOnlyHint: true },
        execute: async () => {
          track('get_contact_info');
          return JSON.stringify({
            name: resume.name,
            headline: resume.headline,
            location: resume.location,
            email: resume.email,
            github: resume.github,
            linkedin: resume.linkedin,
            resumePdf: resume.pdfUrl,
          });
        },
      },
      {
        name: 'open_page',
        description:
          'Navigates the current tab to a page on this site, e.g. "/projects" or "/blog/r2-mailbox".',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Site path starting with "/".',
            },
          },
          required: ['path'],
        },
        execute: async ({ path }) => {
          track('open_page');
          const internal = toInternalPath(path);
          if (!internal) return 'Path must be on this site and start with "/".';
          router.push(internal);
          return `Opened ${internal}`;
        },
      },
    ];

    for (const tool of tools) {
      Promise.resolve()
        .then(() =>
          modelContext.registerTool(tool, { signal: controller.signal })
        )
        .catch(() => {});
    }

    return () => controller.abort();
  }, [contentItems, router]);

  return null;
}
