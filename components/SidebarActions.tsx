'use client';

import { useState } from 'react';
import { Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';

export default function SidebarActions({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const x = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const li = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const itemBase =
    'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]';

  return (
    <div className="mb-6">
      <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        Share
      </div>
      <div className="flex flex-col gap-1.5">
        <a className={itemBase} href={x} target="_blank" rel="noreferrer noopener">
          <Twitter className="h-4 w-4" />
          <span>Share on X</span>
        </a>
        <a className={itemBase} href={li} target="_blank" rel="noreferrer noopener">
          <Linkedin className="h-4 w-4" />
          <span>LinkedIn</span>
        </a>
        <button
          className={itemBase}
          onClick={async () => {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
          aria-label="Copy link"
        >
          {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
          <span>{copied ? 'Copied' : 'Copy link'}</span>
        </button>
      </div>
    </div>
  );
}

