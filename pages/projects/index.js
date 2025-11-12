import { useState, useContext } from "react";
import { NextSeo } from "next-seo";
import classes from "./projects.module.scss";
import logoBlack from "@/assets/logo-black.png";
import FirebaseImage from "@/components/FirebaseImage";

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
      path: "Resources/10.jpg",
      title: "Queens",
      type: "image",
      category: "residential",
    },
    {
      path: "Resources/9.jpg",
      title: "Zayani Residence",
      type: "image",
      category: "commercial",
    },
    {
      path: "Resources/9.jpg",
      title: "Project",
      type: "image",
      category: "residential",
    },
    {
      path: "Resources/10.jpg",
      title: "Project",
      type: "image",
      category: "lighting",
    },
    {
      path: "Resources/9.jpg",
      title: "Project",
      type: "image",
      category: "commercial",
    },
    {
      path: "Resources/10.jpg",
      title: "Project",
      type: "image",
      category: "residential",
    },
    {
      path: "Resources/9.jpg",
      title: "Project",
      type: "image",
      category: "residential",
    },
    {
      path: "Resources/10.jpg",
      title: "Zayani Residence",
      type: "image",
      category: "interior",
    },
    {
      path: "Resources/9.jpg",
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
                  <FirebaseImage path={project.path} alt={project.title} />
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
