/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, Fragment, useRef } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./home.module.scss";
import CoverSlider from "@/components/CoverSlider";

export default function Home() {
  const { menuDisplay, setMenuDisplay } = useContext(StateContext);
  const targetRef = useRef(null);

  const covers = [
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
        <CoverSlider covers={covers} />
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
      <section className={classes.gridLayout}></section>
    </div>
  );
}
