import Footer from '@/components/Footer';
import SiteHeader from '@/components/site-header';
import CommandMenu from '@/components/CommandMenu';
import { Toaster } from '@/components/ui/sooner';
import ScrollToTop from '@/components/scroll-to-top';
import { listPosts } from '@/lib/posts';
import { listProjects } from '@/lib/projects';
import { listTILs } from '@/lib/tils';
import { buildContentIndex } from '@/lib/content-index';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [posts, projects, tils] = await Promise.all([
    listPosts(),
    listProjects(),
    listTILs(),
  ]);
  const contentItems = buildContentIndex(posts, projects, tils);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-start">
        <div className="flex min-h-screen w-full max-w-3xl flex-col">
          <SiteHeader />
          <main className="w-full flex-1">{children}</main>
          <Footer />
        </div>
      </div>
      <Toaster />
      <CommandMenu contentItems={contentItems} />
      <ScrollToTop />
    </>
  );
}
