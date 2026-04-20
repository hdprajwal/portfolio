# Portfolio Website

A minimal, terminal-themed personal site for projects, writing, and TILs.

Live: [hdprajwal.dev](https://hdprajwal.dev)

[![screenshot-dark](https://assets.hdprajwal.dev/images/screenshots/home-dark.png#gh-dark-mode-only)](https://hdprajwal.dev#gh-dark-mode-only)
[![screenshot-light](https://assets.hdprajwal.dev/images/screenshots/home-light.png#gh-light-mode-only)](https://hdprajwal.dev#gh-light-mode-only)

## Stack

- Next.js 16 (App Router) with React 19 and TypeScript
- Tailwind CSS v4 with class-based light / dark mode
- MDX for content, rendered with `next-mdx-remote` and Shiki
- Deployed on Vercel

## Features

- Light and dark themes driven by `next-themes`
- Long-form content as MDX: blog posts, project writeups, and TILs
- Syntax-highlighted code blocks via Shiki (GitHub light / dark)
- SEO ready: JSON-LD `@graph`, dynamic `sitemap.xml`, `robots.txt`, per-route metadata
- Reading progress bar and scroll-to-top for long posts
- Command menu for quick navigation
- Responsive across desktop and mobile
- Vercel Analytics

## Content

All long-form content lives under `content/` as MDX files with YAML frontmatter:

- `content/blog/` for blog posts
- `content/projects/` for project writeups (supports `featured`, tags, live and code links, cover image)
- `content/til/` for today-I-learned snippets

Each type has a typed loader in `lib/` (`posts.ts`, `projects.ts`, `tils.ts`) wrapped in React's `cache()`. Rendering goes through `components/mdx/custom-mdx.tsx` with `remark-gfm` and `@shikijs/rehype`. Custom element mappings live in `components/mdx/mdx-components.tsx`.

## AI Agent Guidelines

LLM coding agents working in this repo should read [AGENTS.md](./AGENTS.md). `CLAUDE.md` points at the same file.

## Development

```bash
pnpm install
pnpm dev      # dev server on localhost:3000
pnpm build    # production build
pnpm start    # serve the production build
pnpm lint     # next lint
```

## Deployment

Deployed on Vercel. Push to `main` triggers a production deploy. Self-host with `pnpm build && pnpm start`.

## License

MIT. See [LICENSE](./LICENSE).
