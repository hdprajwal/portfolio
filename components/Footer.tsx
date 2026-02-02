import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="grid-row p-4">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-muted-foreground">
          © 2026 Prajwal HD
        </p>
        <div className="flex flex-wrap items-center gap-3 text-sm sm:text-xs">
          <Link href="/uses" className="underline text-muted-foreground hover:text-accent-foreground transition-colors">
            Uses
          </Link>
          <Link href="/colophon" className="underline text-muted-foreground hover:text-accent-foreground transition-colors">
            Colophon
          </Link>
          <Link href="https://github.com/hdprajwal/portfolio" target="_blank" className="underline text-muted-foreground hover:text-accent-foreground transition-colors">
            Source Code
          </Link>
        </div>
      </div>
    </footer>
  );
}
