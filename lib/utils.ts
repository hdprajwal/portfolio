import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Register the custom type-scale classes as font-size utilities so twMerge
// stops classifying them as text colors and dropping text-{color} next to them.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'display',
            'title',
            'header',
            'body',
            'subtitle',
            'meta',
            'eyebrow',
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
