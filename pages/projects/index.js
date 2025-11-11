import { useState, useContext, Fragment } from "react";
import { NextSeo } from "next-seo";
import classes from "./projects.module.scss";
import Image from "next/legacy/image";
import logoBlack from "@/assets/logo-black.png";

export default function Projects() {
  const [pageType, setPageType] = useState(
    "all" ||
      "residential" ||
      "commercial" ||
      "lighting" ||
      "interior" ||
      "construction"
  );
  const navigation = [
    "all",
    "residential",
    "commercial",
    "lighting",
    "interior",
    "construction",
  ];

  const gridImages = [
    {
      link: "https://inspirationdesigns.ca/wp-content/uploads/2017/12/1.jpg",
      title: "Queens",
      type: "image",
      category: "residential",
    },
    {
      link: "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider02-3.jpg",
      title: "Zayani Residence",
      type: "image",
      category: "commercial",
    },
    {
      link: "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider02-3.jpg",
      title: "Project",
      type: "image",
      category: "residential",
    },
    {
      link: "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider01-2.jpg",
      title: "Project",
      type: "image",
      category: "lighting",
    },
    {
      link: "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider02-3.jpg",
      title: "Project",
      type: "image",
      category: "commercial",
    },
    {
      link: "https://inspirationdesigns.ca/wp-content/uploads/2017/12/1.jpg",
      title: "Project",
      type: "image",
      category: "residential",
    },
    {
      link: "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider02-3.jpg",
      title: "Project",
      type: "image",
      category: "residential",
    },
    {
      link: "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider02-3.jpg",
      title: "Zayani Residence",
      type: "image",
      category: "interior",
    },
    {
      link: "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider01-2.jpg",
      title: "Project",
      type: "image",
      category: "construction",
    },
  ];

  return (
    <>
      <NextSeo
        title="Projects"
        description="Inspiration Design is a turnkey design firm, specializing in creative designs for residential and commercial projects."
        canonical="https://inspirationdesigns.ca/projects"
        openGraph={{
          type: "website",
          locale: "en_CA",
          url: "https://inspirationdesigns.ca/projects",
          title: "Projects",
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
      <div className={classes.container}>
        <div className={classes.navigation}>
          {navigation.map((nav, index) => (
            <p
              key={index}
              className={pageType === nav ? classes.navActive : classes.nav}
              onClick={() => setPageType(nav)}
            >
              {nav}
            </p>
          ))}
        </div>
        <div className={classes.gridLayout}>
          {gridImages
            .filter(
              (project) => pageType === "all" || project.category === pageType
            )
            .map((project, index) => (
              <div key={index}>
                <div className={classes.imageBox}>
                  <Image
                    className={classes.image}
                    src={project.link}
                    blurDataURL={project.link}
                    placeholder="blur"
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </div>
                <h4
                  style={{
                    fontFamily: "TitilliumLight",
                  }}
                >
                  {project.title}
                </h4>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
