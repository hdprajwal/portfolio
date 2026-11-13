'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

// Keeps the browser chrome colour in step with the theme toggle, since the static tags only follow the OS setting.
export default function ThemeColor() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;
    const color = resolvedTheme === 'dark' ? '#000000' : '#ffffff';
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((tag) => tag.setAttribute('content', color));
  }, [resolvedTheme]);

  return null;
}
