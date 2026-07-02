import { useState, useEffect, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import classes from "./about.module.scss";
import logoBlack from "@/assets/logo-black.png";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import FirebaseImage from "@/components/FirebaseImage";

export default function About() {
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);

  const [pageType, setPageType] = useState(
    "company" || "testimonials" || "awards" || "publications",
  );
  const router = useRouter();
  let pathname = router.pathname;

  useEffect(() => {
    navigationTopBar.map((nav) => {
      if (pathname === nav.link) {
        nav.active = true;
      }
    });
    setNavigationTopBar([...navigationTopBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigation = ["company", "testimonials", "awards", "publications"];

  const information = [
    {
      title: "The Company",
      paragraphs: [
        `“ In my work, design is the bridge between a client’s vision and a built reality. ” - Parastoo Jafari`,
        `Founded in 2006, Inspiration Design Ltd. is a full-service turnkey design firm specializing in building design, interior design, lighting design, and project management, with a growing focus on healthy, high-performance houses using lightweight steel framing.`,
        `The firm originally began as a specialized design and project management company in Dubai and Bahrain, working with some of the most talented architects, designers, and builders internationally. Highlights include prestigious projects for the Royal family and the French Embassy in Bahrain, as well as private residences, multifamily buildings, retail and restaurant projects, offices, banks, and exhibitions, many of which included specialized exterior lighting design. This international experience was followed by over 15 years of specialization in residential and luxury single-family projects in Canada, including multifamily buildings in North Vancouver and high-end houses in West Vancouver.`,
      ],
      path: "Resources/AboutCompany.jpg",
    },
    {
      title: "Professional Background",
      paragraphs: [
        `The founder of the company, Dr. Parastoo Jafari, has an extensive professional background in architecture, interior design, and construction internationally, bringing valuable hands-on experience and construction knowledge essential to this field.`,
        `Parastoo completed a Master’s in Architecture (D.P.L.G.) at the École d’Architecture de Bordeaux in France, followed by a PhD in Architecture, specializing in fire protection of building structures. She is currently a PhD candidate in Civil Engineering at the University of British Columbia, focusing on the use of lightweight steel framing to develop mold-free, affordable single-family housing systems. Dr. Jafari became an architect in France and is also recognized as a Registered Architect in Iran through the Engineering Association of the Ministry of Housing and Urban Development.`,
        `Her decades of international experience are supported by 12 years of technical and management experience with Knauf, a leading German building materials manufacturer. Over the years, Dr. Jafari has been an active member of professional associations, including RAIC (Royal Architectural Institute of Canada), IDIBC (Interior Designers Institute of British Columbia), and WIA (Women in Architecture), allowing the firm to stay current with technological advancements in the field. With a PhD in Architecture, she has also received CACB (Canadian Architectural Certification Board) certification in Canada.`,
      ],
      path: "Resources/About.jpg",
    },
    {
      title: "Innovation in Healthy House Design",
      paragraphs: [
        `An important focus of the practice is the design of healthy houses using lightweight steel framing. Through ongoing PhD research at the University of British Columbia, Dr. Jafari explores mold-free wall systems, building envelope performance, and structural testing.`,
        `At the same time, the company team researches and designs houses based on the health and safety advantages of lightweight steel framing, including fire resistance, durability, and the environmental benefits of steel compared to traditional wood framing. This expertise allows the firm to integrate high-performance construction systems, healthy living environments, and advanced building technologies into its projects, helping homeowners build safer, healthier, and longer-lasting homes.`,
      ],
      path: "Resources/Construction/20.jpg",
    },
    {
      title: "Full-Service Expertise",
      paragraphs: [
        `We believe that design should evoke emotion, and our goal is to create work that communicates with individuals’ instinctive feelings.`,
        `We view our profession as both an art and a science, combining creative vision with technical precision. The foundation of our work is a deep understanding of each client’s vision and aspirations. Through thoughtful conceptual design, we translate ideas and dreams into clear design directions that are both inspiring and grounded in reality.`,
        `As a turnkey design practice, Inspiration Design manages the entire process beyond the initial design consultation. This includes comprehensive analysis of site conditions, orientation, building codes, construction systems, materials, and technologies, ensuring that each project is feasible, compliant, and well-resolved. Our services extend through all design phases, from concept design and design development to construction documents, followed by project coordination and site supervision, allowing us to deliver cohesive, functional, and carefully executed projects tailored to each client’s needs.`,
      ],
      path: null,
    },
    {
      title: "Our Services Include",
      paragraphs: [
        "Client vision definition and conceptual design",
        "Site analysis and project estimation",
        "Building design from concept through design development and construction documents",
        "Interior design from concept development to furniture and detailed specifications",
        "Exterior and interior lighting design",
        "Permit process coordination",
        "Project management, including consultant coordination, tendering, and contractor negotiations",
        "Construction consultation for healthy and safe building solutions (lightweight steel framing)",
        "Project supervision",
      ],
      path: null,
    },
    {
      title: "Our Commitment",
      paragraphs: [
        "At Inspiration Design, every project begins with a deep understanding of the client’s vision and lifestyle needs. We translate these aspirations into thoughtful, functional spaces grounded in technical knowledge and contemporary architectural and interior design thinking, informed by European design culture and global trends. Above all, we prioritize health, safety, and wellbeing through advanced building technologies and carefully selected healthy materials to create spaces that are intelligent, enduring, and beautiful.",
      ],
      path: null,
    },
  ];
  const testimonials = [
    {
      title: "AFDON Construction Company",
      link: "",
    },
    {
      title: "French Ambassador In Bahrain",
      link: "",
    },
    {
      title: "NYIT, New York Intitute Of Technolongy",
      link: "",
    },
    {
      title: "University Of Bahrain",
      link: "",
    },
    {
      title: "NIA Construction Company",
      link: "",
    },
    {
      title: "Zain Jewelery",
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
  const awards = [
    {
      title:
        "Orchard Residence – George Awards Finalist (Best Custom Home: $3 Million–Under $6 Million)",
      detail: "2025",
    },
    {
      title:
        "Orchard Residence – Havan Awards Finalist (Best Custom Home: $3 Million–Under $6 Million)",
      detail: "2025",
    },
    {
      title:
        "Canyon Haven (Clements I & II) – George Awards Finalist (Custom Home Valued Under $1 Million)",
      detail: "2025",
    },
    {
      title:
        "Canyon Haven (Clements I & II) – Havan Awards Finalist (Custom Home Valued Under $1 Million)",
      detail: "2025",
    },
    {
      title: "Jewelery Arabia – Recognition For Best Design And Fitout",
      detail: "2010",
    },
    {
      title: "Bahrain City Center – Recognition For Best Fitout",
      detail: "2009",
    },
    {
      title:
        "NYIT (New York Institute Of Technology) – Recognition For Cooperation",
      detail: "2009",
    },
    {
      title: "University Of Bahrain – Recognition For Cooperation",
      detail: "2009",
    },
    {
      title: "French Embassy –Recognition For Arkheo Exhibition",
      detail: "2008",
    },
  ];
  const publications = [
    {
      title: "Georgie Awards Finalists",
      description:
        "Official Canadian Home Builders' Association of British Columbia (CHBA BC) PublicationOrchard Residence and Canyon Haven recognized as finalists in the 2025 Georgie Awards.",
      detail: "",
    },
    {
      title: "HAVAN Awards Finalists",
      description:
        "Official Homebuilders Association Vancouver (HAVAN) PublicationOrchard Residence and Canyon Haven recognized as finalists in the 2025 HAVAN Awards.",
      detail: "",
    },
    {
      title: `Middle East Interiors “ Inspired to Succeed ”`,
      description:
        "Feature article highlighting Inspiration Interior Design and its projects.",
      detail: "November 2009 | pp. 30–32",
    },
    {
      title: "Gulf News",
      description:
        "Feature article covering Jewellery Arabia and the award-winning Al Zain Jewellery stand designed by Inspiration Interior Design.",
      detail: "18 November 2009 | Page 3",
    },
    {
      title: `Middle East Interiors “ Design Calls for Dexterity ”`,
      description:
        "Feature article discussing Inspiration Interior Design's turnkey design philosophy and selected projects.",
      detail: "May 2009 | pp. 30–32",
    },
    {
      title: `Middle East Interiors “ Design on Inspiration ”`,
      description:
        "Feature article presenting Inspiration Interior Design and a selection of completed projects.",
      detail: "April 2009 | pp. 36–39",
    },
    {
      title: `Middle East Interiors “ Growth-driven Inspiration ”`,
      description:
        "Feature article introducing Inspiration Interior Design and its expanding portfolio.",
      detail: "November 2007 | pp. 20–21",
    },
    {
      title: `Gulf Weekly “ Jacque's Memento ”`,
      description:
        "Feature article on the ARKHEO exhibition designed by Inspiration Interior Design for the French Embassy in Bahrain.",
      detail: "31 October – 6 November 2007 | Vol. 6 | Page 11",
    },
    {
      title: "Al Ayam",
      description:
        "Coverage of the ARKHEO exhibition and the French–Bahraini archaeological collaboration.",
      detail: "2 November 2007 | No. 6781",
    },
    {
      title: `Gulf Daily News “ Exhibition Digs into the Past ”`,
      description: "",
      detail: "31 October 2007 | Vol. XXX | No. 225 | Page 19",
    },
    {
      title: "Al Watan",
      description:
        "Coverage of the inauguration of the ARKHEO exhibition at La Maison Jamsheer, Muharraq, Bahrain.",
      detail: "31 October 200",
    },
    {
      title: "Al Ayam",
      description: "Coverage of the ARKHEO exhibition.",
      detail: "31 October 2007 | No. 6779 | Page 16",
    },
    {
      title: `Gulf Daily News “ Heritage on Show ”`,
      description: "",
      detail: "30 October 2007 | Vol. XXX | No. 224 | Page 20",
    },
    {
      title: `Gulf Daily News “ Heritage Expo Focus ”`,
      description: "",
      detail: "22 October 2007 | Vol. XXX | No. 216 | Page 18",
    },
    {
      title: `Architecture & Urbanism “ Evolution of Iranian Architecture in View of the Influences of Western Technology ”`,
      description: "Research article by Dr. Parastoo Jafari.",
      detail: "February 2000 | Nos. 54–55",
    },
    {
      title: "Kanoon News",
      description:
        "Tehran Faculty of Architecture. Coverage of Dr. Parastoo Jafari's lecture on contemporary architecture.",
      detail: "Winter 2000",
    },
    {
      title:
        "Proceedings of the Second Environmental Engineering & Architecture Forum – Optimal Housing",
      description: "",
      detail: "22–24 June 1999",
    },
    {
      title:
        "Building Safety, Fire-Resistant Building Design, and Suitable Architectural Building Materials and Techniques",
      description: "Research paper by Dr. Parastoo Jafari.",
      detail: "",
    },
    {
      title: "Abadi Magazine",
      description:
        "Coverage of the City of Shiraz Entrance Monument Competition, in which Dr. Parastoo Jafari received Fourth Prize.",
      detail: "Autumn 1998",
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
        {pageType === "company" && (
          <>
            {information.map((section, index) => (
              <div key={index} className={classes.info}>
                <div className={classes.box}>
                  {section.path && (
                    <div
                      className={classes.imageBox}
                      style={{
                        marginBottom: screenSize === "mobile" ? "24px" : "0px",
                      }}
                    >
                      <FirebaseImage
                        path={section.path}
                        alt="about"
                        mode="intrinsic"
                      />
                    </div>
                  )}
                  <div
                    className={classes.infoBox}
                    style={{
                      width: !section.path ? "100%" : "",
                    }}
                  >
                    <h2
                      style={{
                        marginBottom: "12px",
                        fontFamily: "RobotoRegular",
                      }}
                    >
                      {section.title}
                    </h2>
                    {section.paragraphs.map((text, i) => (
                      <div
                        key={i}
                        style={{
                          margin: index !== 4 ? "8px 0px" : "4px 0px",
                          fontFamily:
                            index === 0 && i === 0
                              ? "RobotoItalic"
                              : "RobotoThin",
                        }}
                        className={classes.row}
                      >
                        {index === 4 && (
                          <CircleOutlinedIcon
                            sx={{ fontSize: 10 }}
                            style={{
                              marginRight: "8px",
                            }}
                          />
                        )}
                        {index === 0 && i === 0 ? (
                          <h3
                            style={{
                              margin: "8px 0px",
                            }}
                          >
                            {text}
                          </h3>
                        ) : (
                          <p>{text}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        {pageType === "testimonials" && (
          <div className={classes.info}>
            <h2
              style={{
                fontFamily: "RobotoRegular",
              }}
            >
              Testimonials
            </h2>
            <div className={classes.layout}>
              {testimonials.map((item, index) => (
                <div key={index} className={classes.item}>
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {pageType === "awards" && (
          <div className={classes.info}>
            <h2
              style={{
                fontFamily: "RobotoRegular",
              }}
            >
              Awards
            </h2>
            <div className={classes.layout}>
              {awards.map((item, index) => (
                <div key={index} className={classes.item}>
                  <h3
                    style={{
                      fontFamily: "RobotoRegular",
                    }}
                  >
                    {item.detail}
                  </h3>
                  <div className={classes.detail}>
                    <p>{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {pageType === "publications" && (
          <div className={classes.info}>
            <h2
              style={{
                fontFamily: "RobotoRegular",
              }}
            >
              Publications & Press
            </h2>
            <div className={classes.layout}>
              {publications.map((item, index) => (
                <div key={index} className={classes.item}>
                  <h3
                    style={{
                      fontFamily: "RobotoRegular",
                    }}
                  >
                    {item.title}
                  </h3>
                  <div className={classes.detail}>
                    <p>{item.description}</p>
                    <p
                      style={{
                        fontFamily: "RobotoItalic",
                        fontSize: "14px",
                      }}
                    >
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
