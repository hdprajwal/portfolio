// A port of the stack-diagram skill's HTML template (github.com/caru-ini/stack-diagram)
// to a React component. Geometry follows the skill's references/geometry.md: hand-placed
// absolute coordinates, nodes are a 60px tile plus text, edges are one SVG overlay.
// Theme tokens are copied from the template; dark mode follows the site's `.dark` class.
import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { ICONS, type IconName } from './icons';

export type DiagramNode = {
  cx: number;
  top: number;
  icon: IconName;
  name: string;
  roles?: string[];
  width?: number;
  wideIcon?: boolean;
  highlight?: boolean;
};

export type DiagramGroup = {
  label: string;
  icon?: IconName;
  variant: 'accent' | 'vendor' | 'vendor-nested' | 'neutral';
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

const NODE_WIDTH = 132;

const CSS = `
.sd {
  --sd-paper: oklch(98.5% 0.004 250);
  --sd-paper-2: oklch(96.5% 0.005 252);
  --sd-rule: oklch(93% 0.007 255);
  --sd-rule-2: oklch(83% 0.011 255);
  --sd-muted: oklch(56% 0.013 255);
  --sd-neutral: oklch(46% 0.015 255);
  --sd-ink: oklch(24% 0.02 258);
  --sd-accent: oklch(58% 0.2 256);
  --sd-g1: oklch(68% 0.15 55);
  --sd-g1-soft: oklch(78% 0.12 55);
  --sd-g1-ink: oklch(52% 0.14 50);
  --sd-g1-tint: oklch(96.5% 0.015 60 / 0.5);
  --sd-accent-soft: oklch(58% 0.2 256 / 0.45);
  --sd-accent-tint: oklch(97% 0.012 256 / 0.5);
  --sd-veil: oklch(98.5% 0.004 250 / 0.78);
  margin: 1.75rem 0;
  color: var(--sd-ink);
}
.dark .sd {
  --sd-paper: oklch(18% 0.012 255);
  --sd-paper-2: oklch(22% 0.014 255);
  --sd-rule: oklch(24% 0.013 255);
  --sd-rule-2: oklch(38% 0.018 255);
  --sd-muted: oklch(65% 0.014 255);
  --sd-neutral: oklch(72% 0.012 255);
  --sd-ink: oklch(94% 0.008 255);
  --sd-accent: oklch(70% 0.16 256);
  --sd-g1: oklch(70% 0.14 55);
  --sd-g1-soft: oklch(58% 0.11 55);
  --sd-g1-ink: oklch(78% 0.12 55);
  --sd-g1-tint: oklch(26% 0.03 60 / 0.4);
  --sd-accent-soft: oklch(70% 0.16 256 / 0.5);
  --sd-accent-tint: oklch(28% 0.045 256 / 0.35);
  --sd-veil: oklch(18% 0.012 255 / 0.78);
}
/* Inset outline instead of a border: the 640px canvas fills the 640px prose column exactly. */
.sd-scroller { overflow-x: auto; outline: 1px solid var(--sd-rule-2); outline-offset: -1px; border-radius: 10px; }
.sd-canvas {
  position: relative; margin: 0 auto; background-color: var(--sd-paper);
  background-image:
    linear-gradient(var(--sd-rule) 1px, transparent 1px),
    linear-gradient(90deg, var(--sd-rule) 1px, transparent 1px);
  background-size: 24px 24px; background-position: -1px -1px;
}
.sd-group { position: absolute; border-radius: 12px; }
.sd-group.accent { border: 1.5px solid var(--sd-accent-soft); background: var(--sd-accent-tint); }
.sd-group.vendor { border: 1.5px solid var(--sd-g1); background: var(--sd-g1-tint); }
.sd-group.vendor-nested { border: 1.5px dashed var(--sd-g1-soft); }
.sd-group.neutral { border: 1.5px solid var(--sd-rule-2); background: var(--sd-paper-2); }
.sd-g-label {
  position: absolute; top: 12px; left: 12px; display: flex; align-items: center; gap: 6px;
  font-family: var(--font-sans), system-ui, sans-serif; font-size: 12px; font-weight: 600;
  line-height: 1.2; color: var(--sd-neutral); white-space: nowrap;
}
.sd-g-label img { width: 22px; height: 14px; object-fit: contain; }
.sd-group.accent > .sd-g-label { color: var(--sd-accent); }
.sd-group.vendor > .sd-g-label, .sd-group.vendor-nested > .sd-g-label { color: var(--sd-g1-ink); }
.sd-node { position: absolute; text-align: center; }
.sd-tile {
  width: 60px; height: 60px; margin: 0 auto; border-radius: 12px; background: #fff;
  border: 1px solid var(--sd-rule-2); display: grid; place-items: center;
  box-shadow: 0 1px 2px oklch(24% 0.02 258 / 0.05);
}
.sd-tile img { width: 34px; height: 34px; object-fit: contain; }
.sd-tile.wide img { width: 44px; }
.sd-node.highlight .sd-tile { border: 2px solid var(--sd-accent); box-shadow: 0 0 0 4px var(--sd-accent-tint); }
.sd-node.highlight .sd-name { color: var(--sd-accent); }
.sd-name {
  font-family: var(--font-sans), system-ui, sans-serif; font-weight: 600; font-size: 13px;
  line-height: 1.25; margin-top: 8px;
}
.sd-role {
  font-family: var(--font-mono), ui-monospace, monospace; font-size: 9.5px; line-height: 1.35;
  letter-spacing: 0.04em; color: var(--sd-muted); margin-top: 2px;
}
.sd-role + .sd-role { margin-top: 0; }
.sd-name span, .sd-role span {
  background: var(--sd-veil); backdrop-filter: blur(1.5px); padding: 0 4px; border-radius: 3px;
  -webkit-box-decoration-break: clone; box-decoration-break: clone;
}
.sd-edges { position: absolute; inset: 0; pointer-events: none; overflow: visible; }
.sd-edges path.primary { stroke: var(--sd-accent); stroke-width: 1.6; fill: none; }
.sd-edges path.internal, .sd-edges path.setup { stroke: var(--sd-neutral); stroke-width: 1.4; fill: none; }
.sd-edges path.setup { stroke-dasharray: 4 5; }
.sd-el {
  font-family: var(--font-mono), ui-monospace, monospace; font-size: 10.5px; letter-spacing: 0.04em;
  fill: var(--sd-neutral); paint-order: stroke; stroke: var(--sd-paper); stroke-width: 4px;
  stroke-linejoin: round;
}
.sd-el.primary { fill: var(--sd-accent); }
.sd-legend {
  display: flex; flex-wrap: wrap; gap: 6px 24px; align-items: center; margin-top: 12px;
  font-family: var(--font-mono), ui-monospace, monospace; font-size: 11px; letter-spacing: 0.04em;
  color: var(--sd-muted);
}
.sd-sw { display: inline-block; width: 30px; vertical-align: middle; margin-right: 6px; border-top: 1.6px solid var(--sd-accent); }
.sd-sw.internal, .sd-sw.setup { border-top: 1.4px solid var(--sd-neutral); }
.sd-sw.setup { border-top-style: dashed; }
`;

function Node({ node }: { node: DiagramNode }) {
  const width = node.width ?? NODE_WIDTH;
  const style: CSSProperties = {
    left: node.cx - width / 2,
    top: node.top,
    width,
  };
  return (
    <div className={cn('sd-node', node.highlight && 'highlight')} style={style}>
      <div className={cn('sd-tile', node.wideIcon && 'wide')}>
        {/* eslint-disable-next-line @next/next/no-img-element -- inline data URI, nothing to optimize */}
        <img src={ICONS[node.icon]} alt="" />
      </div>
      <div className="sd-name">
        <span>{node.name}</span>
      </div>
      {node.roles?.map((role) => (
        <div key={role} className="sd-role">
          <span>{role}</span>
        </div>
      ))}
    </div>
  );
}

export function StackDiagram({ spec }: { spec: DiagramSpec }) {
  const marker = `sd-ar-${spec.id}`;
  return (
    <figure className="sd not-typeset">
      <style href="stack-diagram" precedence="default">
        {CSS}
      </style>
      <div className="sd-scroller">
        <div
          className="sd-canvas"
          role="img"
          aria-label={spec.description}
          style={{ width: spec.width, height: spec.height }}
        >
          {spec.groups.map((g) => (
            <div
              key={g.label}
              className={`sd-group ${g.variant}`}
              style={{
                left: g.left,
                top: g.top,
                width: g.width,
                height: g.height,
              }}
            >
              <div className="sd-g-label">
                {g.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element -- inline data URI
                  <img src={ICONS[g.icon]} alt="" />
                ) : null}
                {g.label}
              </div>
            </div>
          ))}
          <svg
            className="sd-edges"
            width={spec.width}
            height={spec.height}
            viewBox={`0 0 ${spec.width} ${spec.height}`}
            aria-hidden="true"
          >
            <defs>
              {/* context-stroke gives each arrowhead its line's color in both themes. */}
              <marker
                id={marker}
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6.5"
                markerHeight="6.5"
                orient="auto-start-reverse"
              >
                <path d="M0 0 L10 5 L0 10 z" fill="context-stroke" />
              </marker>
            </defs>
            {spec.edges.map((e) => (
              <path
                key={e.d}
                className={e.kind}
                d={e.d}
                markerEnd={`url(#${marker})`}
              />
            ))}
            {spec.edges.map((e) =>
              e.label ? (
                <text
                  key={`${e.d}-label`}
                  className={`sd-el ${e.kind}`}
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
      <figcaption className="sd-legend">
        {spec.legend.map((item) => (
          <span key={item.text}>
            <span className={`sd-sw ${item.kind}`} />
            {item.text}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
