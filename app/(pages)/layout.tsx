import Footer from '@/components/Footer';
import SiteHeader from '@/components/site-header';
import CommandMenu from '@/components/CommandMenu';
import { Toaster } from '@/components/ui/sooner';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-start">
        <div className="flex min-h-screen w-full max-w-3xl flex-col">
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
