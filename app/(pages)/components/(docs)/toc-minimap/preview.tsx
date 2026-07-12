'use client';

import { cn } from '@/lib/utils';
import { TocMinimap, type TocMinimapItem } from '@/registry/toc-minimap';

const LOREM = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt, neque porro quisquam est.',
  'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
  'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.',
];

const DEMO_SECTIONS = [
  { id: 'demo-overview', title: 'Overview', paragraphs: [0, 1, 2] },
  { id: 'demo-getting-started', title: 'Getting started', paragraphs: [3, 4] },
  { id: 'demo-anatomy', title: 'Anatomy of the rail', paragraphs: [5, 0, 1] },
  { id: 'demo-scroll-tracking', title: 'Scroll tracking', paragraphs: [2, 3] },
  { id: 'demo-pointer-input', title: 'Pointer input', paragraphs: [4, 5, 0] },
  { id: 'demo-keyboard', title: 'Keyboard support', paragraphs: [1, 2] },
  { id: 'demo-theming', title: 'Theming', paragraphs: [3, 4, 5] },
  { id: 'demo-performance', title: 'Performance', paragraphs: [0, 2] },
].map((section) => ({
  ...section,
  paragraphs: section.paragraphs.map((index) => LOREM[index] as string),
}));

const DEMO_ITEMS: TocMinimapItem[] = DEMO_SECTIONS.map((section) => ({
  id: section.id,
  text: section.title,
  preview: section.paragraphs[0]?.slice(0, 160) ?? null,
}));

const SCROLL_CONTAINER_ID = 'toc-minimap-demo-scroll';

export default function TocMinimapPreview({
  orientation,
}: {
  orientation: 'vertical' | 'horizontal';
}) {
  const isVertical = orientation === 'vertical';

  return (
    <div className="relative">
      {isVertical ? (
        <TocMinimap
          containerSelector={`#${SCROLL_CONTAINER_ID}`}
          items={DEMO_ITEMS}
          scrollOffset={0}
          className="absolute block h-48"
          mobileClassName="hidden [@media(pointer:fine)]:lg:hidden"
          tooltipClassName="w-64 max-w-[70vw]"
        />
      ) : (
        <TocMinimap
          containerSelector={`#${SCROLL_CONTAINER_ID}`}
          items={DEMO_ITEMS}
          scrollOffset={0}
          className="hidden [@media(pointer:fine)]:lg:hidden"
          mobileClassName="absolute [@media(pointer:fine)]:lg:flex"
          tooltipClassName="w-64 max-w-[70vw]"
        />
      )}
      <div
        className={cn(
          'bg-background h-96 overflow-y-auto py-6 pr-6',
          isVertical ? 'pl-16' : 'pb-20 pl-6'
        )}
        id={SCROLL_CONTAINER_ID}
      >
        {DEMO_SECTIONS.map((section) => (
          <section key={section.id}>
            <h3
              className="text-foreground text-label-18 mt-8 first:mt-0"
              id={section.id}
            >
              {section.title}
            </h3>
            {section.paragraphs.map((paragraph, index) => (
              <p className="text-muted-foreground text-copy-16 mt-3" key={index}>
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
