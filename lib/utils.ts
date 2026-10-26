import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Register the custom type-scale classes as font-size utilities so twMerge
// stops classifying them as text colors and dropping text-{color} next to them.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            /^read-\d+$/,
            /^title-\d+$/,
            /^eyebrow-\d+$/,
            /^section-\d+$/,
            /^label-\d+(-mono)?$/,
            /^heading-\d+$/,
            /^copy-\d+(-mono)?$/,
            /^button-\d+$/,
            /^2?xs$/,
            /^3xs$/,
            /^md$/,
          ].map((re) => (v: string) => re.test(v)),
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
