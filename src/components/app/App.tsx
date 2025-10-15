import * as React from "react";
import styles from "./app.module.css";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const INITIAL_TITLE = "TØMMERÅS";

export function App() {
  const [title, setTitle] = React.useState(INITIAL_TITLE);
  const isAnimating = React.useRef(false);
  const intervalRef = React.useRef<NodeJS.Timeout>(null);

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
          .map((_letter, index) => {
            if (index < iteration) {
              return INITIAL_TITLE[index];
            }
            return LETTERS[Math.floor(Math.random() * 26)];
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

  return (
    <div className={styles.app}>
      {/** biome-ignore lint/a11y/useKeyWithClickEvents: No */}
      <h1 className={styles.title} onClick={onTitleHover}>
        {title}
      </h1>
      <h2 className={styles.subtitle}>One of the websites of all time.</h2>
      <h3>✨</h3>
    </div>
  );
}
