import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import CommandMenu from "@/components/CommandMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen">
      <div className="bg-[var(--bg)] text-[var(--fg)]">
        <SiteHeader />
        <div className="min-h-screen">{children}</div>
        <Footer />
        <CommandMenu />
      </div>
    </main>
  );
}
