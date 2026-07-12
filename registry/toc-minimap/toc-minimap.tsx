'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type SetStateAction,
} from 'react';
import { cn } from '@/lib/utils';

export interface TocMinimapItem {
  id: string;
  text: string;
  // Heading depth; items deeper than level 2 are indented in the mobile list panel.
  level?: number;
  // Optional snippet shown under the section title in the tooltip.
  preview?: string | null;
}

export interface TocMinimapProps {
  items: TocMinimapItem[];
  // Viewport-top inset in px treated as covered (e.g. a sticky header) by the scroll spy.
  scrollOffset?: number;
  // Runs the scroll spy and jumps against this scrollable element in place of the window.
  containerSelector?: string;
  // Replaces the default scroll-into-view and hash update when a section is chosen.
  onSelect?: (item: TocMinimapItem) => void;
  // Desktop rail wrapper.
  className?: string;
  // Mobile rail wrapper.
  mobileClassName?: string;
  tooltipClassName?: string;
  panelClassName?: string;
}

const TOC_MINIMAP_ITEM_SPACING = 8;
const TOC_MINIMAP_MAX_HEIGHT_CSS = 'calc(100vh - 18rem)';
const TOC_MINIMAP_MOBILE_ITEM_SPACING = 10;
const TOC_MINIMAP_MOBILE_MAX_WIDTH_CSS = 'calc(100vw - 7rem)';
// Pointer movement under this many pixels between down and up counts as a tap, not a scrub.
const TOC_MINIMAP_TAP_THRESHOLD_PX = 8;

// Shared by the vertical (desktop) and horizontal (mobile) rails: natural size grows with item count, capped by the viewport-relative CSS max.
export function resolveTocMinimapNaturalSizeStyle(
  itemCount: number,
  spacing: number,
  maxSizeCss: string
): string {
  const naturalSize = Math.max(1, (itemCount - 1) * spacing);
  return `min(${naturalSize}px, ${maxSizeCss})`;
}

function resolveTocMinimapHeightStyle(itemCount: number): string {
  return resolveTocMinimapNaturalSizeStyle(
    itemCount,
    TOC_MINIMAP_ITEM_SPACING,
    TOC_MINIMAP_MAX_HEIGHT_CSS
  );
}

function resolveTocMinimapMobileWidthStyle(itemCount: number): string {
  return resolveTocMinimapNaturalSizeStyle(
    itemCount,
    TOC_MINIMAP_MOBILE_ITEM_SPACING,
    TOC_MINIMAP_MOBILE_MAX_WIDTH_CSS
  );
}

export function resolveTocMinimapTopPercent(
  index: number,
  itemCount: number
): number {
  if (itemCount <= 1) return 0;
  return (Math.max(0, Math.min(index, itemCount - 1)) / (itemCount - 1)) * 100;
}

// Shared by the vertical (desktop) and horizontal (mobile) rails: maps a pointer position along the rail's axis to the nearest item index.
export function resolveTocMinimapIndexFromPointerPos(input: {
  itemCount: number;
  railStart: number;
  railSize: number;
  pointerPos: number;
}): number | null {
  if (input.itemCount <= 0 || input.railSize <= 0) return null;
  if (input.itemCount === 1) return 0;
  const progress = Math.max(
    0,
    Math.min(1, (input.pointerPos - input.railStart) / input.railSize)
  );
  return Math.max(
    0,
    Math.min(input.itemCount - 1, Math.round(progress * (input.itemCount - 1)))
  );
}

// Shared by the desktop and mobile active-index state: steps the active index by delta, falling back to the current visible section when nothing is active yet, clamped to the item range.
function moveTocMinimapActiveIndex(
  setIndex: Dispatch<SetStateAction<number | null>>,
  itemCount: number,
  currentIndex: number,
  delta: number
): void {
  setIndex((current) => {
    const base = current ?? Math.max(currentIndex, 0);
    return Math.max(0, Math.min(itemCount - 1, base + delta));
  });
}

// True on devices with a real hover pointer. Gates the horizontal rail between hover scrubbing (mouse) and drag scrubbing with a tap popup (touch).
function useFinePointer(): boolean {
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return finePointer;
}

export function TocMinimap({
  items,
  scrollOffset = 80,
  containerSelector,
  onSelect,
  className,
  mobileClassName,
  tooltipClassName,
  panelClassName,
}: TocMinimapProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Separate active index for the mobile scrub rail so desktop hover and mobile touch cannot interfere.
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number | null>(
    null
  );
  const [visibleIndexes, setVisibleIndexes] = useState<ReadonlySet<number>>(
    new Set()
  );
  // Whether the mobile tap-to-expand section list panel is open.
  const [mobileExpanded, setMobileExpanded] = useState(false);
  // Tracks the pointerId captured by the mobile rail so stray pointermove events from other pointers are ignored.
  const capturedPointerId = useRef<number | null>(null);
  // Pointerdown position on the mobile rail, used to tell a tap from a scrub at pointerup.
  const mobilePointerDownPos = useRef<{ x: number; y: number } | null>(null);
  const finePointer = useFinePointer();

  const selectItem = useCallback(
    (item: TocMinimapItem) => {
      if (onSelect) {
        onSelect(item);
        return;
      }
      // getElementById resolves the first element with a given id, so duplicate heading ids scroll to the first occurrence, matching native anchor behavior.
      const el = document.getElementById(item.id);
      if (!el) return;
      const behavior: ScrollBehavior = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
        ? 'auto'
        : 'smooth';
      const container = containerSelector
        ? document.querySelector(containerSelector)
        : null;
      if (container) {
        // Scrolls only the container and skips the hash update, since the target is embedded content.
        const delta =
          el.getBoundingClientRect().top -
          container.getBoundingClientRect().top;
        container.scrollTo({ top: container.scrollTop + delta, behavior });
        return;
      }
      el.scrollIntoView({ behavior, block: 'start' });
      history.replaceState(null, '', `#${item.id}`);
    },
    [onSelect, containerSelector]
  );

  // A section spans from its heading to the next one; every span overlapping the view is highlighted.
  useEffect(() => {
    if (items.length < 2) return;

    const container = containerSelector
      ? document.querySelector(containerSelector)
      : null;
    const headings = items.map((item) => document.getElementById(item.id));
    let frame = 0;

    const update = () => {
      frame = 0;
      const containerRect = container?.getBoundingClientRect();
      const viewTop = (containerRect?.top ?? 0) + scrollOffset;
      const viewBottom = containerRect?.bottom ?? window.innerHeight;
      const tops = headings.map((el) =>
        el ? el.getBoundingClientRect().top : null
      );
      const next = new Set<number>();
      for (let i = 0; i < tops.length; i += 1) {
        const top = tops[i];
        if (top === null) continue;
        let end = Number.POSITIVE_INFINITY;
        for (let j = i + 1; j < tops.length; j += 1) {
          const candidate = tops[j];
          if (candidate !== null) {
            end = candidate;
            break;
          }
        }
        if (top < viewBottom && end > viewTop) next.add(i);
      }
      setVisibleIndexes((prev) => {
        if (prev.size === next.size && [...next].every((i) => prev.has(i))) {
          return prev;
        }
        return next;
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    const scrollTarget = container ?? window;
    scrollTarget.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      scrollTarget.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items, scrollOffset, containerSelector]);

  // Escape closes the panel regardless of which element inside it has focus.
  useEffect(() => {
    if (!mobileExpanded) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileExpanded(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileExpanded]);

  const currentIndex =
    visibleIndexes.size > 0 ? Math.min(...visibleIndexes) : -1;

  const resolvedActiveIndex =
    activeIndex !== null && activeIndex < items.length ? activeIndex : null;
  const activeItem =
    resolvedActiveIndex === null ? null : (items[resolvedActiveIndex] ?? null);
  // Announced by the desktop rail's slider semantics; falls back to the section currently in view.
  const announcedIndex = resolvedActiveIndex ?? Math.max(currentIndex, 0);
  const activeTopPercent =
    resolvedActiveIndex === null
      ? 0
      : resolveTocMinimapTopPercent(resolvedActiveIndex, items.length);
  const activeTooltipTranslate =
    resolvedActiveIndex === null
      ? '-50%'
      : resolvedActiveIndex === 0
        ? '0%'
        : resolvedActiveIndex === items.length - 1
          ? '-100%'
          : '-50%';

  const resolveActiveIndexFromPointer = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      return resolveTocMinimapIndexFromPointerPos({
        itemCount: items.length,
        railStart: rect.top,
        railSize: rect.height,
        pointerPos: event.clientY,
      });
    },
    [items.length]
  );

  const moveActiveIndex = useCallback(
    (delta: number) =>
      moveTocMinimapActiveIndex(
        setActiveIndex,
        items.length,
        currentIndex,
        delta
      ),
    [items.length, currentIndex]
  );

  const resolvedMobileActiveIndex =
    mobileActiveIndex !== null && mobileActiveIndex < items.length
      ? mobileActiveIndex
      : null;
  const mobileActiveItem =
    resolvedMobileActiveIndex === null
      ? null
      : (items[resolvedMobileActiveIndex] ?? null);
  const mobileActiveLeftPercent =
    resolvedMobileActiveIndex === null
      ? 0
      : resolveTocMinimapTopPercent(resolvedMobileActiveIndex, items.length);
  const mobileActiveTooltipTranslate =
    resolvedMobileActiveIndex === null
      ? '-50%'
      : resolvedMobileActiveIndex === 0
        ? '0%'
        : resolvedMobileActiveIndex === items.length - 1
          ? '-100%'
          : '-50%';

  // Pointer events extend mouse events, so this serves both the touch scrub handlers and the fine-pointer hover handlers.
  const resolveMobileActiveIndexFromPointer = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      return resolveTocMinimapIndexFromPointerPos({
        itemCount: items.length,
        railStart: rect.left,
        railSize: rect.width,
        pointerPos: event.clientX,
      });
    },
    [items.length]
  );

  const moveMobileActiveIndex = useCallback(
    (delta: number) =>
      moveTocMinimapActiveIndex(
        setMobileActiveIndex,
        items.length,
        currentIndex,
        delta
      ),
    [items.length, currentIndex]
  );

  const onMobileRailPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      capturedPointerId.current = event.pointerId;
      mobilePointerDownPos.current = { x: event.clientX, y: event.clientY };
      // Skip the scrub preview while the panel is open; a drag there is not a scrub gesture.
      if (!mobileExpanded) {
        setMobileActiveIndex(resolveMobileActiveIndexFromPointer(event));
      }
    },
    [resolveMobileActiveIndexFromPointer, mobileExpanded]
  );

  const onMobileRailPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (capturedPointerId.current !== event.pointerId) return;
      if (mobileExpanded) return;
      setMobileActiveIndex(resolveMobileActiveIndexFromPointer(event));
    },
    [resolveMobileActiveIndexFromPointer, mobileExpanded]
  );

  const onMobileRailPointerUp = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (capturedPointerId.current !== event.pointerId) return;
      capturedPointerId.current = null;
      const downPos = mobilePointerDownPos.current;
      mobilePointerDownPos.current = null;
      const distance = downPos
        ? Math.hypot(event.clientX - downPos.x, event.clientY - downPos.y)
        : Number.POSITIVE_INFINITY;
      // A tap toggles the expanded list instead of jumping to a section.
      if (distance < TOC_MINIMAP_TAP_THRESHOLD_PX) {
        setMobileActiveIndex(null);
        setMobileExpanded((current) => !current);
        return;
      }
      const nextItem =
        resolvedMobileActiveIndex === null
          ? null
          : (items[resolvedMobileActiveIndex] ?? null);
      if (nextItem) selectItem(nextItem);
      setMobileActiveIndex(null);
    },
    [resolvedMobileActiveIndex, items, selectItem]
  );

  const onMobileRailPointerCancel = useCallback(() => {
    capturedPointerId.current = null;
    mobilePointerDownPos.current = null;
    setMobileActiveIndex(null);
  }, []);

  // Fine-pointer click on the horizontal rail jumps like the vertical rail; the popup list stays a touch and keyboard affordance.
  const onMobileRailClick = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement>) => {
      const nextIndex = resolveMobileActiveIndexFromPointer(event);
      const nextItem = nextIndex === null ? null : (items[nextIndex] ?? null);
      if (nextItem) selectItem(nextItem);
      setMobileExpanded(false);
      event.currentTarget.blur();
    },
    [resolveMobileActiveIndexFromPointer, items, selectItem]
  );

  if (items.length < 2) return null;

  return (
    <>
      <div
        className={cn(
          'fixed top-1/2 left-0 z-40 hidden w-18 -translate-y-1/2 [@media(pointer:fine)]:lg:block',
          className
        )}
        data-toc-minimap
      >
        <div className="relative h-full w-full select-none">
          <button
            aria-label="Table of contents"
            aria-orientation="vertical"
            aria-valuemax={items.length - 1}
            aria-valuemin={0}
            aria-valuenow={announcedIndex}
            aria-valuetext={items[announcedIndex]?.text}
            className="focus-visible:ring-ring/70 pointer-events-auto absolute top-1/2 left-3 w-10 -translate-y-1/2 cursor-pointer bg-transparent focus-visible:ring-2 focus-visible:outline-none"
            onBlur={() => setActiveIndex(null)}
            onClick={(event) => {
              const nextIndex = resolveActiveIndexFromPointer(event);
              const nextItem =
                nextIndex === null ? null : (items[nextIndex] ?? null);
              if (nextItem) selectItem(nextItem);
              event.currentTarget.blur();
            }}
            onFocus={() =>
              setActiveIndex((current) => current ?? Math.max(currentIndex, 0))
            }
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                moveActiveIndex(1);
              } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                moveActiveIndex(-1);
              } else if (event.key === 'Home') {
                event.preventDefault();
                setActiveIndex(0);
              } else if (event.key === 'End') {
                event.preventDefault();
                setActiveIndex(items.length - 1);
              } else if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                if (activeItem) selectItem(activeItem);
              }
            }}
            onMouseDown={(event) => event.preventDefault()}
            onMouseLeave={() => setActiveIndex(null)}
            onMouseMove={(event) =>
              setActiveIndex(resolveActiveIndexFromPointer(event))
            }
            role="slider"
            style={{ height: resolveTocMinimapHeightStyle(items.length) }}
            type="button"
          >
            <div className="bg-border/15 absolute top-0 left-3 h-full w-px" />
            {items.map((item, index) => {
              const top = `${resolveTocMinimapTopPercent(index, items.length)}%`;
              const activeDistance =
                resolvedActiveIndex === null
                  ? null
                  : Math.abs(index - resolvedActiveIndex);
              const isCurrent = visibleIndexes.has(index);
              return (
                <span
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute left-0 h-0.5 w-6 origin-left -translate-y-1/2 rounded-full transition-[background-color,transform] duration-150 motion-reduce:transition-none',
                    isCurrent
                      ? 'bg-foreground/90'
                      : activeDistance === 0
                        ? 'bg-muted-foreground/75'
                        : 'bg-muted-foreground/35',
                    activeDistance === 0
                      ? 'scale-x-100'
                      : activeDistance === 1
                        ? 'scale-x-[0.67]'
                        : 'scale-x-[0.42]'
                  )}
                  // Index suffix avoids duplicate React keys when heading text repeats and ids collide.
                  key={`${item.id}-${index}`}
                  style={{ top }}
                />
              );
            })}
            {activeItem ? (
              <span
                className={cn(
                  'border-border/70 bg-background/95 text-foreground pointer-events-none absolute left-8 w-80 rounded-xl border p-3 text-left shadow-xl backdrop-blur transition-[top,transform] duration-150 ease-out motion-reduce:transition-none',
                  tooltipClassName
                )}
                style={{
                  top: `${activeTopPercent}%`,
                  transform: `translateY(${activeTooltipTranslate})`,
                }}
              >
                <span className="block max-w-full overflow-hidden text-sm leading-tight text-ellipsis whitespace-nowrap">
                  {activeItem.text}
                </span>
                {activeItem.preview ? (
                  <span
                    className="text-muted-foreground mt-1 block text-sm leading-normal"
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 3,
                      overflow: 'hidden',
                    }}
                  >
                    {activeItem.preview}
                  </span>
                ) : null}
              </span>
            ) : null}
          </button>
        </div>
      </div>
      {mobileExpanded ? (
        <button
          aria-label="Close table of contents"
          className="fixed inset-0 z-40 cursor-default bg-transparent [@media(pointer:fine)]:lg:hidden"
          onClick={() => setMobileExpanded(false)}
          type="button"
        />
      ) : null}
      <div
        className={cn(
          'fixed inset-x-0 z-40 flex flex-col items-center [@media(pointer:fine)]:lg:hidden',
          mobileClassName
        )}
        data-toc-minimap-mobile
        style={{ bottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      >
        {mobileExpanded ? (
          <div
            className={cn(
              'border-border/70 bg-background/95 mb-2 max-h-[55vh] w-72 max-w-[85vw] overflow-y-auto rounded-xl border shadow-xl backdrop-blur',
              panelClassName
            )}
            role="menu"
          >
            {items.map((item, index) => {
              const isCurrent = visibleIndexes.has(index);
              return (
                <button
                  className={cn(
                    'hover:bg-muted/60 active:bg-muted/60 block w-full px-3 py-2 text-left text-sm leading-tight transition-colors',
                    (item.level ?? 2) >= 3 && 'pl-6',
                    isCurrent
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground'
                  )}
                  // Index suffix avoids duplicate React keys when heading text repeats and ids collide.
                  key={`${item.id}-${index}-mobile-menu`}
                  onClick={() => {
                    selectItem(item);
                    setMobileExpanded(false);
                  }}
                  role="menuitem"
                  type="button"
                >
                  <span className="flex items-center gap-2">
                    {isCurrent ? (
                      <span
                        aria-hidden="true"
                        className="bg-foreground/70 h-1.5 w-1.5 shrink-0 rounded-full"
                      />
                    ) : null}
                    <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.text}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}
        <div className="border-border/50 bg-background/85 rounded-full border px-4 py-2.5 shadow-lg backdrop-blur">
          <button
            aria-expanded={mobileExpanded}
            aria-haspopup="menu"
            aria-label="Table of contents"
            className="focus-visible:ring-ring/70 relative block cursor-pointer touch-none bg-transparent focus-visible:ring-2 focus-visible:outline-none"
            onBlur={() => setMobileActiveIndex(null)}
            onFocus={() =>
              setMobileActiveIndex((current) =>
                current === null ? Math.max(currentIndex, 0) : current
              )
            }
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') {
                event.preventDefault();
                moveMobileActiveIndex(1);
              } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                moveMobileActiveIndex(-1);
              } else if (event.key === 'Home') {
                event.preventDefault();
                setMobileActiveIndex(0);
              } else if (event.key === 'End') {
                event.preventDefault();
                setMobileActiveIndex(items.length - 1);
              } else if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                // An arrow-selected item still jumps; otherwise Enter/Space opens the list panel.
                if (mobileActiveItem) {
                  selectItem(mobileActiveItem);
                } else if (!mobileExpanded) {
                  // Opening the panel hides the scrub preview.
                  setMobileActiveIndex(null);
                  setMobileExpanded(true);
                }
              }
            }}
            {...(finePointer
              ? {
                  onClick: onMobileRailClick,
                  onMouseDown: (event: ReactMouseEvent<HTMLButtonElement>) =>
                    event.preventDefault(),
                  onMouseLeave: () => setMobileActiveIndex(null),
                  onMouseMove: (event: ReactMouseEvent<HTMLButtonElement>) => {
                    if (!mobileExpanded) {
                      setMobileActiveIndex(
                        resolveMobileActiveIndexFromPointer(event)
                      );
                    }
                  },
                }
              : {
                  onPointerCancel: onMobileRailPointerCancel,
                  onPointerDown: onMobileRailPointerDown,
                  onPointerMove: onMobileRailPointerMove,
                  onPointerUp: onMobileRailPointerUp,
                })}
            style={{
              width: resolveTocMinimapMobileWidthStyle(items.length),
              height: '24px',
            }}
            type="button"
          >
            <div className="bg-border/15 absolute top-1/2 left-0 h-px w-full -translate-y-1/2" />
            {items.map((item, index) => {
              const left = `${resolveTocMinimapTopPercent(index, items.length)}%`;
              const activeDistance =
                resolvedMobileActiveIndex === null
                  ? null
                  : Math.abs(index - resolvedMobileActiveIndex);
              const isCurrent = visibleIndexes.has(index);
              return (
                <span
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute top-1/2 h-5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[background-color,transform] duration-150 motion-reduce:transition-none',
                    isCurrent
                      ? 'bg-foreground/90'
                      : activeDistance === 0
                        ? 'bg-muted-foreground/75'
                        : 'bg-muted-foreground/35',
                    activeDistance === 0
                      ? 'scale-y-100'
                      : activeDistance === 1
                        ? 'scale-y-[0.8]'
                        : activeDistance === 2
                          ? 'scale-y-[0.6]'
                          : 'scale-y-[0.4]'
                  )}
                  // Index suffix avoids duplicate React keys when heading text repeats and ids collide.
                  key={`${item.id}-${index}-mobile`}
                  style={{ left }}
                />
              );
            })}
            {!mobileExpanded && mobileActiveItem ? (
              <span
                className={cn(
                  'border-border/70 bg-background/95 text-foreground pointer-events-none absolute w-72 max-w-[80vw] rounded-xl border p-3 text-left shadow-xl backdrop-blur transition-[left,transform] duration-150 ease-out motion-reduce:transition-none',
                  tooltipClassName
                )}
                style={{
                  left: `${mobileActiveLeftPercent}%`,
                  bottom: 'calc(100% + 0.75rem)',
                  transform: `translateX(${mobileActiveTooltipTranslate})`,
                }}
              >
                <span className="block max-w-full overflow-hidden text-sm leading-tight text-ellipsis whitespace-nowrap">
                  {mobileActiveItem.text}
                </span>
                {mobileActiveItem.preview ? (
                  <span
                    className="text-muted-foreground mt-1 block text-sm leading-normal"
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 3,
                      overflow: 'hidden',
                    }}
                  >
                    {mobileActiveItem.preview}
                  </span>
                ) : null}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </>
  );
}

// Builds minimap items from rendered headings, for apps without build-time TOC extraction. Headings need ids (e.g. via rehype-slug).
export function useTocItems(
  containerSelector = 'article',
  headingSelector = 'h2[id], h3[id]'
): TocMinimapItem[] {
  const [items, setItems] = useState<TocMinimapItem[]>([]);

  // Deferred a frame so the DOM read happens after paint instead of forcing a cascading render during mount.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const root = document.querySelector(containerSelector);
      const headings = root
        ? Array.from(root.querySelectorAll<HTMLElement>(headingSelector))
        : [];
      setItems(
        headings
          .map((heading) => ({
            id: heading.id,
            text: heading.textContent?.trim() ?? '',
            level: Number(heading.tagName.slice(1)) || 2,
            preview: resolveHeadingPreview(heading),
          }))
          .filter((item) => item.id && item.text)
      );
    });
    return () => cancelAnimationFrame(frame);
  }, [containerSelector, headingSelector]);

  return items;
}

// First following paragraph's text, collapsed and trimmed to a tooltip-sized snippet.
function resolveHeadingPreview(heading: HTMLElement): string | null {
  for (
    let node = heading.nextElementSibling;
    node;
    node = node.nextElementSibling
  ) {
    if (/^H[1-6]$/.test(node.tagName)) break;
    if (node.tagName !== 'P') continue;
    const text = node.textContent?.replace(/\s+/g, ' ').trim() ?? '';
    if (text) return text.slice(0, 160);
  }
  return null;
}

export default TocMinimap;
