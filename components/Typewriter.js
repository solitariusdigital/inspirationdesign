import { useState, useEffect } from "react";

export default function Typewriter({ text, font, size, speed = 200 }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <h1
      style={{
        fontFamily: font,
        fontSize: size ? "x-large" : "none",
        letterSpacing: size ? "0.3em" : "none",
      }}
    >
      {display}
    </h1>
  );
}
