/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, Fragment, useRef } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./home.module.scss";
import CoverSlider from "@/components/CoverSlider";
import Image from "next/legacy/image";

export default function Home() {
  const { menuDisplay, setMenuDisplay } = useContext(StateContext);
  const targetRef = useRef(null);

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

  useEffect(() => {
    let prevScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 250) {
        setMenuDisplay(true);
      } else if (currentScrollY > prevScrollY) {
        setMenuDisplay(false);
      }
      prevScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={classes.container}>
      <section ref={targetRef}>
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
      <sectin className={classes.services}>
        <h2
          style={{
            fontFamily: "EnglishExtraLight",
          }}
        >
          Expertise
        </h2>
        <div className={classes.infoBox}>
          <div className={classes.info}>
            <h3>Building & Interior Design</h3>
            <p
              style={{
                fontFamily: "EnglishExtraLight",
              }}
            >
              Inspiration Design is a turnkey design firm, specializing in
              creative designs for residential and commercial projects, with
              exclusive construction management for new buildings and
              renovations.
            </p>
          </div>
          <div className={classes.imageBox}>
            <Image
              className={classes.image}
              src={
                "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider02-3.jpg"
              }
              blurDataURL={
                "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider02-3.jpg"
              }
              placeholder="blur"
              alt="Building & Interior Design"
              layout="fill"
              objectFit="contain"
              as="image"
              priority
            />
          </div>
        </div>
        <div
          className={classes.infoBox}
          style={{
            direction: "rtl",
          }}
        >
          <div className={classes.info}>
            <h3>Lighting Design</h3>
            <p
              style={{
                fontFamily: "EnglishExtraLight",
                direction: "ltr",
              }}
            >
              Inspiration Design is a turnkey design firm, specializing in
              creative designs for residential and commercial projects, with
              exclusive construction management for new buildings and
              renovations.
            </p>
          </div>
          <div className={classes.imageBox}>
            <Image
              className={classes.image}
              src={
                "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider02-3.jpg"
              }
              blurDataURL={
                "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider02-3.jpg"
              }
              placeholder="blur"
              alt="Lighting Design"
              layout="fill"
              objectFit="contain"
              as="image"
              priority
            />
          </div>
        </div>
        <div className={classes.infoBox}>
          <div className={classes.info}>
            <h3>LFS Construction</h3>
            <p
              style={{
                fontFamily: "EnglishExtraLight",
              }}
            >
              Inspiration Design is a turnkey design firm, specializing in
              creative designs for residential and commercial projects, with
              exclusive.
            </p>
          </div>
          <div className={classes.imageBox}>
            <Image
              className={classes.image}
              src={
                "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider02-3.jpg"
              }
              blurDataURL={
                "https://inspirationdesigns.ca/wp-content/uploads/2020/06/Home-Slider02-3.jpg"
              }
              placeholder="blur"
              alt="LFS Construction"
              layout="fill"
              objectFit="contain"
              as="image"
              priority
            />
          </div>
        </div>
      </sectin>
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
              <h4>{project.title}</h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
