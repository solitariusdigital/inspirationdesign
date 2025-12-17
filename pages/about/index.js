import { useState, useEffect, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import classes from "./about.module.scss";
import logoBlack from "@/assets/logo-black.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

export default function About() {
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);

  const [pageType, setPageType] = useState(
    "company" || "testimonials" || "awards" || "publications"
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
  const companySection = [
    {
      title: "The Company",
      paragraphs: [
        `“In my work, design is the bridge between a client’s vision and a built reality.” — Parastoo Jafari`,
        `Founded in 2006, Inspiration Design Ltd. is a full-service turnkey design firm specializing in building design, interior design, lighting design, and project management, with a growing focus on healthy, high-performance houses using lightweight steel framing.`,
        `The firm originally began as a specialized design and project management company in Dubai and Bahrain, working with some of the most talented architects, designers, and builders internationally. Highlights include prestigious projects for the Royal family and the French Embassy in Bahrain, as well as private residences, multifamily buildings, retail and restaurant projects, offices, banks, and exhibitions, many of which included specialized exterior lighting design. This international experience was followed by over 15 years of specialization in residential and luxury single-family projects in Canada, including multifamily buildings in North Vancouver and high-end houses in West Vancouver.`,
      ],
    },
    {
      title: "Professional Background",
      paragraphs: [
        `The founder of the company, Dr. Parastoo Jafari, has an extensive professional background in architecture, interior design, and construction internationally, bringing valuable hands-on experience and construction knowledge essential to this field.`,
        `Parastoo completed a Master’s in Architecture (D.P.L.G.) at the École d’Architecture de Bordeaux in France, followed by a PhD in Architecture, specializing in fire protection of building structures. She is currently a PhD candidate in Civil Engineering at the University of British Columbia, focusing on the use of lightweight steel framing to develop mold-free, affordable single-family housing systems. Dr. Jafari became an architect in France and is also recognized as a Registered Architect in Iran through the Engineering Association of the Ministry of Housing and Urban Development.`,
        `Her decades of international experience are supported by 12 years of technical and management experience with Knauf, a leading German building materials manufacturer. Over the years, Dr. Jafari has been an active member of professional associations, including RAIC (Royal Architectural Institute of Canada), IDIBC (Interior Designers Institute of British Columbia), and WIA (Women in Architecture), allowing the firm to stay current with technological advancements in the field. With a PhD in Architecture, she has also received CACB (Canadian Architectural Certification Board) certification in Canada.`,
      ],
    },
    {
      title: "Innovation in Healthy House Design",
      paragraphs: [
        `An important focus of the practice is the design of healthy houses using lightweight steel framing. Through ongoing PhD research at the University of British Columbia, Dr. Jafari explores mold-free wall systems, building envelope performance, and structural testing.`,
        `At the same time, the company team researches and designs houses based on the health and safety advantages of lightweight steel framing, including fire resistance, durability, and the environmental benefits of steel compared to traditional wood framing. This expertise allows the firm to integrate high-performance construction systems, healthy living environments, and advanced building technologies into its projects, helping homeowners build safer, healthier, and longer-lasting homes.`,
      ],
    },
    {
      title: "Full-Service Expertise",
      paragraphs: [
        `We believe that design should evoke emotion, and our goal is to create work that communicates with individuals’ instinctive feelings.`,
        `We view our profession as both an art and a science, combining creative vision with technical precision. The foundation of our work is a deep understanding of each client’s vision and aspirations. Through thoughtful conceptual design, we translate ideas and dreams into clear design directions that are both inspiring and grounded in reality.`,
        `As a turnkey design practice, Inspiration Design manages the entire process beyond the initial design consultation. This includes comprehensive analysis of site conditions, orientation, building codes, construction systems, materials, and technologies, ensuring that each project is feasible, compliant, and well-resolved. Our services extend through all design phases, from concept design and design development to construction documents, followed by project coordination and site supervision, allowing us to deliver cohesive, functional, and carefully executed projects tailored to each client’s needs.`,
      ],
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
    },
    {
      title: "Our Services Include",
      paragraphs: [
        "At Inspiration Design, every project begins with a deep understanding of the client’s vision and lifestyle needs. We translate these aspirations into thoughtful, functional spaces grounded in technical knowledge and contemporary architectural and interior design thinking, informed by European design culture and global trends. Above all, we prioritize health, safety, and wellbeing through advanced building technologies and carefully selected healthy materials to create spaces that are intelligent, enduring, and beautiful.",
      ],
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
      title: "Jewelery Arabia Recognition For Best Design And Fitout",
      year: "2010",
    },
    {
      title: "Bahrain City Center Recognition For Best Fitout",
      year: "2009",
    },
    {
      title:
        "NYIT New York Institute Of Technology - Recognition For Cooperation",
      year: "2009",
    },
    {
      title: "University Of Bahrain - Recognition For Cooperation",
      year: "2009",
    },
    {
      title: "French Embassy - Recognition For Arkheo Exhibition",
      year: "2008",
    },
  ];
  const publications = [
    "Abadi Magazine, Autumn 1998, Article about City of Shiraz Entrance Monument competition, Fourth prize to Parastoo Jafari",
    "A Collection of Articles presented at the second Environmental Engineering and architecture Forum “optimal Housing”, June 22-24, 1999, Article by Parastoo Jafari, PhD in Architecture;” Building Safety, Fire- resistant building Design, and suitable Architectural Building Materials and Techniques",
    "Kanoon News, Tehran Faculty of architecture news paper, winter 2000, Article about Parastoo Jafari’s speech on contemporary architecture",
    "Architecture & Urbanism 54-55/ February 2000, Special issue; Contemporary Architectural Design, Article ”Evolution of Iranian Architecture in view of the influences of western technology” by Parastoo Jafari",
    "Gulf Weekly, Vol. 6, October 31- November 6, 2007, Page 11, ”Jacque’s Memento”; Article about “Arkheo” exhibition designed by Inspiration Interior Design for the French Embassy in Bahrain",
    "Alayam News, 2nd November 2007, No. 6781, Last page; Article about “Arkheo” exhibition designed by Inspiration Interior Design for the French Embassy in Bahrain",
    "Gulf Daily News, Vol XXX, No. 224, 30th October 2007, Page 20, Heritage on Show; Article about “Arkheo” exhibition designed by Inspiration Interior Design for the French Embassy in Bahrain",
    "Gulf Daily News, Vol XXX, No. 225, 31th October 2007, Page 19, Exhibition digs in to the past; Article about “Arkheo” exhibition designed by Inspiration Interior Design for the French Embassy in Bahrain",
    "Gulf Daily News, Vol XXX, No. 216, 22nd October 2007, Page 18, Heritage Expo Focus; Article about “Arkheo” exhibition designed by Inspiration Interior Design for the French Embassy in Bahrain",
    "Alayam News, 31st, October 2007, No. 6779, Page16, Arkheo; Article about “Arkheo” exhibition designed by Inspiration Interior Design for the French Embassy in Bahrain",
    "Middle East Interiors, November 2007 pp.20-21, “Growth-driven Inspiration”; Article about Inspiration Interior Design company and its projects",
    "Middle East Interiors, April 2009, pp.36-39, “Drawing on Inspiration”; Article about Inspiration Interior Design company and its projects",
    "Middle East Interiors, May 2009, pp.30-32, “Design calls for dexterity”; Article about Inspiration Interior Design company and its projects",
    "Middle East Interiors, November 2009, pp.30-32, “Inspired to succeed”; Article about Inspiration Interior Design company and its projects",
    "Gulf News, 18 November 2009, Page 3, Article about International Jewllery Arabia and Al Zain stand designed by Inspiration Interior Design",
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
            {companySection.map((section, index) => (
              <div key={index} className={classes.info}>
                <h2 style={{ fontFamily: "OpenSansRegular" }}>
                  {section.title}
                </h2>
                {section.paragraphs.map((text, i) => (
                  <div key={i} className={classes.row}>
                    {index === 4 && (
                      <CircleOutlinedIcon sx={{ fontSize: 12 }} />
                    )}
                    <p className={classes.text}>{text}</p>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
        {pageType === "testimonials" && (
          <div className={classes.info}>
            <h2
              style={{
                fontFamily: "OpenSansRegular",
              }}
            >
              Testimonials
            </h2>
            <div className={classes.gridLayout}>
              {testimonials.map((item, index) => (
                <div key={index} className={classes.item}>
                  <p>{item.title}</p>
                  <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
                </div>
              ))}
            </div>
          </div>
        )}
        {pageType === "awards" && (
          <div className={classes.info}>
            <h2
              style={{
                fontFamily: "OpenSansRegular",
              }}
            >
              Awards
            </h2>
            <div className={classes.gridLayout}>
              {awards.map((item, index) => (
                <div key={index} className={classes.award}>
                  <h5
                    style={{
                      fontFamily: "OpenSansRegular",
                    }}
                  >
                    {item.year}
                  </h5>
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {pageType === "publications" && (
          <div className={classes.info}>
            <h2
              style={{
                fontFamily: "OpenSansRegular",
              }}
            >
              Publications
            </h2>
            <div className={classes.publicationLayout}>
              {publications.map((item, index) => (
                <div key={index} className={classes.publication}>
                  <p>{item}</p>
                  <CircleOutlinedIcon sx={{ fontSize: 12 }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
