import { useState, useEffect } from "react";
import Image from "next/image";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/services/firebase";

export default function FirebaseImage({
  path,
  alt,
  objectFit = "cover",
  mode = "fill", // "fill" or "intrinsic"
}) {
  const [url, setUrl] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!path) return;
    const imageRef = ref(storage, path);
    getDownloadURL(imageRef)
      .then((downloadURL) => {
        setUrl(downloadURL);
      })
      .catch((err) => console.error("Error loading Firebase image:", err));
  }, [path]);

  if (!url) return;

  const baseStyle = {
    objectFit: objectFit,
    opacity: loaded ? 1 : 0,
    filter: loaded ? "none" : "blur(20px)",
    transition: "opacity 0.2s ease-in, filter 0.3s ease-in",
    boxShadow: `rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px`,
  };

  if (mode === "fill") {
    return (
      <Image
        src={url}
        alt={alt}
        fill
        style={baseStyle}
        unoptimized
        priority
        onLoad={() => setLoaded(true)}
      />
    );
  }

  // intrinsic mode
  return (
    <Image
      src={url}
      alt={alt}
      width={1200}
      height={800}
      style={{
        ...baseStyle,
        width: "100%",
        height: "auto",
      }}
      unoptimized
      priority
      onLoad={() => setLoaded(true)}
    />
  );
}
