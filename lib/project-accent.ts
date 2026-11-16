// Per-project color, mirroring the hero link tiles. Class strings stay literal so Tailwind picks them up.
export const ACCENTS = {
  violet: {
    tile: 'bg-linear-to-br from-violet-400 to-indigo-600',
    wash: 'from-violet-500/15 via-indigo-500/5',
    ring: 'group-hover:ring-violet-500/40',
    dot: 'bg-violet-500',
    text: 'text-violet-600 dark:text-violet-400',
  },
  amber: {
    tile: 'bg-linear-to-b from-amber-400 to-orange-600',
    wash: 'from-amber-500/15 via-orange-500/5',
    ring: 'group-hover:ring-amber-500/40',
    dot: 'bg-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
  },
  rose: {
    tile: 'bg-linear-to-br from-rose-400 to-pink-600',
    wash: 'from-rose-500/15 via-pink-500/5',
    ring: 'group-hover:ring-rose-500/40',
    dot: 'bg-rose-500',
    text: 'text-rose-600 dark:text-rose-400',
  },
  emerald: {
    tile: 'bg-linear-to-br from-emerald-400 to-teal-600',
    wash: 'from-emerald-500/15 via-teal-500/5',
    ring: 'group-hover:ring-emerald-500/40',
    dot: 'bg-emerald-500',
    text: 'text-emerald-600 dark:text-emerald-400',
  },
  sky: {
    tile: 'bg-linear-to-br from-sky-400 to-blue-600',
    wash: 'from-sky-500/15 via-blue-500/5',
    ring: 'group-hover:ring-sky-500/40',
    dot: 'bg-sky-500',
    text: 'text-sky-600 dark:text-sky-400',
  },
  yellow: {
    tile: 'bg-linear-to-br from-yellow-300 to-amber-500',
    wash: 'from-yellow-400/15 via-amber-400/5',
    ring: 'group-hover:ring-yellow-500/40',
    dot: 'bg-yellow-400',
    text: 'text-yellow-600 dark:text-yellow-300',
  },
  fuchsia: {
    tile: 'bg-linear-to-br from-fuchsia-400 to-purple-600',
    wash: 'from-fuchsia-500/15 via-purple-500/5',
    ring: 'group-hover:ring-fuchsia-500/40',
    dot: 'bg-fuchsia-500',
    text: 'text-fuchsia-600 dark:text-fuchsia-400',
  },
  slate: {
    tile: 'bg-linear-to-br from-zinc-500 to-zinc-800',
    wash: 'from-zinc-500/15 via-zinc-500/5',
    ring: 'group-hover:ring-zinc-500/40',
    dot: 'bg-zinc-500',
    text: 'text-muted-foreground',
  },
} as const;

export type AccentName = keyof typeof ACCENTS;
export type Accent = (typeof ACCENTS)[AccentName];

const ROTATION: AccentName[] = [
  'violet',
  'amber',
  'rose',
  'emerald',
  'sky',
  'fuchsia',
  'yellow',
];

// Frontmatter `accent` wins; otherwise the slug hashes to a stable pick so every project still gets a color.
export function resolveAccent(project: {
  slug: string;
  accent?: string;
}): Accent {
  if (project.accent && Object.hasOwn(ACCENTS, project.accent)) {
    return ACCENTS[project.accent as AccentName];
  }
  let hash = 0;
  for (const ch of project.slug) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return ACCENTS[ROTATION[hash % ROTATION.length]];
}
