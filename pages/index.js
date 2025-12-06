/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./home.module.scss";
import { NextSeo } from "next-seo";
import Link from "next/link";
import CoverSlider from "@/components/CoverSlider";
import logoBlack from "@/assets/logo-black.png";
import Light from "@/components/Light";
import FirebaseImage from "@/components/FirebaseImage";
import db from "@/services/firestore";
import { collection, getDocs } from "@firebase/firestore";

export default function Home() {
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { projectsCategory, setProjectsCategory } = useContext(StateContext);
  const [displayProjects, setDisplayProjects] = useState(null);

  const expertise = [
    {
      title: "Building & Interior Design",
      description:
        "We offer unified Building and Interior Design services, developing the structure and inner space in seamless coordination. We design spaces that are structurally sound and code-compliant, prioritizing client vision and user well-being. The outcome is a high-quality, impactful built environment where interiors and architecture exist in perfect harmony.",
      path: "Resources/Building.jpg",
      aspectRatio: 16 / 11,
      type: "residential",
    },
    {
      title: "Lighting Design",
      description:
        "We create intentional lighting environments that enhance architecture and human experience. Our work balances artistic vision with technical precision, carefully specifying light quality, fixtures, and controls. We prioritize developing sustainable, energy-efficient schemes, translating light into a functional and emotive layer that reveals the full potential of the space.",
      path: "Resources/Lighting.jpg",
      aspectRatio: 3 / 4,
      type: "lighting",
    },
    {
      title: "Lightweight Steel Framing",
      description:
        "We specialize in LSF, offering a precise, efficient, and modern construction method. LSF uses pre-fabricated, cold-formed steel components for rapid on-site assembly. This framing is lightweight, non-combustible, and provides superior durability over wood, ensuring faster project completion and long-term quality.",
      path: "Resources/LFS.jpg",
      aspectRatio: 16 / 11,
      type: "construction",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "Projects"));
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDisplayProjects(data.sort((a, b) => b.year - a.year));
    };
    fetchData();
  }, []);

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
              fontFamily: "TitilliumLight",
            }}
          >
            Designing spaces, light & systems for healthier, smarter buildings.
          </h1>
          <div className={classes.light}>
            <Light timer={500} />
          </div>
          <h3
            className={classes.text}
            style={{
              textTransform: "none",
            }}
          >
            Inspiration Design is a turnkey design firm, specializing in
            creative designs for residential and commercial projects, with
            exclusive construction management for new buildings and renovations.
          </h3>
        </section>
        <section className={classes.services}>
          {expertise.map((service, index) => (
            <div key={index} className={classes.infoBox}>
              <Link
                onClick={() => {
                  setProjectsCategory(service.type);
                }}
                href="/projects"
                passHref
              >
                <div className={classes.info}>
                  <h3
                    style={{
                      fontFamily: "TitilliumLight",
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
              </Link>
              <div
                className={classes.imageBox}
                style={{
                  aspectRatio: service.aspectRatio,
                }}
              >
                <Link
                  onClick={() => {
                    setProjectsCategory(service.type);
                  }}
                  href="/projects"
                  passHref
                >
                  <FirebaseImage path={service.path} alt={service.title} />
                </Link>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
