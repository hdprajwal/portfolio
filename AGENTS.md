# AI Agent Guidelines for hdprajwal.dev

Next.js 16 (App Router) personal portfolio, blog, and TIL site.

**Stack**: TypeScript, React 19, Tailwind CSS v4, Base UI / shadcn-style primitives, MDX, pnpm, Vercel

## Project Structure

| Directory            | Purpose                                                              |
| -------------------- | -------------------------------------------------------------------- |
| `app/`               | App Router pages, root `layout.tsx`, `sitemap.ts`, `robots.ts`       |
| `app/(pages)/`       | User-facing routes (`about`, `blog`, `projects`, `tils`, `resume`, etc.) sharing a layout |
| `components/`        | Shared UI; feature folders: `blogs/`, `projects/`, `tils/`, `mdx/`, `ui/`, `icons/` |
| `content/`           | MDX content: `blog/`, `projects/`, `til/`                            |
| `lib/`               | Content loaders (`posts.ts`, `projects.ts`, `tils.ts`), `site.ts`, `utils.ts` |
| `public/`, `assets/` | Static files and local images                                        |

**Key files**: `next.config.mjs` (MDX + remote image allowlist), `components.json` (shadcn config), `.prettierrc`, `.eslintrc.json`, `lib/site.ts` (`baseUrl`)

## Content System

All long-form content is MDX with YAML frontmatter parsed by `gray-matter`. Each content type has a matching loader in `lib/` that follows the same shape: a typed record, a `list*` function wrapped in React's `cache()`, and a `get*(slug)` lookup.

| Type     | Directory           | Loader              | Exports                            |
| -------- | ------------------- | ------------------- | ---------------------------------- |
| Blog     | `content/blog/`     | `lib/posts.ts`      | `listPosts`, `getPost`, `Post`     |
| Project  | `content/projects/` | `lib/projects.ts`   | `listProjects`, `getProject`, `Project` |
| TIL      | `content/til/`      | `lib/tils.ts`       | `listTILs`, `getTIL`, `TIL`        |

MDX is rendered by `components/mdx/custom-mdx.tsx` using `next-mdx-remote/rsc` with `remark-gfm` and `@shikijs/rehype` (themes `github-light` / `github-dark`, dual-theme via `--shiki-*` CSS variables). Custom element mappings live in `components/mdx/mdx-components.tsx`.

### Adding a New Content Item

1. Create an `.mdx` file under the relevant `content/<type>/` directory.
2. Fill out frontmatter. Blog/TIL need at least `title`, `date`, `summary`/`description`, `tags`. Project frontmatter supports `name`, `tagline`, `description`, `tags`, `codeHref`, `liveHref`, `image`, `featured`, `date`.
3. Write dates as ISO `YYYY-MM-DD` (consumed by `new Date(...)` for sorting).
4. A project gets a dedicated `/projects/[slug]` page only when its MDX body is non-empty; `app/sitemap.ts` filters with `p.content?.trim()`.

### Adding a New Content Type

Mirror an existing loader in `lib/`, create the content directory and the `app/(pages)/<type>/` routes (`page.tsx` + `[slug]/page.tsx`), then wire the new list into `app/sitemap.ts`.

## Routing and SEO

- Public pages live under the `app/(pages)/` route group and share its `layout.tsx` (site header, footer, reading progress, scroll-to-top).
- Root `app/layout.tsx` owns `<html>`, Geist + Geist Mono fonts, `ThemeProvider` (`next-themes`, class-based dark mode), Vercel Analytics, and the top-level JSON-LD `@graph`.
- `app/sitemap.ts` and `app/robots.ts` generate SEO metadata. **Keep new routes in sync with `sitemap.ts`**.
- Canonical URL resolves through `lib/site.ts` `baseUrl` (`NEXT_PUBLIC_SITE_URL` → prod default `https://hdprajwal.dev` → `http://localhost:3000`). Use this constant; do not hardcode URLs.

## UI System

- `components/ui/` holds shadcn-style primitives. `components.json` style `base-nova`, base color `neutral`, icon library `lucide`. Several primitives are built on `@base-ui/react`.
- Tailwind v4 with no `tailwind.config.js`; theming lives in `app/globals.css` via `@theme`, CSS variables, and `@custom-variant` (including a class-based `dark` variant).
- Use `cn()` from `lib/utils.ts` (clsx + tailwind-merge) for conditional class composition.
- Remote images are restricted by `next.config.mjs` to `https://assets.hdprajwal.dev/**`. Add hostnames there before referencing new external image domains.

## UI Testing

When the user asks to test, verify, or check a UI change, use the **agent-browser** skill against the running dev server at `http://localhost:3000`. Do not claim a UI change works without visually verifying it.

The `agent-browser` skill is expected to be installed. If it is not available in the current session, stop and tell the user, and suggest installing it via the `find-skills` skill (or `/plugin`) before attempting UI verification. Do not fall back to `curl`, `fetch`, or other non-visual substitutes.

Baseline checklist for any UI task:

1. **Screenshot the affected page(s)** in both themes. The site defaults to system theme; toggle via the header theme switcher or set `localStorage.theme = 'dark' | 'light'` before reload to force a mode.
2. **Check both viewports**: a desktop width (e.g. 1280×800) and a mobile width (e.g. 390×844). The site is responsive and breaks frequently show up only at one size.
3. **Exercise the change, not just the landing state.** Click through nav, open the command menu (⌘K), hover interactive elements, scroll long pages (reading progress + scroll-to-top), follow internal links into `/blog/[slug]`, `/projects/[slug]`, `/tils/[slug]` where relevant.
4. **Watch for regressions** on sibling pages that share the edited component (site header, footer, MDX prose, cards). A change to `components/mdx/*` affects every blog/project/TIL detail page; a change to `components/ui/*` can ripple widely.
5. **Capture the console.** Flag hydration warnings, image-domain errors, 404s on MDX assets, and anything from `next-themes` mismatches.

If a visual check is not possible (e.g. change requires auth, external data, or a build-only code path), say so explicitly rather than declaring the task done.

## Coding Guidelines

- TypeScript strict mode; path alias `@/*` resolves to the repo root.
- kebab-case file naming for new files (existing PascalCase files like `Hero.tsx` may stay as-is when editing).
- Comments only for non-obvious "why"; no narration of what the code does.
- No emojis in code, copy, or commit messages.
- Tailwind v4 syntax; every UI must support light and dark mode.
- Prettier: single quotes, semicolons, 2 spaces, 80 cols, `prettier-plugin-tailwindcss` for class ordering.
- ESLint extends `next/core-web-vitals`.

## Commands

```bash
pnpm dev      # Next.js dev server (Turbopack) on localhost:3000
pnpm build    # Production build
pnpm start    # Serve production build
pnpm lint     # next lint
```

**A dev server is always running on `localhost:3000`.** Do not start one after making changes; hot reload will pick up edits. Only run `pnpm build` or `pnpm lint` when you need to verify types/build integrity.

No test suite, no separate type-check script; `pnpm build` exercises the TypeScript compiler.
