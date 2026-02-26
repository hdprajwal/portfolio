'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import {
  Home,
  User,
  Newspaper,
  FolderGit2,
  Lightbulb,
  Clock,
  FileText,
  Mountain,
  Wrench,
  Mail,
  Copy,
  Sun,
  Moon,
} from 'lucide-react';
import { baseUrl } from '@/lib/site';

const navigationItems = [
  { icon: Home, label: 'Home', href: '/', keywords: ['home', 'main'] },
  { icon: User, label: 'About', href: '/about', keywords: ['about', 'bio'] },
  {
    icon: Newspaper,
    label: 'Blogs',
    href: '/blog',
    keywords: ['blog', 'posts', 'writing'],
  },
  {
    icon: FolderGit2,
    label: 'Projects',
    href: '/projects',
    keywords: ['projects', 'work', 'portfolio'],
  },
  {
    icon: Lightbulb,
    label: 'TILs',
    href: '/tils',
    keywords: ['til', 'today i learned', 'learning'],
  },
  { icon: Clock, label: 'Now', href: '/now', keywords: ['now', 'current'] },
  {
    icon: FileText,
    label: 'Resume',
    href: '/resume',
    keywords: ['resume', 'cv'],
  },
  {
    icon: Mountain,
    label: 'Bucket List',
    href: '/bucket-list',
    keywords: ['bucket', 'goals', 'dreams'],
  },
  {
    icon: FileText,
    label: 'Colophon',
    href: '/colophon',
    keywords: ['colophon', 'site'],
  },
];

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (callback: () => void) => {
    setOpen(false);
    callback();
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command Menu"
      description="Quick navigation and actions"
      showCloseButton
      className="sm:max-w-lg"
    >
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="max-h-96">
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <CommandItem
                  key={item.href}
                  value={`${item.label} ${item.keywords.join(' ')}`}
                  onSelect={() => handleSelect(() => router.push(item.href))}
                >
                  <Icon />
                  <span>{item.label}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Actions">
            <CommandItem
              value="copy email contact"
              onSelect={() =>
                handleSelect(() => copyToClipboard('hdprajwal01@gmail.com'))
              }
            >
              <Mail />
              <span>Copy Email</span>
            </CommandItem>
            <CommandItem
              value="copy resume url download"
              onSelect={() =>
                handleSelect(() =>
                  copyToClipboard(`${baseUrl}/resume.pdf`)
                )
              }
            >
              <Copy />
              <span>Copy Resume URL</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Theme">
            <CommandItem
              value="light theme"
              onSelect={() => handleSelect(() => setTheme('light'))}
            >
              <Sun />
              <span>Light Mode</span>
            </CommandItem>
            <CommandItem
              value="dark theme"
              onSelect={() => handleSelect(() => setTheme('dark'))}
            >
              <Moon />
              <span>Dark Mode</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
