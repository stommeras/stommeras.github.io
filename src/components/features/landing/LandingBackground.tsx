'use client';

import { DotGrid } from '@/components/ui';
import { useTheme } from 'next-themes';

export function LandingBackground() {
  const { resolvedTheme } = useTheme();

  const dotColor =
    resolvedTheme === 'dark' ? { base: '#222222', active: '#555555' } : { base: '#cccccc', active: '#999999' };

  return (
    <DotGrid className="absolute top-0 -z-10" baseColor={dotColor.base} activeColor={dotColor.active} dotSize={4} />
  );
}
