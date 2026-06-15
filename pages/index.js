/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./home.module.scss";
import Router from "next/router";
import { NextSeo } from "next-seo";
import Link from "next/link";
import CoverSlider from "@/components/CoverSlider";
import logoBlack from "@/assets/logo-black.png";
import Light from "@/components/Light";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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
      subTitle: `“ There are 360 degrees, so why stick to one? ” - Zaha Hadid`,
      descriptionOne:
        "Building and interior design for residential, commercial, cultural, and institutional projects internationally has been at the core of Inspiration Design’s work for over 25 years internationally and for the last 15 years in Canada. Our experience includes international projects in Europe and the Middle East, including work for the French Embassy, Ministries of Culture, Royal families, retail and exhibition spaces in Dubai and Bahrain, extending to multi-family residential developments on the North Shore of Vancouver and luxury custom homes in West Vancouver.",
      descriptionTwo:
        "Combining advanced education in architecture and interior design in France with international experience, our work integrates contemporary design, new technologies, and current design trends tailored to each client’s vision, lifestyle, and functional needs.",
      path: "Resources/Building.jpg",
      aspectRatio: 16 / 11,
      type: "residential",
    },
    {
      title: "Lighting Design",
      subTitle: `“ Light is an essential element of life. Good light is like a good meal - required for well-being. ” - Yann Kersalé`,
      descriptionOne:
        "Lighting design for residential, commercial, heritage, and public spaces internationally, ranging from luxury custom homes and residential interiors to cultural and public landmarks, has been part of Inspiration Design’s work for over 20 years in Canada and abroad. Our recent work includes lighting design contributions for Vancouver Chinatown, including the Millennium Gate, Dr. Sun Yat-Sen Classical Chinese Garden, and the Chinese Cultural Centre.",
      descriptionTwo:
        "In our work, light is not decoration; it is a material that reveals architecture’s narrative and essence. Inspired by the idea of using the night as a canvas, our designs give buildings a second life after dark, where light becomes part of the space itself and part of the story architecture tells.",
      path: "Resources/Lighting.jpg",
      aspectRatio: 16 / 11,
      type: "lighting",
    },
    {
      title: "Healthy House Design | Lightweight Steel Framing",
      subTitle: `” You deserve a safe and healthy home. ”`,
      descriptionOne:
        "Our work combines modern design with healthier and more durable building systems, with over 25 years of experience in Canada and internationally. Our work includes waterfront custom homes and luxury single-family residential projects on the North Shore using Lightweight Steel Framing (LSF), a precise, non-combustible, and mold-resistant alternative to conventional wood construction.",
      descriptionTwo:
        "Supported by advanced university-level research and extensive experience in healthy building systems, LSF advantages include:",
      path: "Resources/LFS.jpg",
      aspectRatio: 16 / 11,
      type: "construction",
    },
  ];

  const constructionItems = [
    "Mold and moisture resistance",
    "Non-combustible and fire-resistant construction",
    "Greater strength and resistance to rot compared to wood",
    "Precision prefabrication and design flexibility",
    "Faster construction and reduced maintenance and cost",
    "Sustainable and recyclable building systems",
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
        <section className={classes.services}>
          {expertise.map((service, index) => (
            <div key={index} className={classes.infoBox}>
              <Link
                onClick={() => {
                  setProjectsCategory(service.type);
                }}
                href="/work"
                passHref
              >
                <div className={classes.info}>
                  <h1
                    style={{
                      fontFamily: "OpenSansRegular",
                    }}
                  >
                    {service.title}
                  </h1>
                  <div className={classes.light}>
                    <Light timer={500 * index} />
                  </div>
                  <h4
                    style={{
                      fontFamily: "OpenSansItalic",
                      marginTop: "24px",
                      marginBottom: "12px",
                    }}
                  >
                    {service.subTitle}
                  </h4>
                  <h3
                    style={{
                      margin: "8px 0px",
                    }}
                  >
                    {service.descriptionOne}
                  </h3>
                  <h3>{service.descriptionTwo}</h3>
                  {service.type === "construction" && (
                    <div
                      style={{
                        marginTop: "8px",
                      }}
                    >
                      {constructionItems.map((item, index) => (
                        <div key={index} className={classes.row}>
                          <CircleOutlinedIcon sx={{ fontSize: 10 }} />
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className={classes.arrow}>
                    <ArrowForwardIosIcon
                      className="icon"
                      sx={{ fontSize: 20 }}
                      onClick={() => {
                        setProjectsCategory(service.type);
                        Router.push("/work");
                      }}
                    />
                  </div>
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
                  href="/work"
                  passHref
                >
                  <div className={classes.imageInner}>
                    <FirebaseImage
                      path={service.path}
                      alt={service.title}
                      mode="intrinsic"
                    />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </section>
        <div className={classes.button}>
          <button onClick={() => Router.push("/work")}>
            <span>Explore Work</span>
          </button>
        </div>
      </div>
    </>
  );
}
