'use client';

import { useEffect, useId, useState } from 'react';
import { useTheme } from 'next-themes';

export default function Mermaid({ chart }: { chart: string }) {
  const { resolvedTheme } = useTheme();
  const reactId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [svg, setSvg] = useState('');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: resolvedTheme === 'dark' ? 'dark' : 'neutral',
        fontFamily: 'var(--font-mono), monospace',
      });
      try {
        const { svg } = await mermaid.render(
          `mermaid-${reactId}-${resolvedTheme}`,
          chart.trim()
        );
        if (!cancelled) {
          setSvg(svg);
          setFailed(false);
        }
      } catch (error) {
        console.error('Failed to render mermaid diagram', error);
        if (!cancelled) {
          setSvg('');
          setFailed(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, resolvedTheme, reactId]);

  if (failed) {
    return (
      <div className="text-muted-foreground text-label-14-mono my-8 text-center">
        <p>Failed to render diagram</p>
        <pre className="mt-2 overflow-x-auto text-left whitespace-pre-wrap">
          {chart.trim()}
        </pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="text-muted-foreground text-label-14-mono my-8 text-center">
        Rendering diagram...
      </div>
    );
  }

  return (
    <div
      className="my-8 flex justify-center overflow-x-auto [&_svg]:h-auto [&_svg]:max-w-full"
      role="img"
      aria-label="Architecture diagram"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
