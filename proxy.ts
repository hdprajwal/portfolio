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
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response: NextResponse;
  if (wantsMarkdown(request.headers.get('accept'))) {
    const target = resolveMarkdownTarget(pathname);
    if (target.kind === 'not-found') {
      const body = markdownResponse(
        buildNotFoundMarkdown(pathname, baseUrl),
        404
      );
      return new NextResponse(body.body, body);
    }
    response =
      target.kind === 'markdown'
        ? NextResponse.rewrite(new URL(target.path, request.url))
        : NextResponse.next();
  } else {
    response = NextResponse.next();
  }
  response.headers.append('Vary', 'Accept');
  if (pathname === '/') response.headers.set('Link', HOME_LINK_HEADER);
  return response;
}

// Page paths only: skips Next internals, internal markdown routes, redirect links, and anything with a file extension.
export const config = {
  matcher: ['/((?!_next/|md/|\\.well-known/|.*\\.).*)'],
};
