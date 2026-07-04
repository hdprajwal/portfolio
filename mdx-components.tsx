import type { MDXComponents as MDXComponentsType } from 'mdx/types';
import { MDXComponents } from '@/components/mdx/mdx-components';

// Required by @next/mdx for .mdx pages under app/; reuses the shared component map.
export function useMDXComponents(
  components: MDXComponentsType,
): MDXComponentsType {
  return {
    ...MDXComponents,
    ...components,
  };
}
