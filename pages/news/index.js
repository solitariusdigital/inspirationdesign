import { useState, useContext } from "react";
import { NextSeo } from "next-seo";
import classes from "./news.module.scss";
import logoBlack from "@/assets/logo-black.png";

export default function News() {
  return (
    <>
      <NextSeo
        title="News"
        description="Inspiration Design is a turnkey design firm, specializing in creative designs for residential and commercial projects."
        canonical="https://inspirationdesigns.ca/news"
        openGraph={{
          type: "website",
          locale: "en_CA",
          url: "https://inspirationdesigns.ca/news",
          title: "News",
          description:
            "Inspiration Design is a turnkey design firm, specializing in creative designs for residential and commercial projects.",
          siteName: "Inspiration Design",
          images: {
            url: logoBlack,
            width: 1200,
            height: 630,
            alt: "Inspiration Design",
          },
        }}
        robots="index, follow"
      />
      <div>News</div>
    </>
  );
}
