'use client';

import { useEffect, useState } from 'react';

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // We check if the device's *primary* input mechanism can hover.
    // If it cannot hover (like a finger), it is a touch device.
    const mediaQuery = window.matchMedia('(hover: none)');

    const handleChange = () => {
      setIsTouch(mediaQuery.matches);
    };

    handleChange();

    // Listen for changes (rare, but handles attaching/detaching mice on tablets)
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isTouch;
}
