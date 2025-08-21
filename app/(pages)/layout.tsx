import SiteHeader from "@/components/SiteHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen">
      <div className="bg-[var(--bg)] text-[var(--fg)]">
        <SiteHeader />
        <div className="min-h-screen">{children}</div>
      </div>
    </main>
  );
}
