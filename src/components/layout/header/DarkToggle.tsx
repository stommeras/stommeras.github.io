'use client';

import { Toggle } from '@/components/ui/toggle';
import { useBoop } from '@/hooks/useBoop';
import { useIsClient } from '@/hooks/useIsClient';
import { animated } from '@react-spring/web';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function DarkToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [style, trigger] = useBoop({ scale: 1.1, rotation: 15 });
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return (
    <animated.div
      className="aspect-square cursor-pointer border-none bg-transparent p-2 text-3xl"
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      <Toggle
        pressed={resolvedTheme === 'dark'}
        onPressedChange={(pressed) => {
          setTheme(pressed ? 'dark' : 'light');
        }}
        style={style}
        onClick={trigger}>
        {resolvedTheme === 'dark' ? <Moon /> : <Sun />}
      </Toggle>
    </animated.div>
  );
}
