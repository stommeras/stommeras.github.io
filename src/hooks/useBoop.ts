import { useIsClient } from '@/hooks/useIsClient';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useSpring } from '@react-spring/web';
import { useCallback, useEffect, useState } from 'react';

export interface BoopConfig {
  x?: number;
  y?: number;
  rotation?: number;
  scale?: number;
  timing?: number;
  springConfig?: {
    tension: number;
    friction: number;
  };
}

// Source here: https://www.joshwcomeau.com/snippets/react-hooks/use-boop/
export function useBoop({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1,
  timing = 150,
  springConfig = {
    tension: 300,
    friction: 10,
  },
}: BoopConfig) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isBooped, setIsBooped] = useState(false);
  const isClient = useIsClient();

  const style = useSpring({
    transform: isBooped
      ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         scale(1)`,
    config: springConfig,
  });

  useEffect(() => {
    if (!isBooped) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsBooped(false);
    }, timing);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isBooped, timing]);

  const trigger = useCallback(() => {
    setIsBooped(true);
  }, []);

  const appliedStyle = prefersReducedMotion || !isClient ? {} : style;

  return [appliedStyle, trigger] as const;
}
