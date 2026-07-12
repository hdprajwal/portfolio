'use client';

import { useState, type ReactNode } from 'react';
import DemoPanel from '@/components/registry/demo-panel';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TocMinimapPreview from './preview';

type Orientation = 'vertical' | 'horizontal';

const ORIENTATIONS = [
  { value: 'vertical', label: 'Vertical' },
  { value: 'horizontal', label: 'Horizontal' },
];

export default function TocMinimapDemo({ code }: { code: ReactNode }) {
  const [orientation, setOrientation] = useState<Orientation>('vertical');

  return (
    <DemoPanel
      code={code}
      caption="The rail tracks the sample document in the box, so the bright ticks follow along as it scrolls. With a mouse, hover either rail to preview a section and click to jump. On a touch screen the horizontal bar scrubs as you drag, jumps when you release, and opens the full section list on a tap."
    >
      <div className="border-border bg-muted/30 flex items-center border-b px-3 py-2">
        <Select
          items={ORIENTATIONS}
          value={orientation}
          onValueChange={(value) => setOrientation(value as Orientation)}
        >
          <SelectTrigger
            aria-label="Demo orientation"
            className="bg-background"
            size="sm"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ORIENTATIONS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <TocMinimapPreview orientation={orientation} />
    </DemoPanel>
  );
}
