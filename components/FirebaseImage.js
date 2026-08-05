import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/services/firebase";

export default function FirebaseImage({
  path,
  alt,
  objectFit = "cover",
  mode = "fill",
}) {
  const [url, setUrl] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!path) {
      setUrl(null);
      setLoaded(false);
      return;
    }
    let cancelled = false;
    setUrl(null);
    setLoaded(false);
    const imageRef = ref(storage, path);
    getDownloadURL(imageRef)
      .then((downloadURL) => {
        if (!cancelled) setUrl(downloadURL);
      })
      .catch((err) => console.error("Error loading Firebase image:", err));
    return () => {
      cancelled = true;
    };
  }, [path]);

  if (!url) return null;

  const forceRepaint = () => {
    setLoaded(true);
    requestAnimationFrame(() => {
      const el = wrapperRef.current;
      if (!el) return;
      el.style.display = "none";
      void el.offsetHeight; // force synchronous reflow
      el.style.display = "";
    });
  };

  const baseStyle = {
    objectFit,
    opacity: loaded ? 1 : 0,
    filter: loaded ? "none" : "blur(20px)",
    transition: "opacity 0.2s ease-in, filter 0.3s ease-in",
    boxShadow: `rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px`,
    transform: "translateZ(0)",
    WebkitTransform: "translateZ(0)",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
  };

  return (
    <div
      ref={wrapperRef}
      style={{
        position: mode === "fill" ? "relative" : "static",
        width: "100%",
        height: mode === "fill" ? "100%" : "auto",
      }}
    >
      <Image
        key={url}
        src={url}
        alt={alt}
        {...(mode === "fill" ? { fill: true } : { width: 1200, height: 800 })}
        style={
          mode === "fill"
            ? baseStyle
            : { ...baseStyle, width: "100%", height: "auto" }
        }
        unoptimized
        priority
        onLoad={forceRepaint}
      />
    </div>
  );
}
