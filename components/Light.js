import { useEffect, useRef, useState } from "react";

export default function Light({
  color = "#f9f1b6ff",
  height = 1,
  border = true,
  duration = 9000,
  tailWidth = 20,
  timer = 0,
}) {
  const [progress, setProgress] = useState(0);
  const frameRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const startAnimation = () => {
      if (!startRef.current) startRef.current = performance.now();
      const animate = (time) => {
        const elapsed = (time - startRef.current) % duration;
        setProgress((elapsed / duration) * 100);
        frameRef.current = requestAnimationFrame(animate);
      };
      frameRef.current = requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(startAnimation, timer);
    return () => {
      cancelAnimationFrame(frameRef.current);
      clearTimeout(timeoutId);
    };
  }, [duration, timer]);

  const containerStyle = {
    width: "100%",
    height,
    borderRadius: border ? "50px" : "0px",
    overflow: "hidden",
    position: "relative",
  };

  const fillerStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    background: `linear-gradient(
      90deg,
      transparent ${Math.max(progress - tailWidth, 0)}%,
      ${color} ${progress}%,
      transparent ${progress + 0.1}%
    )`,
  };

  return (
    <div style={containerStyle}>
      <div style={fillerStyle}></div>
    </div>
  );
}
