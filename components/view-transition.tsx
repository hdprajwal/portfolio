/// <reference types="react/canary" />
import {
  ViewTransition as ReactViewTransition,
  type ComponentType,
  type ReactNode,
} from 'react';

type ViewTransitionProps = { name?: string; children: ReactNode };

// react/canary's ViewTransitionProps omits children; recast so JSX usage type-checks.
export const ViewTransition =
  ReactViewTransition as unknown as ComponentType<ViewTransitionProps>;
