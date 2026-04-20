'use client';

import { Share, Link2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import TwitterIcon from '@/components/icons/TwitterIcon';
import LinkedinIcon from '@/components/icons/LinkedinIcon';

export default function ShareActions({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const x = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const li = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="rounded-sm" size="icon">
            <Share />
          </Button>
        }
      />
      <DropdownMenuContent className="rounded-sm" align="end">
        <DropdownMenuItem className="rounded-sm">
          <Link className="flex items-center gap-2" href={x}>
            <TwitterIcon className="inline-block h-4 w-4" />
            Twitter
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="rounded-sm">
          <Link className="flex items-center gap-2" href={li}>
            <LinkedinIcon className="inline-block h-4 w-4" />
            LinkedIn
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="rounded-sm"
          onClick={() => {
            navigator.clipboard.writeText(url);
            toast.success('Link copied to clipboard');
          }}
        >
          <Link2 />
          Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
