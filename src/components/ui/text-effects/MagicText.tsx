'use client';

import { Leaf1 } from '@/components/icons/fall/Leaf1';
import { Leaf2 } from '@/components/icons/fall/Leaf2';
import { Leaf3 } from '@/components/icons/fall/Leaf3';
import { rand } from '@/utils/math';
import * as React from 'react';

interface MagicTextProps {
  text: string;
}

const getRandomPosition = (): React.CSSProperties => ({
  left: `${rand(-10, 100)}%`,
  top: `${rand(-40, 80)}%`,
  rotate: `${rand(0, 360)}deg`,
});

const leafMapping = {
  0: <Leaf1 />,
  1: <Leaf2 />,
  2: <Leaf3 />,
} as const;

export function MagicText({ text }: MagicTextProps) {
  const [starPositions, setStarPositions] = React.useState<React.CSSProperties[]>(() =>
    Array.from({ length: 3 }, () => ({ left: '0%', top: '0%', rotate: '0deg' }))
  );
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setIsHydrated(true);
    setStarPositions(Array.from({ length: 3 }, () => getRandomPosition()));
  }, []);

  const handleStarAnimationEnd = (index: number) => {
    if (!isHydrated) return;

    setStarPositions((prev) => {
      const newPositions = [...prev];
      newPositions[index] = getRandomPosition();
      return newPositions;
    });
  };

  return (
    <span className="relative inline-block">
      {isHydrated &&
        starPositions.map((position, index) => (
          <span
            key={index}
            className="animate-scale absolute block h-[clamp(20px,1.5vw,30px)] w-[clamp(20px,1.5vw,30px)]"
            style={position}
            onAnimationIteration={() => handleStarAnimationEnd(index)}>
            <span className="animate-rotate block opacity-70">{leafMapping[index as keyof typeof leafMapping]}</span>
          </span>
        ))}
      <span className="animate-background-pan bg-linear-to-r from-red-600 via-amber-300 to-red-600 bg-size-[200%] bg-clip-text whitespace-nowrap text-transparent">
        {text}
      </span>
    </span>
  );
}
