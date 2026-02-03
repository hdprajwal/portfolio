import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import CommandMenu from "@/components/CommandMenu";
import { Toaster } from "@/components/ui/sooner"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col items-center justify-start min-h-screen">
        <div className="w-full max-w-3xl grid-stack mt-0 flex flex-col min-h-screen">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </div>
      <Toaster />
      <CommandMenu />
    </>
  );
}
