export default function SectionHeader({ label }: { label: string }) {
  return (
    <div className="mb-5 flex items-center gap-2.5">
      <span
        className="text-primary font-mono text-xs opacity-80 select-none"
        aria-hidden
      >
        //
      </span>
      <h2 className="text-muted-foreground font-mono text-sm font-medium tracking-[0.14em] uppercase">
        {label}
      </h2>
      <div className="bg-border h-px flex-1" />
    </div>
  );
}
