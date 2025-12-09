'use client';

import { DotGrid } from '@/components/ui';
import { useTheme } from 'next-themes';
import { Activity, useEffect, useState } from 'react';

export function LandingBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const dotColor =
    resolvedTheme === 'dark' ? { base: '#333333', active: '#666666' } : { base: '#cccccc', active: '#999999' };

  return (
    <Activity mode={mounted ? 'visible' : 'hidden'}>
      <DotGrid className="absolute top-0 -z-10" baseColor={dotColor.base} activeColor={dotColor.active} dotSize={4} />
    </Activity>
  );
}
