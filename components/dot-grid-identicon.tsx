type Props = { name: string; showName: boolean };

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function buildGrid(name: string): boolean[][] {
  const h = hash(name);
  const size = 5;
  const half = Math.ceil(size / 2);
  const grid: boolean[][] = Array.from({ length: size }, () =>
    Array(size).fill(false)
  );
  let bits = h;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < half; x++) {
      const on = (bits & 1) === 1;
      bits >>>= 1;
      grid[y][x] = on;
      grid[y][size - 1 - x] = on;
    }
  }
  return grid;
}

export default function DotGridIdenticon({ name, showName }: Props) {
  const grid = buildGrid(name);

  return (
    <div
      className="bg-muted relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden px-6 py-5"
      style={{
        backgroundImage:
          'radial-gradient(circle, color-mix(in oklab, var(--color-foreground) 6%, transparent) 1px, transparent 1px)',
        backgroundSize: '14px 14px',
        backgroundPosition: '0 0',
      }}
    >
      <div
        className="border-border/60 bg-muted relative z-10 grid shrink-0 rounded-md border p-2"
        style={{
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '3px',
          width: '64px',
          height: '64px',
        }}
      >
        {grid.flat().map((on, i) => (
          <div
            key={i}
            className={on ? 'bg-foreground' : 'bg-foreground/5'}
            style={{ borderRadius: '1px' }}
          />
        ))}
      </div>
      {showName && (
        <span className="text-foreground relative z-10 text-center font-mono text-base font-semibold tracking-tight text-balance select-none sm:text-lg">
          {name}
        </span>
      )}
    </div>
  );
}
