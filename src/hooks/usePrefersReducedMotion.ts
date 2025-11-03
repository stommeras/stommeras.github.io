import * as React from 'react';

interface MediaQueryListEvent {
  matches: boolean;
}

const QUERY: string = '(prefers-reduced-motion: no-preference)';

// Source here: https://joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState<boolean>(true);

  React.useEffect(() => {
    const mediaQueryList: MediaQueryList = window.matchMedia(QUERY);

    // Set the initial client-side value
    setPrefersReducedMotion(!mediaQueryList.matches);

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
