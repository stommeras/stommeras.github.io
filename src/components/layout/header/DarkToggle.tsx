'use client';

import { Toggle } from '@/components/ui/toggle';
import { useBoop } from '@/hooks/useBoop';
import { useIsClient } from '@/hooks/useIsClient';
import { animated } from '@react-spring/web';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function DarkToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [containerStyle, containerTrigger] = useBoop({ scale: 1.1 });
  const [iconStyle, iconTrigger] = useBoop({ scale: 1.1, rotation: 15 });
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  const triggerStyles = () => {
    iconTrigger();
    containerTrigger();
  };

  return (
    <animated.div
      className="aspect-square cursor-pointer border-none bg-transparent p-2 text-3xl"
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={containerStyle}>
      <Toggle
        pressed={resolvedTheme === 'dark'}
        onPressedChange={(pressed) => {
          setTheme(pressed ? 'dark' : 'light');
        }}
        onClick={triggerStyles}
        onMouseEnter={triggerStyles}>
        <animated.div style={iconStyle}>{resolvedTheme === 'dark' ? <Moon /> : <Sun />}</animated.div>
      </Toggle>
    </animated.div>
  );
}
