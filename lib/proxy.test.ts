import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { proxy } from '@/proxy';

function request(path: string, accept: string) {
  return new NextRequest(`https://example.com${path}`, { headers: { accept } });
}

afterEach(() => vi.unstubAllGlobals());

describe('proxy', () => {
  it('returns the homepage as markdown with Vary: Accept and the Link header', async () => {
    const fetchMock = vi.fn(
      async (_url: URL) => new Response('# Prajwal HD\n')
    );
    vi.stubGlobal('fetch', fetchMock);
    const res = await proxy(request('/', 'text/markdown'));
    expect(fetchMock.mock.calls[0]?.[0].toString()).toBe(
      'https://example.com/md/home'
    );
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toBe(
      'text/markdown; charset=utf-8'
    );
    expect(res.headers.get('vary')).toBe('Accept');
    expect(res.headers.get('x-markdown-tokens')).toBe('4');
    expect(res.headers.get('link')).toContain('rel="describedby"');
    expect(await res.text()).toBe('# Prajwal HD\n');
  });

  it('turns a missing content page into a markdown 404', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('gone', { status: 404 }))
    );
    const res = await proxy(request('/blog/nope', 'text/markdown'));
    expect(res.status).toBe(404);
    expect(res.headers.get('vary')).toBe('Accept');
    expect(await res.text()).toContain('# Page not found');
  });

  it('answers unknown paths with a markdown 404 without fetching', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const res = await proxy(request('/__probe', 'text/markdown'));
    expect(res.status).toBe(404);
    expect(res.headers.get('content-type')).toBe(
      'text/markdown; charset=utf-8'
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('lets HTML requests through untouched apart from Vary', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const res = await proxy(
      request('/', 'text/html,application/xhtml+xml,*/*;q=0.8')
    );
    expect(res.headers.get('x-middleware-next')).toBe('1');
    expect(res.headers.get('vary')).toBe('Accept');
    expect(res.headers.get('link')).toContain('/llms.txt');
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
