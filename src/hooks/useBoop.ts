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

/**
 * Animation presets for common boop interactions
 */
export const BOOP_PRESETS = {
  /** Subtle scale and rotation - good for icons and links */
  hover: { scale: 1.1, rotation: 10 },
  /** Upward bounce with scale - good for interactive elements */
  jump: { y: -10, scale: 1.1, springConfig: { tension: 200, friction: 15 } },
  /** Scale only - good for contained elements */
  scale: { scale: 1.1 },
  /** Scale with larger rotation - good for playful elements */
  playful: { scale: 1.1, rotation: 15 },
} as const;

/**
 * Preset hook for common hover animation: scale 1.1 + rotation 10deg
 * Used in Header, LocaleSwitcher, Footer links
 */
export function useBoopHover() {
  return useBoop(BOOP_PRESETS.hover);
}

/**
 * Preset hook for jump animation: y -10 + scale 1.1
 * Used in LandingTitle
 */
export function useBoopJump() {
  return useBoop(BOOP_PRESETS.jump);
}

/**
 * Preset hook for scale-only animation
 * Used in DarkToggle container
 */
export function useBoopScale() {
  return useBoop(BOOP_PRESETS.scale);
}

/**
 * Preset hook for playful animation: scale 1.1 + rotation 15deg
 * Used in DarkToggle icon
 */
export function useBoopPlayful() {
  return useBoop(BOOP_PRESETS.playful);
}
