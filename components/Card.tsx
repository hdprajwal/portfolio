export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--card)] p-5 text-[var(--card-fg)]">
      {children}
    </div>
  );
}
