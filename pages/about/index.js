import { useState, useContext, Fragment } from "react";
import { NextSeo } from "next-seo";
import classes from "./about.module.scss";
import logoBlack from "@/assets/logo-black.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function About() {
  const testimonials = [
    {
      title: "AFDON Construction Company",
      link: "",
    },
    {
      title: "French Ambassador in Bahrain",
      link: "",
    },
    {
      title: "NYIT, New York Intitute of Technolongy",
      link: "",
    },
    {
      title: "University of Bahrain",
      link: "",
    },
    {
      title: "NIA Construction Company",
      link: "",
    },
    {
      title: "Zain Jewellery",
      link: "",
    },
    {
      title: "Mr. McNeill",
      link: "",
    },
    {
      title: "Ms. Mazaheri",
      link: "",
    },
    {
      title: "Mrs. Tabeshi",
      link: "",
    },
    {
      title: "Mr. Karkheiran",
      link: "",
    },
    {
      title: "Mr. Saii",
      link: "",
    },
    {
      title: "Mrs. Alimadad",
      link: "",
    },
    {
      title: "Mr. White",
      link: "",
    },
  ];

  return (
    <>
      <NextSeo
        title="About"
        description="Inspiration Design is a turnkey design firm, specializing in creative designs for residential and commercial projects."
        canonical="https://inspirationdesigns.ca/about"
        openGraph={{
          type: "website",
          locale: "en_CA",
          url: "https://inspirationdesigns.ca/about",
          title: "About",
          description:
            "Inspiration Design is a turnkey design firm, specializing in creative designs for residential and commercial projects.",
          siteName: "Design Firm",
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
        <div className={classes.text}>
          <h3>Turnkey Creative Solutions</h3>
          <p
            style={{
              fontFamily: "EnglishLight",
            }}
          >
            Inspiration Design is a turnkey design firm founded in 2006,
            providing creative design and exclusive construction management for
            residential and commercial renovations and new builds.
          </p>
          <p
            style={{
              fontFamily: "EnglishLight",
            }}
          >
            The firm has grown into a full-service provider offering building
            design, interior design and lighting design. Inspiration Design has
            successfully completed over 40 diverse projects; including high-end
            homes, hotels, and retail spaces by working closely with top
            international architects, designers, and builders.
          </p>
          <p
            style={{
              fontFamily: "EnglishLight",
            }}
          >
            Founder Parastoo Jafari drives the firm with her comprehensive
            experience as a building designer with advanced education in
            architecture and engineering. She holds a Master's degree from
            "Ecole D’Architecture de Bordeaux," France, and a Ph.D. in
            architecture, and is a registered architect. Her extensive
            international design background is further strengthened by 12 years
            of technical management experience at a leading German building
            materials manufacturer.
          </p>
        </div>
        <div className={classes.text}>
          <h3>Experience & Design Philosophy</h3>
          <p
            style={{
              fontFamily: "EnglishLight",
            }}
          >
            Inspiration Design has a privileged history of working on diverse
            international projects, including prestigious commissions for Royal
            families and European Embassies in the Middle East, along with
            high-end houses in West Vancouver.
          </p>
          <p
            style={{
              fontFamily: "EnglishLight",
            }}
          >
            Our work balances a contemporary vision with the client's requested
            aesthetic, covering a vast range of architectural styles. We
            prioritize understanding and meeting client aesthetic and
            operational objectives while strictly adhering to budget and
            schedule, which has helped us maintain an extensive client base.
          </p>
          <p
            style={{
              fontFamily: "EnglishLight",
            }}
          >
            We view our profession as both art and science. We are committed to
            building healthier structures using advanced construction knowledge
            and technology. We achieve this by consciously focusing on
            environmental responsibility and sustainability. We carefully
            analyze all project data; including site, orientation, building
            codes, and materials to ensure optimal solutions for energy
            performance, durability, ventilation, and maintenance.
          </p>
        </div>
        <div className={classes.text}>
          <h3>Testimonials</h3>
          <div className={classes.gridLayout}>
            {testimonials.map((item, index) => (
              <div key={index} className={classes.item}>
                <h5>{item.title}</h5>
                <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
