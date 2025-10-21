import * as React from "react";

interface MediaQueryListEvent {
  matches: boolean;
}

const QUERY: string = "(prefers-reduced-motion: no-preference)";

const isRenderingOnServer: boolean = typeof window === "undefined";

const getInitialState = (): boolean => {
  // For our initial server render, we won't know if the user
  // prefers reduced motion, but it doesn't matter. This value
  // will be overwritten on the client, before any animations
  // occur.
  return isRenderingOnServer ? true : !window.matchMedia(QUERY).matches;
};

// Source here: https://joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState<boolean>(getInitialState);

  React.useEffect(() => {
    const mediaQueryList: MediaQueryList = window.matchMedia(QUERY);

    const listener = (event: MediaQueryListEvent): void => {
      setPrefersReducedMotion(!event.matches);
    };

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", listener);
    } else {
      mediaQueryList.addListener(listener);
    }
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    };
  }, []);

  return prefersReducedMotion;
}
