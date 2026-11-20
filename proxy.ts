import { NextResponse, type NextRequest } from 'next/server';
import {
  buildNotFoundMarkdown,
  HOME_LINK_HEADER,
  markdownResponse,
  resolveMarkdownTarget,
  wantsMarkdown,
} from '@/lib/agent-discovery';
import { baseUrl } from '@/lib/site';

// Content negotiation for agents: markdown pages and markdown 404s for Accept: text/markdown, plus the homepage Link header.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const target = wantsMarkdown(request.headers.get('accept'))
    ? resolveMarkdownTarget(pathname)
    : { kind: 'html' as const };

  if (target.kind === 'not-found') {
    return withHomeLink(
      pathname,
      toNextResponse(
        markdownResponse(buildNotFoundMarkdown(pathname, baseUrl), 404)
      )
    );
  }

  if (target.kind === 'markdown') {
    // Fetched and rewrapped instead of rewritten: Vercel's cached copy of the static /md route drops Vary: Accept.
    const upstream = await fetch(new URL(target.path, request.url));
    const markdown = upstream.ok
      ? await upstream.text()
      : buildNotFoundMarkdown(pathname, baseUrl);
    return withHomeLink(
      pathname,
      toNextResponse(markdownResponse(markdown, upstream.ok ? 200 : 404))
    );
  }

  const response = NextResponse.next();
  response.headers.append('Vary', 'Accept');
  return withHomeLink(pathname, response);
}

function toNextResponse(response: Response): NextResponse {
  return new NextResponse(response.body, response);
}

function withHomeLink(pathname: string, response: NextResponse): NextResponse {
  if (pathname === '/') response.headers.set('Link', HOME_LINK_HEADER);
  return response;
}

// Page paths only: skips Next internals, internal markdown routes, and anything with a file extension.
export const config = {
  matcher: ['/((?!_next/|md/|\\.well-known/|.*\\.).*)'],
};
