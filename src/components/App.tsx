import { animated } from "@react-spring/web";
import * as React from "react";
import styled from "styled-components";
import { useBoop } from "@/hooks/useBoop";
import { Pumpkin } from "./icons/fall/Pumpkin";
import { MagicText } from "./MagicText";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const INITIAL_TITLE = "TØMMERÅS";

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  font-style: italic;
  padding: 0rem clamp(1rem, 2vw, 3rem);
`;

const Title = styled.h1`
  position: relative;
  font-size: clamp(3rem, 10vw, 4rem);
  border-radius: clamp(0.4rem, 0.75vw, 1rem);
  cursor: pointer;
`;

const PumpkinContainer = styled(animated.span)`
  position: absolute;
  width: 12%;
  top: -5%;
  right: 10.5%;
`;

const Subtitle = styled.h2`
  font-size: clamp(1.5rem, 5vw, 2rem);
  text-align: center;
`;

export function App() {
  const [title, setTitle] = React.useState(INITIAL_TITLE);
  const animationRef = React.useRef<number>(0);
  const startTimeRef = React.useRef<number>(0);

  const [style, trigger] = useBoop({ y: -10, scale: 1.1, timing: 200, springConfig: { tension: 300, friction: 15 } });

  const onTitleHover = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    trigger();
    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current;
      const iteration = elapsed / 90; // ~30fps equivalent (30ms * 3 = 90ms per iteration)

      setTitle((prevTitle) =>
        prevTitle
          .split("")
          .map((_, index) => {
            if (index < iteration) {
              return INITIAL_TITLE[index];
            }
            return LETTERS[Math.floor(Math.random() * LETTERS.length)];
          })
          .join(""),
      );

      // Continue animation until all letters are revealed
      if (iteration < INITIAL_TITLE.length) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setTitle(INITIAL_TITLE);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <AppContainer>
      <Title onMouseEnter={onTitleHover} onTouchStart={onTitleHover}>
        {title}
        <PumpkinContainer style={style}>
          <Pumpkin />
        </PumpkinContainer>
      </Title>
      <Subtitle>One of the {<MagicText text="websites" />} of all time.</Subtitle>
    </AppContainer>
  );
}
