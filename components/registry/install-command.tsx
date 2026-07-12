'use client';

import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bun } from '@/components/icons/bunIcon';
import { NPM } from '@/components/icons/npmIcon';
import { Pnpm } from '@/components/icons/pnpmIcon';
import { Yarn } from '@/components/icons/yarnIcon';

const PACKAGE_MANAGERS = [
  { value: 'pnpm', Icon: Pnpm },
  { value: 'npm', Icon: NPM },
  { value: 'yarn', Icon: Yarn },
  { value: 'bun', Icon: Bun },
] as const;

type PackageManager = (typeof PACKAGE_MANAGERS)[number]['value'];

const STORAGE_KEY = 'preferred-package-manager';



// The args are the npx-style tail (e.g. "shadcn@latest add <url>"); each manager gets its own runner prefix.
function buildCommand(manager: PackageManager, args: string): string {
  switch (manager) {
    case 'pnpm':
      return `pnpm dlx ${args}`;
    case 'npm':
      return `npx ${args}`;
    case 'yarn':
      return `yarn dlx ${args}`;
    case 'bun':
      return `bunx --bun ${args}`;
  }
}

export default function InstallCommand({ args }: { args: string }) {
  const [manager, setManager] = useState<PackageManager>('pnpm');
  const [copied, setCopied] = useState(false);

  // Restore the last choice so every install block on the site agrees with the visitor's package manager.
  useEffect(() => {
    const restore = () => {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (PACKAGE_MANAGERS.some((m) => m.value === saved)) {
        setManager(saved as PackageManager);
      }
    };
    restore();
  }, []);

  const selectManager = (value: PackageManager) => {
    setManager(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Storage can be unavailable (private mode); the selection still works for this page.
    }
  };

  const command = buildCommand(manager, args);
  const ActiveIcon = (
    PACKAGE_MANAGERS.find((m) => m.value === manager) ?? PACKAGE_MANAGERS[0]
  ).Icon;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // Clipboard can be unavailable; leave the button state unchanged.
    }
  };

  return (
    <div className="not-typeset group border-border my-7 max-w-full overflow-hidden rounded-lg border">
      <div className="border-border bg-muted/40 flex items-center gap-2 border-b px-3 py-1">
        <ActiveIcon aria-hidden="true" className="size-4 shrink-0 bg-muted" />
        <Tabs
          value={manager}
          onValueChange={(value) => selectManager(value as PackageManager)}
        >
          <TabsList aria-label="Package manager" className="bg-transparent">
            {PACKAGE_MANAGERS.map(({ value }) => (
              <TabsTrigger
                className="font-mono text-3xs cursor-pointer px-2 tracking-wider"
                key={value}
                value={value}
              >
                {value}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div className="flex items-center justify-between gap-2 pr-2 pl-4">
        <code className="text-foreground/90 overflow-x-auto py-3 font-mono text-[0.8125rem] whitespace-nowrap">
          {command}
        </code>
        <button
          aria-label={copied ? 'Copied' : 'Copy command'}
          className="text-muted-foreground hover:text-foreground inline-flex shrink-0 cursor-pointer items-center rounded-md p-1.5 opacity-0 transition-[color,opacity] group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-1 focus-visible:outline-none [@media(hover:none)]:opacity-100"
          onClick={handleCopy}
          type="button"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </button>
      </div>
    </div>
  );
}
