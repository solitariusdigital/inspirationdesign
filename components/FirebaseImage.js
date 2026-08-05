import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/services/firebase";

export default function FirebaseImage({
  path,
  alt,
  objectFit = "cover",
  mode = "fill",
  priority = false, // only pass true explicitly for true hero/above-fold images
}) {
  const [url, setUrl] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(priority); // priority images skip the observer
  const wrapperRef = useRef(null);

  // Gate everything behind visibility, unless this is a priority image
  useEffect(() => {
    if (priority || inView) return;
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }, // start loading a bit before it's actually visible
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority, inView]);

  useEffect(() => {
    if (!path || !inView) return;
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
  }, [path, inView]);

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
        minHeight: mode === "fill" ? undefined : "1px", // keeps observer able to measure before image loads
      }}
    >
      {url && (
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
          priority={priority}
          onLoad={forceRepaint}
        />
      )}
    </div>
  );
}
