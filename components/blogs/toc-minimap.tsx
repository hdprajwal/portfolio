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
import type { TocItem } from '@/lib/toc';

const TOC_MINIMAP_ITEM_SPACING = 8;
const TOC_MINIMAP_MAX_HEIGHT_CSS = 'calc(100vh - 18rem)';
const TOC_MINIMAP_MOBILE_ITEM_SPACING = 10;
const TOC_MINIMAP_MOBILE_MAX_WIDTH_CSS = 'calc(100vw - 7rem)';
// Pointer movement under this many pixels between down and up counts as a tap, not a scrub.
const TOC_MINIMAP_TAP_THRESHOLD_PX = 8;

// Shared by the vertical (desktop) and horizontal (mobile) rails: natural size grows with item count, capped by the viewport-relative CSS max.
function resolveTocMinimapNaturalSizeStyle(
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

function resolveTocMinimapTopPercent(index: number, itemCount: number): number {
  if (itemCount <= 1) return 0;
  return (Math.max(0, Math.min(index, itemCount - 1)) / (itemCount - 1)) * 100;
}

// Shared by the vertical (desktop) and horizontal (mobile) rails: maps a pointer position along the rail's axis to the nearest item index.
function resolveTocMinimapIndexFromPointerPos(input: {
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

// getElementById resolves the first element with a given id, so duplicate heading ids scroll to (and are tracked as "current" by) the first occurrence, matching native DOM/anchor behavior.
function selectSection(id: string): void {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
}

export default function TocMinimap({ items }: { items: TocItem[] }) {
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

  // A section spans from its heading to the next one; every span overlapping the viewport is highlighted.
  useEffect(() => {
    if (items.length < 2) return;

    const headings = items.map((item) => document.getElementById(item.id));
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewTop = 80;
      const viewBottom = window.innerHeight;
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
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items]);

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
      moveTocMinimapActiveIndex(setActiveIndex, items.length, currentIndex, delta),
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

  const resolveMobileActiveIndexFromPointer = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
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
      if (nextItem) selectSection(nextItem.id);
      setMobileActiveIndex(null);
    },
    [resolvedMobileActiveIndex, items]
  );

  const onMobileRailPointerCancel = useCallback(() => {
    capturedPointerId.current = null;
    mobilePointerDownPos.current = null;
    setMobileActiveIndex(null);
  }, []);

  if (items.length < 2) return null;

  return (
    <>
      <div
        className="fixed top-1/2 left-0 z-40 hidden w-18 -translate-y-1/2 [@media(pointer:fine)]:lg:block"
        data-toc-minimap
      >
        <div className="relative h-full w-full select-none">
          <button
            aria-label={`Jump to section: ${activeItem?.text ?? 'section'}`}
            className="focus-visible:ring-ring/70 pointer-events-auto absolute top-1/2 left-3 w-10 -translate-y-1/2 cursor-pointer bg-transparent focus-visible:ring-2 focus-visible:outline-none"
            onBlur={() => setActiveIndex(null)}
            onClick={(event) => {
              const nextIndex = resolveActiveIndexFromPointer(event);
              const nextItem =
                nextIndex === null ? null : (items[nextIndex] ?? null);
              if (nextItem) selectSection(nextItem.id);
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
                if (activeItem) selectSection(activeItem.id);
              }
            }}
            onMouseDown={(event) => event.preventDefault()}
            onMouseLeave={() => setActiveIndex(null)}
            onMouseMove={(event) =>
              setActiveIndex(resolveActiveIndexFromPointer(event))
            }
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
                    'pointer-events-none absolute left-0 h-0.5 -translate-y-1/2 rounded-full transition-[background-color,width] duration-150',
                    isCurrent
                      ? 'bg-foreground/90'
                      : activeDistance === 0
                        ? 'bg-muted-foreground/75'
                        : 'bg-muted-foreground/35',
                    activeDistance === 0
                      ? 'w-6'
                      : activeDistance === 1
                        ? 'w-4'
                        : activeDistance === 2
                          ? 'w-2.5'
                          : 'w-2.5'
                  )}
                  // Index suffix avoids duplicate React keys when heading text repeats and ids collide.
                  key={`${item.id}-${index}`}
                  style={{ top }}
                />
              );
            })}
            {activeItem ? (
              <span
                className="border-border/70 bg-background/95 text-foreground pointer-events-none absolute left-8 w-80 rounded-xl border p-3 text-left shadow-xl backdrop-blur"
                style={{
                  top: `${activeTopPercent}%`,
                  transform: `translateY(${activeTooltipTranslate})`,
                }}
              >
                <span className="text-label-16 block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {activeItem.text}
                </span>
                {activeItem.preview ? (
                  <span
                    className="text-muted-foreground text-copy-16 mt-1 block"
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
        className="fixed inset-x-0 z-40 flex flex-col items-center [@media(pointer:fine)]:lg:hidden"
        data-toc-minimap-mobile
        style={{ bottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      >
        {mobileExpanded ? (
          <div
            className="border-border/70 bg-background/95 mb-2 max-h-[55vh] w-72 max-w-[85vw] overflow-y-auto rounded-xl border shadow-xl backdrop-blur"
            role="menu"
          >
            {items.map((item, index) => {
              const isCurrent = visibleIndexes.has(index);
              return (
                <button
                  className={cn(
                    'hover:bg-muted/60 active:bg-muted/60 text-label-16 block w-full px-3 py-2 text-left transition-colors',
                    item.level === 3 && 'pl-6',
                    isCurrent
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground'
                  )}
                  // Index suffix avoids duplicate React keys when heading text repeats and ids collide.
                  key={`${item.id}-${index}-mobile-menu`}
                  onClick={() => {
                    selectSection(item.id);
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
            aria-label={`Jump to section: ${mobileActiveItem?.text ?? 'section'}`}
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
                  selectSection(mobileActiveItem.id);
                } else if (!mobileExpanded) {
                  // Opening the panel hides the scrub preview.
                  setMobileActiveIndex(null);
                  setMobileExpanded(true);
                }
              }
            }}
            onPointerCancel={onMobileRailPointerCancel}
            onPointerDown={onMobileRailPointerDown}
            onPointerMove={onMobileRailPointerMove}
            onPointerUp={onMobileRailPointerUp}
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
                    'pointer-events-none absolute top-1/2 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[background-color,height] duration-150',
                    isCurrent
                      ? 'bg-foreground/90'
                      : activeDistance === 0
                        ? 'bg-muted-foreground/75'
                        : 'bg-muted-foreground/35',
                    activeDistance === 0
                      ? 'h-5'
                      : activeDistance === 1
                        ? 'h-4'
                        : activeDistance === 2
                          ? 'h-3'
                          : 'h-2'
                  )}
                  // Index suffix avoids duplicate React keys when heading text repeats and ids collide.
                  key={`${item.id}-${index}-mobile`}
                  style={{ left }}
                />
              );
            })}
            {!mobileExpanded && mobileActiveItem ? (
              <span
                className="border-border/70 bg-background/95 text-foreground pointer-events-none absolute w-72 max-w-[80vw] rounded-xl border p-3 text-left shadow-xl backdrop-blur"
                style={{
                  left: `${mobileActiveLeftPercent}%`,
                  bottom: 'calc(100% + 0.75rem)',
                  transform: `translateX(${mobileActiveTooltipTranslate})`,
                }}
              >
                <span className="text-label-16 block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {mobileActiveItem.text}
                </span>
                {mobileActiveItem.preview ? (
                  <span
                    className="text-muted-foreground text-copy-16 mt-1 block"
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
