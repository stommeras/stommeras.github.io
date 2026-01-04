'use client';

import { Toggle } from '@/components/ui/toggle';
import { useBoopPlayful, useBoopScale } from '@/hooks/useBoop';
import { useIsClient } from '@/hooks/useIsClient';
import { animated } from '@react-spring/web';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

export function ThemeSwitcher() {
  const t = useTranslations('common');
  const { resolvedTheme, setTheme } = useTheme();
  const [containerStyle, containerTrigger] = useBoopScale();
  const [iconStyle, iconTrigger] = useBoopPlayful();
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
      className="h-fitcursor-pointer w-fit bg-transparent transition-transform hover:scale-110"
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={containerStyle}>
      <Toggle
        className="aspect-square h-full w-full text-3xl"
        aria-label={t(`theme.${resolvedTheme === 'dark' ? 'dark' : 'light'}`)}
        pressed={resolvedTheme === 'dark'}
        onPressedChange={(pressed) => {
          setTheme(pressed ? 'dark' : 'light');
        }}
        onClick={triggerStyles}>
        <animated.div style={iconStyle}>
          {resolvedTheme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
        </animated.div>
      </Toggle>
    </animated.div>
  );
}
