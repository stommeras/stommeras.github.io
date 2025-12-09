'use client';

import { DotGrid } from '@/components/ui';
import { useTheme } from 'next-themes';

export function LandingBackground() {
  const { resolvedTheme } = useTheme();

  const dotColor =
    resolvedTheme === 'dark' ? { base: '#333333', active: '#666666' } : { base: '#cccccc', active: '#999999' };

  return (
    <DotGrid className="absolute top-0 -z-10" baseColor={dotColor.base} activeColor={dotColor.active} dotSize={4} />
  );
}
