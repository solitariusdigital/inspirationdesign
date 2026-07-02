import { useState, useEffect } from "react";
import classes from "./Typewriter.module.scss";

export default function Typewriter({ text, font, size, speed }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    let i = 0;

    const interval = setInterval(() => {
      i++;
      setVisibleCount(i);

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <h1
      style={{
        lineHeight: "30px",
      }}
    >
      {text.split("").map((char, index) => (
        <span
          style={{
            fontFamily: font,
            fontSize: "inherit",
            letterSpacing: "0.1em",
          }}
          key={index}
          className={`${classes.letter} ${index < visibleCount ? classes.show : ""}`}
        >
          {char}
        </span>
      ))}
    </h1>
  );
}
