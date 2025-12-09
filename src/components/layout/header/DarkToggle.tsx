'use client';

import { useBoop } from '@/hooks/useBoop';
import { useIsClient } from '@/hooks/useIsClient';
import { Toggle } from '@base-ui-components/react';
import { animated } from '@react-spring/web';
import { useTheme } from 'next-themes';

export function DarkToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [style, trigger] = useBoop({ scale: 1.1, rotation: 15 });
  const isClient = useIsClient();

  if (!isClient) {
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
