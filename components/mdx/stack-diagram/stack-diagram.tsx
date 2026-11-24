// Hand-placed architecture diagram: absolutely positioned HTML nodes and groups with one SVG overlay for the edges, styled with the site's tokens and type roles.
import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { ICONS, type IconName } from './icons';

export type DiagramRole = string | { code: string };

export type DiagramNode = {
  cx: number;
  top: number;
  icon: IconName;
  name: string;
  roles?: DiagramRole[];
  highlight?: boolean;
};

export type GroupVariant = 'neutral' | 'accent' | 'vendor' | 'vendor-nested';

export type DiagramGroup = {
  label: string;
  icon?: IconName;
  variant: GroupVariant;
  left: number;
  top: number;
  width: number;
  height: number;
};

export type EdgeKind = 'primary' | 'internal' | 'setup';

export type DiagramEdge = {
  d: string;
  kind: EdgeKind;
  label?: { text: string; x: number; y: number; anchor?: 'start' | 'end' };
};

export type DiagramSpec = {
  id: string;
  description: string;
  width: number;
  height: number;
  groups: DiagramGroup[];
  edges: DiagramEdge[];
  nodes: DiagramNode[];
  legend: { kind: EdgeKind; text: string }[];
};

// The accent is the site's own link accent; only the Cloudflare orange is new. Fills are mixed into the page background so they stay opaque and the dot grid never sits behind group text.
const CSS = `
.stack-diagram {
  --sd-accent: var(--accent-link);
  --sd-accent-fill: color-mix(in oklab, var(--sd-accent) 6%, var(--background));
  --sd-accent-border: color-mix(in oklab, var(--sd-accent) 35%, var(--background));
  --sd-vendor: oklch(0.7 0.17 52);
  --sd-vendor-fill: color-mix(in oklab, var(--sd-vendor) 6%, var(--background));
  --sd-vendor-border: color-mix(in oklab, var(--sd-vendor) 40%, var(--background));
  --sd-dot: color-mix(in oklab, var(--muted-foreground) 14%, transparent);
}
.dark .stack-diagram {
  --sd-accent-fill: color-mix(in oklab, var(--sd-accent) 12%, var(--background));
  --sd-accent-border: color-mix(in oklab, var(--sd-accent) 45%, var(--background));
  --sd-vendor: oklch(0.74 0.16 55);
  --sd-vendor-fill: color-mix(in oklab, var(--sd-vendor) 10%, var(--background));
  --sd-vendor-border: color-mix(in oklab, var(--sd-vendor) 45%, var(--background));
}
`;

const DOT_GRID: CSSProperties = {
  backgroundImage:
    'radial-gradient(circle, var(--sd-dot) 0.75px, transparent 1.25px)',
  backgroundSize: '20px 20px',
};

const GROUP: Record<GroupVariant, string> = {
  neutral: 'border-border bg-muted',
  accent: 'border-(--sd-accent-border) bg-(--sd-accent-fill)',
  vendor: 'border-(--sd-vendor-border) bg-(--sd-vendor-fill)',
  'vendor-nested': 'border-(--sd-vendor-border) bg-background',
};

type Tone = 'accent' | 'muted';

const TONE: Record<Tone, string> = {
  accent: 'var(--sd-accent)',
  muted: 'var(--muted-foreground)',
};

const EDGE: Record<EdgeKind, { tone: Tone; width: number; dash?: string }> = {
  primary: { tone: 'accent', width: 1.5 },
  internal: { tone: 'muted', width: 1 },
  setup: { tone: 'muted', width: 1, dash: '4 4' },
};

function Icon({ name, className }: { name: IconName; className?: string }) {
  const icon = ICONS[name];
  if (icon.kind === 'line') {
    return <icon.Icon aria-hidden strokeWidth={1.5} className={className} />;
  }
  if (icon.kind === 'brand') {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- inline data URI, nothing to optimize
      <img src={icon.src} alt="" className={cn('object-contain', className)} />
    );
  }
  const mask = `url("${icon.src}")`;
  return (
    <span
      aria-hidden
      className={cn(
        'inline-block bg-current mask-contain mask-center mask-no-repeat',
        className
      )}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    />
  );
}

function tileIconSize(name: IconName) {
  const icon = ICONS[name];
  if (icon.kind === 'line') return 'size-5';
  return 'wide' in icon ? 'h-4 w-8' : 'size-6';
}

function Node({ node }: { node: DiagramNode }) {
  return (
    <div
      className="absolute flex -translate-x-1/2 flex-col items-center text-center whitespace-nowrap"
      style={{ left: node.cx, top: node.top }}
    >
      <div
        className={cn(
          'grid size-12 place-items-center rounded-md border',
          node.highlight
            ? 'border-(--sd-accent) bg-(--sd-accent) text-white'
            : 'border-border bg-background text-foreground'
        )}
      >
        <Icon name={node.icon} className={tileIconSize(node.icon)} />
      </div>
      <div className="text-foreground-strong text-title mt-2">{node.name}</div>
      {node.roles?.map((role) =>
        typeof role === 'string' ? (
          <div key={role} className="text-muted-foreground text-meta">
            {role}
          </div>
        ) : (
          <div
            key={role.code}
            className="text-muted-foreground text-meta font-mono"
          >
            {role.code}
          </div>
        )
      )}
    </div>
  );
}

export function StackDiagram({ spec }: { spec: DiagramSpec }) {
  const marker = (tone: Tone) => `sd-arrow-${spec.id}-${tone}`;
  return (
    <figure className="stack-diagram not-typeset border-border my-7 max-w-full overflow-hidden rounded-md border">
      <style href="stack-diagram" precedence="default">
        {CSS}
      </style>
      <div className="overflow-x-auto">
        {/* The grid lives on a layer at least as wide as the canvas so the dots scroll with the content on narrow screens. */}
        <div className="w-max min-w-full" style={DOT_GRID}>
          <div
            className="relative mx-auto"
            role="img"
            aria-label={spec.description}
            style={{ width: spec.width, height: spec.height }}
          >
            {spec.groups.map((g) => (
              <div
                key={g.label}
                className={cn('absolute rounded-md border', GROUP[g.variant])}
                style={{
                  left: g.left,
                  top: g.top,
                  width: g.width,
                  height: g.height,
                }}
              >
                <div className="text-muted-foreground text-eyebrow absolute top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap">
                  {g.icon ? <Icon name={g.icon} className="h-3 w-6" /> : null}
                  {g.label}
                </div>
              </div>
            ))}
            <svg
              className="pointer-events-none absolute inset-0"
              width={spec.width}
              height={spec.height}
              viewBox={`0 0 ${spec.width} ${spec.height}`}
              fill="none"
              aria-hidden="true"
            >
              <defs>
                {(['accent', 'muted'] as const).map((tone) => (
                  <marker
                    key={tone}
                    id={marker(tone)}
                    viewBox="0 0 10 10"
                    refX="10"
                    refY="5"
                    markerUnits="userSpaceOnUse"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto"
                  >
                    <path d="M0 1 L10 5 L0 9 z" style={{ fill: TONE[tone] }} />
                  </marker>
                ))}
              </defs>
              {spec.edges.map((e) => (
                <path
                  key={e.d}
                  d={e.d}
                  style={{ stroke: TONE[EDGE[e.kind].tone] }}
                  strokeWidth={EDGE[e.kind].width}
                  strokeDasharray={EDGE[e.kind].dash}
                  markerEnd={`url(#${marker(EDGE[e.kind].tone)})`}
                />
              ))}
              {spec.edges.map((e) =>
                e.label ? (
                  <text
                    key={`${e.d}-label`}
                    className="fill-muted-foreground text-meta"
                    x={e.label.x}
                    y={e.label.y}
                    textAnchor={e.label.anchor ?? 'middle'}
                  >
                    {e.label.text}
                  </text>
                ) : null
              )}
            </svg>
            {spec.nodes.map((n) => (
              <Node key={n.name} node={n} />
            ))}
          </div>
        </div>
      </div>
      <figcaption className="border-border bg-muted/40 text-muted-foreground text-meta flex flex-wrap items-center gap-x-6 gap-y-1 border-t px-4 py-2">
        {spec.legend.map((item) => (
          <span key={item.text} className="inline-flex items-center gap-2">
            <svg width="28" height="8" viewBox="0 0 28 8" aria-hidden="true">
              <path
                d="M0 4 H28"
                style={{ stroke: TONE[EDGE[item.kind].tone] }}
                strokeWidth={EDGE[item.kind].width}
                strokeDasharray={EDGE[item.kind].dash}
              />
            </svg>
            {item.text}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
