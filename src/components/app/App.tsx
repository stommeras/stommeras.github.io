import { animated } from "@react-spring/web";
import * as React from "react";
import { useBoop } from "@/hooks/useBoop";
import { Pumpkin } from "../icons/fall/Pumpkin";
import { MagicText } from "../magic-text/MagicText";
import styles from "./app.module.css";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const INITIAL_TITLE = "TØMMERÅS";

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
    <div className={styles.app}>
      <h1 className={styles.title} onMouseEnter={onTitleHover}>
        {title}
        <animated.span style={style} className={styles.pumpkin}>
          <Pumpkin />
        </animated.span>
      </h1>
      <h2 className={styles.subtitle}>One of the {<MagicText text="websites" />} of all time.</h2>
    </div>
  );
}
