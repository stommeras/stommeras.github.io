'use client';

import { DotGrid } from '@/components/ui/DotGrid';
import { useTheme } from 'next-themes';

// Dot grid only accepts rgb hex colors
const THEME_COLORS = {
  dotGrid: {
    dark: {
      base: '#262626',
      active: '#4d4d4d',
    },
    light: {
      base: '#cccccc',
      active: '#999999',
    },
  },
} as const;

function getDotGridColors(theme: string | undefined) {
  return theme === 'dark' ? THEME_COLORS.dotGrid.dark : THEME_COLORS.dotGrid.light;
}

export function LandingBackground() {
  const { resolvedTheme } = useTheme();
  const dotColor = getDotGridColors(resolvedTheme);

  return (
    <DotGrid className="absolute top-0 -z-10" baseColor={dotColor.base} activeColor={dotColor.active} dotSize={4} />
  );
}
