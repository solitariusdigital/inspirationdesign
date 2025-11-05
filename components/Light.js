/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export default function Progress({
  color = "#FCEF91",
  height = 1,
  border = true,
  duration = 4000, // time for one full sweep (ms)
  tailWidth = 20, // width of the light tail (in %)
  timer,
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId;
    const timeoutId = setTimeout(() => {
      let start = performance.now();
      const animate = (time) => {
        const elapsed = time - start;
        let percentage = Math.min((elapsed / duration) * 100, 100);
        setProgress(percentage);
        if (elapsed >= duration) {
          // Restart from 0 smoothly
          start = performance.now();
        }
        frameId = requestAnimationFrame(animate);
      };
      frameId = requestAnimationFrame(animate);
    }, timer);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
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
      transparent ${progress - tailWidth < 0 ? 0 : progress - tailWidth}%,
      ${color} ${progress}%,
      transparent ${progress + 0.1}%
    )`,
    transition: "background 0.05s linear",
  };

  return (
    <div style={containerStyle}>
      <div style={fillerStyle}></div>
    </div>
  );
}
