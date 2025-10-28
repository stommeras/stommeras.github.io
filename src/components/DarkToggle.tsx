'use client';

import { Toggle } from '@base-ui-components/react';
import { animated } from '@react-spring/web';
import { useBoop } from '@/hooks/useBoop';
import { useTheme } from 'next-themes';

export const DarkToggle = () => {
  const { theme, setTheme } = useTheme();
  const [style, trigger] = useBoop({ scale: 1.1, rotation: 15 });

  console.log('Current theme:', theme);

  // Don't render on server or if theme is not ready
  if (!theme) {
    return null;
  }

  return (
    <Toggle
      pressed={theme === 'dark'}
      onPressedChange={(pressed) => {
        setTheme(pressed ? 'dark' : 'light');
      }}
      style={style}
      onClick={trigger}
      render={(props, state) => {
        return (
          <animated.button {...props} className="aspect-square cursor-pointer border-none bg-transparent p-1 text-2xl">
            {state.pressed ? '☀️' : '🌑'}
          </animated.button>
        );
      }}
    />
  );
};
