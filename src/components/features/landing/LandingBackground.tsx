'use client';

import { DotGrid } from '@/components/ui';
import { useTheme } from 'next-themes';
import React from 'react';

export function LandingBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const dotColor =
    resolvedTheme === 'dark' ? { base: '#333333', active: '#666666' } : { base: '#cccccc', active: '#999999' };

  return (
    <React.Activity mode={mounted ? 'visible' : 'hidden'}>
      <DotGrid
        className="absolute top-0 -z-10 [-webkit-mask:linear-gradient(to_bottom,black_80%,transparent_100%)] [mask:linear-gradient(to_bottom,black_80%,transparent_100%)]"
        baseColor={dotColor.base}
        activeColor={dotColor.active}
        dotSize={4}
      />
    </React.Activity>
  );
}
