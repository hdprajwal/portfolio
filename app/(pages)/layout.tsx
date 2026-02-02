import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import CommandMenu from "@/components/CommandMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col items-center justify-start min-h-screen px-2">
        <div className="w-full max-w-4xl grid-stack mt-0 border-t border-border flex flex-col min-h-screen">
          <SiteHeader />
          {children}
          <Footer />
        </div>
      </div>
      <CommandMenu />
    </>
  );
}
