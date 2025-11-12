"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/services/firebase";

export default function FirebaseImage({ path, alt, objectFit = "cover" }) {
  const [url, setUrl] = useState("");
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

  if (!url) return <p style={{ fontSize: "small" }}>...</p>;

  const imageStyle = {
    objectFit: objectFit,
    objectPosition: "50% 0%",
    opacity: loaded ? 1 : 0,
    transition: "opacity 0.2s ease-in",
  };

  return (
    <Image
      src={url}
      alt={alt}
      fill
      style={imageStyle}
      unoptimized
      priority
      onLoadingComplete={() => setLoaded(true)}
    />
  );
}
