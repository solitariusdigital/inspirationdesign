/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./home.module.scss";
import { NextSeo } from "next-seo";
import CoverSlider from "@/components/CoverSlider";
import logoBlack from "@/assets/logo-black.png";
import Image from "next/legacy/image";
import Light from "@/components/Light";

export default function Home() {
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);

  const gridImages = [
    {
      link: "https://inspirationdesigns.ca/wp-content/uploads/2017/12/1.jpg",
      title: "Queens",
      type: "image",
    },
    {
      link: "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider02-3.jpg",
      title: "Zayani Residence",
      type: "image",
    },
    {
      link: "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider02-3.jpg",
      title: "Project",
      type: "image",
    },
    {
      link: "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider01-2.jpg",
      title: "Project",
      type: "image",
    },
    {
      link: "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider02-3.jpg",
      title: "Project",
      type: "image",
    },
    {
      link: "https://inspirationdesigns.ca/wp-content/uploads/2017/12/1.jpg",
      title: "Project",
      type: "image",
    },
    {
      link: "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider02-3.jpg",
      title: "Project",
      type: "image",
    },
    {
      link: "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider02-3.jpg",
      title: "Zayani Residence",
      type: "image",
    },
    {
      link: "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider01-2.jpg",
      title: "Project",
      type: "image",
    },
  ];

  const expertise = [
    {
      title: "Building & Interior Design",
      description:
        "We offer unified Building and Interior Design services, developing the structure and inner space in seamless coordination. We design spaces that are structurally sound and code-compliant, prioritizing client vision and user well-being. The outcome is a high-quality, impactful built environment where interiors and architecture exist in perfect harmony.",
      link: "https://cloudstorage.storage.iran.liara.space/inspirationdesign/10.jpg",
      objectFit: "cover",
      aspectRatio: 16 / 9,
    },
    {
      title: "Lighting Design",
      description:
        "We create intentional lighting environments that enhance architecture and human experience. Our work balances artistic vision with technical precision, carefully specifying light quality, fixtures, and controls. We prioritize developing sustainable, energy-efficient schemes, translating light into a functional and emotive layer that reveals the full potential of the space.",
      link: "https://cloudstorage.storage.iran.liara.space/inspirationdesign/5.png",
      objectFit: "cover",
      aspectRatio: 3 / 4,
    },
    {
      title: "Light Steel Framing",
      description:
        "We specialize in LSF, offering a precise, efficient, and modern construction method. LSF uses pre-fabricated, cold-formed steel components for rapid on-site assembly. This framing is lightweight, non-combustible, and provides superior durability over wood, ensuring faster project completion and long-term quality.",
      link: "https://cloudstorage.storage.iran.liara.space/inspirationdesign/LFS-construction.jpg",
      objectFit: "cover",
      aspectRatio: 16 / 9,
    },
  ];

  useEffect(() => {
    navigationTopBar.map((nav) => {
      nav.active = false;
    });
    setNavigationTopBar([...navigationTopBar]);
  }, []);

  return (
    <>
      <NextSeo
        title="Design Firm"
        description="Inspiration Design is a turnkey design firm, specializing in creative designs for residential and commercial projects."
        canonical="https://inspirationdesigns.ca"
        openGraph={{
          type: "website",
          locale: "en_CA",
          url: "https://inspirationdesigns.ca",
          title: "Design Firm",
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
        <section>
          <CoverSlider />
        </section>
        <section className={classes.information}>
          <h1
            className={classes.text}
            style={{
              fontFamily: "English",
            }}
          >
            Designing spaces, light and systems for healthier, smarter
            buildings.
          </h1>
          <div className={classes.light}>
            <Light timer={500} />
          </div>
          <h3
            className={classes.text}
            style={{
              fontFamily: "EnglishExtraLight",
            }}
          >
            Inspiration Design is a turnkey design firm, specializing in
            creative designs for residential and commercial projects, with
            exclusive construction management for new buildings and renovations.
          </h3>
        </section>
        <section className={classes.services}>
          <h2
            style={{
              fontFamily: "English",
            }}
          >
            Expertise
          </h2>
          <div className={classes.light}>
            <Light timer={2000} />
          </div>
          {expertise.map((service, index) => (
            <div
              key={index}
              className={classes.infoBox}
              style={{
                direction: index % 2 ? "rtl" : "ltr",
              }}
            >
              <div className={classes.info}>
                <h3
                  style={{
                    fontFamily: "English",
                  }}
                >
                  {service.title}
                </h3>
                <div className={classes.light}>
                  <Light timer={500 * index} />
                </div>
                <p
                  style={{
                    direction: "ltr",
                  }}
                >
                  {service.description}
                </p>
              </div>
              <div
                className={classes.imageBox}
                style={{ aspectRatio: service.aspectRatio }}
              >
                <Image
                  className={classes.image}
                  src={service.link}
                  blurDataURL={service.link}
                  placeholder="blur"
                  alt={service.title}
                  layout="fill"
                  objectFit={service.objectFit}
                  as="image"
                  priority
                />
              </div>
            </div>
          ))}
        </section>
        <section className={classes.projects}>
          <h2
            style={{
              fontFamily: "English",
            }}
          >
            Projects
          </h2>
          <div className={classes.gridLayout}>
            {gridImages.map((project, index) => (
              <div key={index} className={classes.imageBox}>
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
                <div className={classes.overlay}>
                  <h4>{project.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
