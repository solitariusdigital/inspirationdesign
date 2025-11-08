import { useState, useContext, Fragment } from "react";
import { NextSeo } from "next-seo";
import classes from "./about.module.scss";
import logoBlack from "@/assets/logo-black.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

export default function About() {
  const [pageType, setPageType] = useState(
    "company" || "testimonials" || "awards" || "publications"
  );
  const navigation = ["company", "testimonials", "awards", "publications"];

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
            <div className={classes.info}>
              <h3
                style={{
                  fontFamily: "English",
                }}
              >
                Turnkey Creative Solutions
              </h3>
              <p>
                Inspiration Design is a turnkey design firm founded in 2006,
                providing creative design and exclusive construction management
                for residential and commercial renovations and new builds.
              </p>
              <p>
                The firm has grown into a full-service provider offering
                building design, interior design and lighting design.
                Inspiration Design has successfully completed over 40 diverse
                projects; including high-end homes, hotels, and retail spaces by
                working closely with top international architects, designers,
                and builders.
              </p>
              <p>
                Founder Parastoo Jafari drives the firm with her comprehensive
                experience as a building designer with advanced education in
                architecture and engineering. She holds a Master's degree from
                "Ecole D’Architecture de Bordeaux," France, and a Ph.D. in
                architecture, and is a registered architect. Her extensive
                international design background is further strengthened by 12
                years of technical management experience at a leading German
                building materials manufacturer.
              </p>
            </div>
            <div className={classes.info}>
              <h3
                style={{
                  fontFamily: "English",
                }}
              >
                Experience & Design Philosophy
              </h3>
              <p>
                Inspiration Design has a privileged history of working on
                diverse international projects, including prestigious
                commissions for Royal families and European Embassies in the
                Middle East, along with high-end houses in West Vancouver.
              </p>
              <p>
                Our work balances a contemporary vision with the client's
                requested aesthetic, covering a vast range of architectural
                styles. We prioritize understanding and meeting client aesthetic
                and operational objectives while strictly adhering to budget and
                schedule, which has helped us maintain an extensive client base.
              </p>
              <p>
                We view our profession as both art and science. We are committed
                to building healthier structures using advanced construction
                knowledge and technology. We achieve this by consciously
                focusing on environmental responsibility and sustainability. We
                carefully analyze all project data; including site, orientation,
                building codes, and materials to ensure optimal solutions for
                energy performance, durability, ventilation, and maintenance.
              </p>
            </div>
            <div className={classes.info}>
              <h3
                style={{
                  fontFamily: "English",
                }}
              >
                Full-Service Architectural Expertise
              </h3>
              <p>
                Inspiration Design is dedicated to utilizing the latest
                technologies and materials in the field. The company is led by
                founder Parastoo Jafari, who holds a PhD in Architecture and the
                CACB certification.
              </p>
              <p>
                Dr. Jafari ensures the firm remains current with advancements
                through active membership in professional organizations,
                including RAIC (Royal Architectural Institute of Canada), IDIBC,
                and WIA (Women in Architecture).
              </p>
              <p>
                We handle all design aspects from initial building concept
                development and interior schemes to executing precise lighting
                design and producing all necessary construction documentation.
              </p>
              <p>
                We manage all logistical and financial phases, including
                preliminary site studies, cost estimation, regulatory compliance
                and complete project execution, from contract negotiations to
                consultation and final site supervision.
              </p>
            </div>
          </>
        )}
        {pageType === "testimonials" && (
          <div className={classes.info}>
            <h3
              style={{
                fontFamily: "English",
              }}
            >
              Testimonials
            </h3>
            <div className={classes.gridLayout}>
              {testimonials.map((item, index) => (
                <div key={index} className={classes.item}>
                  <h5>{item.title}</h5>
                  <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
                </div>
              ))}
            </div>
          </div>
        )}
        {pageType === "awards" && (
          <div className={classes.info}>
            <h3
              style={{
                fontFamily: "English",
              }}
            >
              Awards
            </h3>
            <div className={classes.gridLayout}>
              {awards.map((item, index) => (
                <div key={index} className={classes.award}>
                  <h5
                    style={{
                      fontFamily: "EnglishMedium",
                    }}
                  >
                    {item.year}
                  </h5>
                  <h5>{item.title}</h5>
                </div>
              ))}
            </div>
          </div>
        )}
        {pageType === "publications" && (
          <div className={classes.info}>
            <h3
              style={{
                fontFamily: "English",
              }}
            >
              Publications
            </h3>
            <div className={classes.publicationLayout}>
              {publications.map((item, index) => (
                <div key={index} className={classes.publication}>
                  <h5>{item}</h5>
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
