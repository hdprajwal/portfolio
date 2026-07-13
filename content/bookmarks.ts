export const categories = [
  'Tools',
  'Design',
  'Inspiration',
  'Resources',
  'Talks',
  'Portfolios',
] as const;

export type Category = (typeof categories)[number];

export type Bookmark = {
  title: string;
  url: string;
  category: Category;
  note?: string;
};

export const bookmarks: Bookmark[] = [
  { title: 'Making Software', url: 'https://www.makingsoftware.com/', category: 'Resources' },
  { title: 'CTA Gallery', url: 'https://www.cta.gallery/', category: 'Inspiration' },
  { title: 'Minimal Gallery', url: 'https://minimal.gallery/', category: 'Inspiration' },
  { title: 'Design Engineer Tools', url: 'https://designengineer.tools/', category: 'Tools' },
  { title: 'OBS Studio', url: 'https://obsproject.com/', category: 'Tools' },
  { title: 'svgl', url: 'https://svgl.app/', category: 'Design' },
  { title: 'ray.so', url: 'https://ray.so/', category: 'Tools' },
  { title: 'Lucide', url: 'https://lucide.dev/', category: 'Design' },
  { title: 'shadcn/ui', url: 'https://ui.shadcn.com/', category: 'Design' },
  { title: 'UI Layouts', url: 'https://www.ui-layouts.com/', category: 'Design' },
  {
    title: 'Simple Made Easy',
    url: 'https://www.youtube.com/watch?v=SxdOUGdseq4',
    category: 'Talks',
    note: 'Rich Hickey at Strange Loop 2011 on why simple and easy are not the same thing.',
  },
];
