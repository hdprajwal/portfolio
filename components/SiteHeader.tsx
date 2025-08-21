"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <header className="bg-transparent backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-flex h-7 w-7 items-center justify-center"
          >
            <Image
              src="/favicon-dark.svg"
              alt="Prajwal HD"
              width={24}
              height={24}
            />
          </span>
          <span className="font-semibold tracking-tight">Prajwal HD</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/projects" className="text-sm hover:underline">
            Projects
          </Link>
          <Link href="/blog" className="text-sm hover:underline">
            Blog
          </Link>
          {mounted && (
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          )}
        </div>
      </div>
    </header>
  );
}
