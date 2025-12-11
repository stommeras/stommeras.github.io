import { useEffect, useState } from 'react';

interface MediaQueryListEvent {
  matches: boolean;
}

const QUERY: string = '(prefers-reduced-motion: no-preference)';

// Source here: https://joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return true;
    }
    const mediaQueryList: MediaQueryList = window.matchMedia(QUERY);
    return !mediaQueryList.matches;
  });

  useEffect(() => {
    const mediaQueryList: MediaQueryList = window.matchMedia(QUERY);

    const listener = (event: MediaQueryListEvent): void => {
      setPrefersReducedMotion(!event.matches);
    };

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
    } else {
      mediaQueryList.addListener(listener);
    }
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    };
  }, []);

  // During SSR and initial hydration, always return true to prevent animations
  // This ensures server and client render the same content initially
  return prefersReducedMotion;
}
