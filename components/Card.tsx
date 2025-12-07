export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid-row p-6 group cursor-default">
      {children}
    </div>
  );
}
