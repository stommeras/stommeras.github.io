import * as React from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "@/constants";
import { rand } from "@/utils/math";
import { Leaf1 } from "./icons/fall/Leaf1";
import { Leaf2 } from "./icons/fall/Leaf2";
import { Leaf3 } from "./icons/fall/Leaf3";

interface MagicTextProps {
  text: string;
}

const backgroundPan = keyframes`
  from {
    background-position: 0% center;
  }
  to {
    background-position: -200% center;
  }
`;

const scale = keyframes`
  from, to {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const MagicContainer = styled.span`
  position: relative;
  display: inline-block;
`;

const MagicStar = styled.span`
  --size: clamp(20px, 1.5vw, 30px);

  display: block;
  position: absolute;
  height: var(--size);
  width: var(--size);
  animation: ${scale} 700ms ease infinite;

  svg {
    display: block;
    opacity: 0.7;
    animation: ${rotate} 1400ms linear infinite;
  }
`;

const MagicTextSpan = styled.span`
  animation: ${backgroundPan} 3s linear infinite;
  background: linear-gradient(to right, ${theme.colors.red}, ${theme.colors.darkOrange}, ${theme.colors.orange}, ${theme.colors.red});
  background-size: 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
`;

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
  const [starPositions, setStarPositions] = React.useState(() => Array.from({ length: 3 }, () => getRandomPosition()));

  const handleStarAnimationEnd = (index: number) => {
    setStarPositions((prev) => {
      const newPositions = [...prev];
      newPositions[index] = getRandomPosition();
      return newPositions;
    });
  };

  return (
    <MagicContainer>
      {starPositions.map((position, index) => (
        <MagicStar
          // biome-ignore lint/suspicious/noArrayIndexKey: No
          key={index}
          style={position}
          onAnimationIteration={() => handleStarAnimationEnd(index)}
        >
          {leafMapping[index as keyof typeof leafMapping]}
        </MagicStar>
      ))}
      <MagicTextSpan>{text}</MagicTextSpan>
    </MagicContainer>
  );
}

// const magicStar = (
//   <svg viewBox="0 0 512 512">
//     <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
//   </svg>
// );
