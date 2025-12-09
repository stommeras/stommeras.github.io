'use client';

import { rand } from '@/utils/math';
import { CSSProperties, useEffect, useState } from 'react';

interface MagicTextProps {
  text: string;
}

const getRandomPosition = (): CSSProperties => ({
  left: `${rand(-10, 100)}%`,
  top: `${rand(-40, 80)}%`,
  rotate: `${rand(0, 360)}deg`,
});

const iconMapping = {
  0: '❄️',
  1: '🎁',
  2: '✨',
} as const;

export function MagicText({ text }: MagicTextProps) {
  const [iconPositions, setIconPositions] = useState<CSSProperties[]>(() =>
    Array.from({ length: 3 }, () => getRandomPosition())
  );
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsHydrated(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleIconAnimationEnd = (index: number) => {
    if (!isHydrated) return;

    setIconPositions((prev) => {
      const newPositions = [...prev];
      newPositions[index] = getRandomPosition();
      return newPositions;
    });
  };

  return (
    <span className="relative inline-block">
      {isHydrated &&
        iconPositions.map((position, index) => (
          <span
            key={index}
            className="animate-scale absolute flex items-center"
            style={position}
            onAnimationIteration={() => handleIconAnimationEnd(index)}>
            <span className="animate-rotate flex items-center not-italic opacity-70">
              {iconMapping[index as keyof typeof iconMapping]}
            </span>
          </span>
        ))}
      <span className="animate-background-pan bg-linear-to-r from-red-600 via-green-600 to-red-600 bg-size-[200%] bg-clip-text whitespace-nowrap text-transparent">
        {text}
      </span>
    </span>
  );
}
