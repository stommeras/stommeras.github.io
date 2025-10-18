import * as React from "react";
import { Broom } from "../icons/fall/Broom";
import { Pumpkin } from "../icons/fall/Pumpkin";
import { MagicText } from "../magic-text/MagicText";
import styles from "./app.module.css";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const INITIAL_TITLE = "TOMMERÅS";

export function App() {
  const [title, setTitle] = React.useState(INITIAL_TITLE);
  const isAnimating = React.useRef(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const onTitleHover = () => {
    if (isAnimating.current) return;

    let iteration = 0;
    isAnimating.current = true;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
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

      if (iteration >= INITIAL_TITLE.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        isAnimating.current = false;
      }

      iteration += 1 / 3;
    }, 30);
  };

  // Cleanup effect for interval
  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.app}>
      <h1 className={styles.title} onClick={onTitleHover}>
        {title}
        <Broom className={styles.broom} />
        <Pumpkin className={styles.pumpkin} />
      </h1>
      <h2 className={styles.subtitle}>One of the {<MagicText text="websites" />} of all time.</h2>
    </div>
  );
}
