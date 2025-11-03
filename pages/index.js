/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./home.module.scss";
import CoverSlider from "@/components/CoverSlider";
import Image from "next/legacy/image";

export default function Home() {
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
        "Inspiration Design is a turnkey design firm, specializing icreative designs for residential and commercial projects, with exclusive construction management for new buildings and renovations.",
      link: "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider02-3.jpg",
    },
    {
      title: "Lighting Design",
      description:
        "Inspiration Design is a turnkey design firm, specializing icreative designs for residential and commercial projects, with exclusive construction management for new buildings and renovations.",
      link: "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider02-3.jpg",
    },
    {
      title: "LFS Construction",
      description:
        "Inspiration Design is a turnkey design firm, specializing icreative designs for residential and commercial projects, with exclusive construction management for new buildings and renovations.",
      link: "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider02-3.jpg",
    },
  ];

  return (
    <div className={classes.container}>
      <section>
        <CoverSlider />
      </section>
      <section className={classes.information}>
        <h1>
          Designing spaces, light, and systems for healthier, smarter buildings.
        </h1>
        <h3
          style={{
            fontFamily: "EnglishExtraLight",
          }}
        >
          Inspiration Design is a turnkey design firm, specializing in creative
          designs for residential and commercial projects, with exclusive
          construction management for new buildings and renovations.
        </h3>
      </section>
      <section className={classes.services}>
        <h2
          style={{
            fontFamily: "EnglishExtraLight",
          }}
        >
          Expertise
        </h2>
        {expertise.map((service, index) => (
          <div
            key={index}
            className={classes.infoBox}
            style={{
              direction: index % 2 ? "rtl" : "ltr",
            }}
          >
            <div className={classes.info}>
              <h3>{service.title}</h3>
              <p
                style={{
                  fontFamily: "EnglishExtraLight",
                  direction: "ltr",
                }}
              >
                {service.description}
              </p>
            </div>
            <div className={classes.imageBox}>
              <Image
                className={classes.image}
                src={service.link}
                blurDataURL={service.link}
                placeholder="blur"
                alt={service.title}
                layout="fill"
                objectFit="contain"
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
            fontFamily: "EnglishExtraLight",
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
                as="image"
                priority
              />
              <h5>{project.title}</h5>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
