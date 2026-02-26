import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="px-4">
      <Separator className="bg-muted mt-1" />
      <div className="flex flex-col items-start justify-between gap-4 py-4 sm:flex-row sm:items-center">
        <p className="text-muted-foreground text-sm">© 2026 Prajwal HD</p>
        <div className="flex flex-wrap items-center gap-3 text-sm sm:text-xs">
          <Link
            href="/colophon"
            className="text-primary hover:text-primary/80 underline transition-colors"
          >
            Colophon
          </Link>
        </div>
      </div>
    </footer>
  );
}
