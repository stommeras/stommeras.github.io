'use client';

import { useBoop } from '@/hooks/useBoop';
import { Toggle } from '@base-ui-components/react';
import { animated } from '@react-spring/web';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function DarkToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [style, trigger] = useBoop({ scale: 1.1, rotation: 15 });

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Toggle
      pressed={resolvedTheme === 'dark'}
      onPressedChange={(pressed) => {
        setTheme(pressed ? 'dark' : 'light');
      }}
      style={style}
      onClick={trigger}
      render={(props, state) => {
        const themeLabel = state.pressed ? 'Switch to light mode' : 'Switch to dark mode';
        return (
          <animated.button
            {...props}
            className="aspect-square cursor-pointer border-none bg-transparent p-2 text-3xl"
            aria-label={themeLabel}
            title={themeLabel}>
            {state.pressed ? '🌑' : '☀️'}
          </animated.button>
        );
      }}
    />
  );
}
