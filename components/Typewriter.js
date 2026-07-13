import { useState, useEffect, useRef } from "react";
import classes from "./Typewriter.module.scss";

function shuffledIndices(length) {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Typewriter({ text, font, speed, margin }) {
  const [visibleIndices, setVisibleIndices] = useState(new Set());
  const orderRef = useRef([]);

  useEffect(() => {
    orderRef.current = shuffledIndices(text.length);
    setVisibleIndices(new Set());
    let i = 0;

    const interval = setInterval(() => {
      i++;
      setVisibleIndices(new Set(orderRef.current.slice(0, i)));

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <h1
      style={{
        marginLeft: margin ? "8px" : "0px",
      }}
    >
      {text.split("").map((char, index) => (
        <span
          style={{
            fontFamily: font,
            fontSize: "inherit",
            letterSpacing: "0.2em",
          }}
          key={index}
          className={`${classes.letter} ${visibleIndices.has(index) ? classes.show : ""}`}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
}
