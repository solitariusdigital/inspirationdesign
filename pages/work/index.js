import { useState, useEffect, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import classes from "./work.module.scss";
import logoBlack from "@/assets/logo-black.png";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { replaceSpacesAndHyphens } from "@/services/utility";
import FirebaseImage from "@/components/FirebaseImage";
import db from "@/services/firestore";
import { collection, getDocs } from "@firebase/firestore";

export default function Work() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { projectsCategory, setProjectsCategory } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [displayProjects, setDisplayProjects] = useState(null);
  const [firstColumn, setFirstColumn] = useState([]);
  const [secondColumn, setSecondColumn] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [displayInfo, setDisplayInfo] = useState(false);
  const router = useRouter();
  let pathname = router.pathname;

  const navigation = ["residential", "commercial", "lighting", "construction"];
  const services = {
    residential: "Building & Interior Design",
    commercial: "Building & Interior Design",
    lighting: "Lighting Design",
    construction: "Lightweight Steel Framing",
  };

  useEffect(() => {
    navigationTopBar.map((nav) => {
      if (pathname === nav.link) {
        nav.active = true;
      }
    });
    setNavigationTopBar([...navigationTopBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "Projects"));
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (currentUser) {
        setDisplayProjects(data);
      } else {
        setDisplayProjects(data.filter((project) => project.active));
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filtered =
      displayProjects?.filter(
        (project) => project.category === projectsCategory,
      ) || [];

    const alphaOrder = [...filtered].sort((a, b) => {
      const nameA = (a.order || "").toLowerCase();
      const nameB = (b.order || "").toLowerCase();
      return nameA.localeCompare(nameB);
    });

    let col1 = [];
    let col2 = [];

    if (screenSize === "mobile") {
      const half = Math.ceil(alphaOrder.length / 2);
      col1 = alphaOrder.slice(0, half);
      col2 = alphaOrder.slice(half);
    } else {
      alphaOrder.forEach((project, index) => {
        if (index % 2 === 0) {
          col1.push(project);
        } else {
          col2.push(project);
        }
      });
    }

    setFirstColumn(col1);
    setSecondColumn(col2);
  }, [projectsCategory, displayProjects, screenSize]);

  return (
    <>
      <NextSeo
        title="Work"
        description="Inspiration Design is a turnkey design firm, specializing in creative designs for residential and commercial projects."
        canonical="https://inspirationdesigns.ca/work"
        openGraph={{
          type: "website",
          locale: "en_CA",
          url: "https://inspirationdesigns.ca/work",
          title: "Work",
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
              className={
                projectsCategory === nav ? classes.navActive : classes.nav
              }
              onClick={() => setProjectsCategory(nav)}
            >
              {nav}
            </p>
          ))}
        </div>
        <h1
          className={classes.title}
          style={{
            fontFamily: "OpenSansRegular",
          }}
        >
          {services[projectsCategory]}
        </h1>
        {projectsCategory !== "construction" && (
          <div className={classes.gridLayoutVertical}>
            <div className={classes.column}>
              {firstColumn?.map((project, index) => {
                const projectLink = `/work/${replaceSpacesAndHyphens(
                  project.title,
                )}`;
                return (
                  <Link
                    key={project.id}
                    className={classes.item}
                    href={projectLink}
                    passHref
                  >
                    <div
                      className={classes.card}
                      onMouseEnter={() => setHoveredId(project.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {currentUser && (
                        <div className={classes.visibility}>
                          {project.active ? (
                            <Tooltip title="Visible">
                              <VerifiedUserIcon sx={{ fontSize: 18 }} />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Hidden">
                              <VisibilityOffIcon sx={{ fontSize: 18 }} />
                            </Tooltip>
                          )}
                        </div>
                      )}
                      <div
                        className={
                          project.orientation === "portrait"
                            ? classes.imageBoxPortrait
                            : classes.imageBoxLandscape
                        }
                      >
                        <div className={classes.imageInner}>
                          <FirebaseImage
                            path={project.hero}
                            alt={project.title}
                          />
                        </div>
                        {hoveredId === project.id && (
                          <div className={classes.overlay}>
                            <h2 className="animate__animated animate__slideInUp">
                              {project.title}
                            </h2>
                            <h3 className="animate__animated animate__slideInUp">
                              {project.location}
                            </h3>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className={classes.column}>
              {secondColumn?.map((project, index) => {
                const projectLink = `/work/${replaceSpacesAndHyphens(
                  project.title,
                )}`;
                return (
                  <Link
                    key={project.id}
                    className={classes.item}
                    href={projectLink}
                    passHref
                  >
                    <div
                      className={classes.card}
                      onMouseEnter={() => setHoveredId(project.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {currentUser && (
                        <div className={classes.visibility}>
                          {project.active ? (
                            <Tooltip title="Visible">
                              <VerifiedUserIcon sx={{ fontSize: 18 }} />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Hidden">
                              <VisibilityOffIcon sx={{ fontSize: 18 }} />
                            </Tooltip>
                          )}
                        </div>
                      )}
                      <div
                        className={
                          project.orientation === "portrait"
                            ? classes.imageBoxPortrait
                            : classes.imageBoxLandscape
                        }
                      >
                        <div className={classes.imageInner}>
                          <FirebaseImage
                            path={project.hero}
                            alt={project.title}
                          />
                        </div>
                        {hoveredId === project.id && (
                          <div className={classes.overlay}>
                            <h2
                              className="animate__animated animate__slideInUp"
                              style={{ fontFamily: "OpenSansRegular" }}
                            >
                              {project.title}
                            </h2>
                            <h3 className="animate__animated animate__slideInUp">
                              {project.location}
                            </h3>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        {projectsCategory === "construction" && (
          <div className={classes.constructionLayout}>
            <div className={classes.section}>
              <div className={classes.row}>
                <div className={classes.imageBox}>
                  <div
                    style={{
                      marginBottom: "8px",
                    }}
                  >
                    <FirebaseImage
                      path="Resources/Construction/1.jpg"
                      alt="about"
                      mode="intrinsic"
                    />
                  </div>
                  <FirebaseImage
                    path="Resources/Construction/3.jpg"
                    alt="about"
                    mode="intrinsic"
                  />
                  <p>
                    Computer-Controlled Manufacturing of Lightweight Steel
                    Sections - Courtesy & Source: Bradbury Group,
                  </p>
                </div>
                <div className={classes.infoBox}>
                  <h2>Healthy Buildings, Designed with Science</h2>
                  <p>
                    At Inspiration Design Ltd., healthy house design is guided
                    by a science-based, research-driven approach to creating
                    safer, more durable and sustainable homes using lightweight
                    steel framing (LSF).
                  </p>
                  <p>
                    Health has become one of the most critical concerns in
                    residential construction today.{" "}
                    <span>
                      The choice of structural systems and building materials
                      directly influences moisture behavior, mold creation,
                      indoor air quality, fire safety, seismic performance and
                      long-term durability
                    </span>
                    . Our work focuses on preventing problems before they
                    appear, rather than after construction.
                  </p>
                  <p>
                    We combine advanced construction technologies,
                    university-level research and AI-assisted optimization to
                    help clients make informed design decisions, suggesting
                    building materials that are fire-resistant, mold-resilient,
                    durable, and sustainable, while remaining mindful of
                    realistic timelines and budgets.
                  </p>
                </div>
              </div>
            </div>
            <div className={classes.section}>
              <div className={classes.row}>
                <div className={classes.imageBox}>
                  <FirebaseImage
                    path="Resources/Construction/4.jpg"
                    alt="about"
                    mode="intrinsic"
                  />
                  <p>
                    Residential Lightweight Steel Framing System - Image
                    courtesy of Bailey Metal Products Limited
                  </p>
                </div>
                <div className={classes.infoBox}>
                  <h2>Why Lightweight Steel Framing in Housing</h2>
                  <p>
                    Lightweight steel framing has long been used worldwide in
                    all types of buildings, including residential, due to its
                    predictability, dimensional stability, durability and
                    resistance to mold and fire.
                  </p>
                  <p>
                    Traditional wood framing is an organic material that is
                    inherently{" "}
                    <span>
                      moisture-sensitive, combustible, and dimensionally
                      unstable
                    </span>
                    . During construction and over a building’s lifetime, wood
                    is vulnerable to warping, shrinking, rot and hidden mold
                    growth, risks that directly affect indoor air quality, fire
                    safety, long-term durabilit and most importantly,{" "}
                    <span>inhabitant’s health and safety</span>.
                  </p>
                  <p>
                    Lightweight steel framing offers a{" "}
                    <span>
                      controlled, non-combustible, inorganic structural system
                    </span>
                    . When properly designed and detailed, it enables healthier
                    wall and roof assemblies, greater precision and a
                    significantly{" "}
                    <span>
                      reduced risk of mold and fire compared to conventional
                      wood construction
                    </span>
                    .
                  </p>
                  <p>
                    At Inspiration Design Ltd., lightweight steel framing is
                    integrated from the earliest design stages, allowing
                    structure, envelope and spatial layout to work together
                    efficiently.
                  </p>
                </div>
              </div>
            </div>
            <div className={classes.section}>
              <div className={classes.row}>
                <div className={classes.imageBox}>
                  <FirebaseImage
                    path="Resources/Construction/5.jpg"
                    alt="about"
                    mode="intrinsic"
                  />
                  <p>
                    Computer-Controlled Roll-Forming of Lightweight Steel
                    Framing Components Image courtesy of Kingreal Roll Forming
                    Company
                  </p>
                </div>
                <div className={classes.infoBox}>
                  <h2>Our Expertise is What We Offer</h2>
                  <p>
                    We provide{" "}
                    <span>
                      building design, interior design, lighting design,
                      construction consultation and project management services
                    </span>{" "}
                    for single-family homes, with a particular specialization in{" "}
                    <span>lightweight steel framing (LSF)</span>.
                  </p>
                  <p>
                    Our work is driven by a strong focus on{" "}
                    <span>
                      client health, safety and long-term building performance
                    </span>
                    . Lightweight steel framing offers important advantages in
                    addressing key risks in residential construction,
                    particularly those related to{" "}
                    <span>
                      mold, fire, durability and dimensional stability
                    </span>
                    .
                  </p>
                  <p>
                    Lightweight steel framing is widely used internationally and
                    in Canada, supported by a large number of established
                    manufacturers, suppliers and specialized installers. Our
                    role is not to replace these professionals, but to{" "}
                    <span>
                      guide design decisions, system selection and coordination
                    </span>
                    , ensuring that LSF is thoughtfully and appropriately
                    integrated into residential projects.
                  </p>
                </div>
              </div>
            </div>
            <div className={classes.section}>
              <div className={classes.row}>
                <div className={classes.imageBoxGrid}>
                  <div className={classes.imageFrame}>
                    <FirebaseImage
                      path="Resources/Construction/6.jpg"
                      alt="about"
                      mode="intrinsic"
                    />
                  </div>
                  <div className={classes.imageFrame}>
                    <FirebaseImage
                      path="Resources/Construction/7.jpg"
                      alt="about"
                      mode="intrinsic"
                    />
                  </div>
                  <p className={classes.floatText}>
                    Images are provided by Fifthshire Homes and showing houses
                    built of lightweight steel structure
                  </p>
                </div>
                <div className={classes.infoBox}>
                  <h2>Design, Consultation & Coordination</h2>
                  <p>
                    Design comes first; every project starts with the client’s
                    lifestyle, aesthetic vision and budget. During the design
                    consultation stage, Inspiration Design Ltd. works in close
                    cooperation with <span>licensed structural engineers</span>.
                  </p>
                  <p>
                    Our <span>turnkey approach</span>, from conceptual design
                    and construction consultation, often includes assistance
                    throughout all major phases of the project, from project
                    management to interior design and lighting design,
                    delivering a coordinated <span>end-to-end process</span>.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={classes.section}
              style={{
                marginTop: "90px",
              }}
            >
              <div className={classes.row}>
                <div className={classes.imageBox}>
                  <FirebaseImage
                    path="Resources/Construction/2.jpg"
                    alt="about"
                    mode="intrinsic"
                  />
                </div>
                <div className={classes.infoBox}>
                  <h2>Research-Based Practice</h2>
                  <p>
                    Inspiration Design Ltd. is led by{" "}
                    <span>Dr. Parastoo Jafari,</span> who studied architecture
                    in France and holds a <span>PhD in Architecture</span>, with
                    a background in{" "}
                    <span>building materials and building fire protection</span>{" "}
                    and{" "}
                    <span>
                      extensive architectural experience in Europe and the
                      Middle East.
                    </span>{" "}
                    She also has extensive{" "}
                    <span>Canadian and international experience</span> designing
                    single-family homes and working with lightweight steel
                    framing.
                  </p>
                  <p>
                    In addition, her ongoing doctoral research at{" "}
                    <span>the University of British Columbia (UBC)</span>{" "}
                    focuses on the development of{" "}
                    <span>
                      affordable, mold-resistant wall systems for single-family
                      housing
                    </span>
                    . This research background supports design and construction
                    strategies that prioritize{" "}
                    <span>health, safety and long-term performance</span>.
                  </p>
                  <h2
                    style={{
                      marginTop: "12px",
                    }}
                  >
                    Our Goal
                  </h2>
                  <p>
                    Designing homes that are{" "}
                    <span>healthier, safer and built to last</span> from the
                    structure outward.
                  </p>
                </div>
              </div>
            </div>
            <div className={classes.button}>
              <button onClick={() => setDisplayInfo(!displayInfo)}>
                <span>{displayInfo ? "Expand Less" : "Expand More"}</span>
              </button>
            </div>
            {displayInfo && (
              <>
                <div
                  className={classes.section}
                  style={{
                    marginTop: screenSize === "mobile" ? "50px" : "100px",
                  }}
                >
                  <div className={classes.row}>
                    <div className={classes.imageBoxGrid}>
                      <div className={classes.imageFrame}>
                        <FirebaseImage
                          path="Resources/Construction/8.jpg"
                          alt="about"
                        />
                      </div>
                      <div className={classes.imageFrame}>
                        <FirebaseImage
                          path="Resources/Construction/9.jpg"
                          alt="about"
                        />
                      </div>
                      <div className={classes.imageFrame}>
                        <FirebaseImage
                          path="Resources/Construction/11.jpg"
                          alt="about"
                        />
                      </div>
                      <p>North Vancouver, Canada, 2025</p>
                      <div className={classes.imageFrame}>
                        <FirebaseImage
                          path="Resources/Construction/10.jpg"
                          alt="about"
                        />
                      </div>
                      <p>
                        Mold inside the wall of a two-year-old residential
                        building, Kelowna, BC
                      </p>
                      <div className={classes.imageFrame}>
                        <FirebaseImage
                          path="Resources/Construction/12.jpg"
                          alt="about"
                        />
                      </div>
                      <p>Galvanized steel framing</p>
                    </div>
                    <div className={classes.infoBox}>
                      <h2>Mold & Rot</h2>
                      <h3>LSF resists mold and moisture, unlike wood.</h3>
                      <p>
                        Wood absorbs moisture and can develop mold before
                        construction is complete.
                      </p>
                      <p>
                        Wood provides a food source for mold and termite growth.
                        Steel framing requires no mold and termite treatments,
                        resins, or chemical preservatives commonly used in wood
                        construction.
                      </p>
                      <p>
                        Mold develops inside wall assemblies and remains
                        invisible for years, while airborne spores are released
                        into the indoor environment and inhaled long before mold
                        becomes visible, posing significant health risks.
                      </p>
                      <p>
                        Damp wood is wrapped by insulation and finishes,
                        increasing mold risk. Mold threatens human health and
                        destroys the building. Galvanized eliminates this risk.
                      </p>
                      <p>
                        As an inorganic material, steel emits no VOCs (volatile
                        organic compounds) and does not compromise indoor air
                        quality over time.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={classes.section}>
                  <div className={classes.row}>
                    <div className={classes.imageBoxGrid}>
                      <div className={classes.imageFrame}>
                        <FirebaseImage
                          path="Resources/Construction/13.jpg"
                          alt="about"
                        />
                      </div>
                      <p>
                        Santa Rosa, California, USA, October 2018 - Over 5,600
                        structures destroyed in one of California’s most
                        destructive wildfires. Source: Insurance Journal
                      </p>
                      <div className={classes.imageFrame}>
                        <FirebaseImage
                          path="Resources/Construction/14.jpg"
                          alt="about"
                        />
                      </div>
                      <p>Single-Family, West Kelowna Fire, BC, Canada 2023</p>
                      <div className={classes.imageFrame}>
                        <FirebaseImage
                          path="Resources/Construction/15.jpg"
                          alt="about"
                        />
                      </div>
                      <p>Single-Family, West Kelowna Fire, BC, Canada 2023</p>
                    </div>
                    <div className={classes.infoBox}>
                      <h2>Fire</h2>
                      <h3>LSF is non-combustible, unlike wood.</h3>
                      <p>
                        Wood can ignite from heat, even without direct flame and
                        spread fire rapidly unlike non-combustible materials.
                      </p>
                      <p>
                        Fire destroys homes in minutes, loss that insurance can
                        never replace.
                      </p>
                      <p>
                        Non-combustible galvanized steel framing does not ignite
                        or spread fire like wood.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={classes.section}>
                  <div className={classes.row}>
                    <div className={classes.imageBox}>
                      <FirebaseImage
                        path="Resources/Construction/16.jpg"
                        alt="about"
                        mode="intrinsic"
                      />
                      <p>
                        Single-Family Housing Structure with Lightweight Steel
                        Framing. Image courtesy of BONE Structure
                      </p>
                    </div>
                    <div className={classes.infoBox}>
                      <h2>Strength & Durability</h2>
                      <p>
                        LSF provides high structural strength, long-term
                        durability and larger spans than wood, while remaining
                        dimensionally stable and free from warping, shrinking,
                        or deformation.
                      </p>
                      <p>
                        With one of the highest strength-to-weight ratios among
                        traditional building materials, lightweight steel
                        framing is stronger yet significantly lighter than wood,
                        allowing for lighter foundations, reduced structural and
                        seismic loads and a longer service life. Its ductile
                        behavior supports predictable seismic performance, with
                        steel members weighing <span>up to 60%</span> less than
                        comparable wood members.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={classes.section}>
                  <div className={classes.row}>
                    <div className={classes.imageBox}>
                      <div
                        style={{
                          marginBottom: "8px",
                        }}
                      >
                        <FirebaseImage
                          path="Resources/Construction/17.jpg"
                          alt="about"
                          mode="intrinsic"
                        />
                      </div>
                      <FirebaseImage
                        path="Resources/Construction/18.jpg"
                        alt="about"
                        mode="intrinsic"
                      />
                      <p>
                        House Design Using a Lightweight Steel Framing by
                        Inspiration Design Ltd.
                      </p>
                    </div>
                    <div className={classes.infoBox}>
                      <h2>Design Freedom & Precision</h2>
                      <h3>
                        Lightweight steel framing allows larger spans, open
                        layouts and greater architectural freedom.
                      </h3>
                      <p>
                        Computer-controlled fabrication produces precise,
                        straight floor and roof components, enabling larger
                        window and door openings, unlike wood.
                      </p>
                      <p>
                        Wood framing typically spans up to 14–20 ft (4.3–6 m),
                        often requiring deep beams and lowered ceilings. LSF
                        achieves 30 ft (9 m) spans in homes and up to 70 ft
                        (21.3 m) in engineered systems, level of design
                        flexibility well beyond conventional wood construction.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={classes.section}>
                  <div className={classes.row}>
                    <div className={classes.imageBoxGrid}>
                      <div className={classes.imageFrame}>
                        <FirebaseImage
                          path="Resources/Construction/19.jpg"
                          alt="about"
                          mode="intrinsic"
                        />
                      </div>
                      <p>Image courtesy of Bailey Metal Products Limited</p>
                      <div className={classes.imageFrame}>
                        <FirebaseImage
                          path="Resources/Construction/20.jpg"
                          alt="about"
                          mode="intrinsic"
                        />
                      </div>
                      <p>
                        Images are provided by Fifthshire Homes and showing
                        houses built of lightweight steel structure
                      </p>
                    </div>
                    <div className={classes.infoBox}>
                      <h2>Sustainability</h2>
                      <h3>Steel is the most recycled material in the world.</h3>
                      <p>
                        Lightweight steel framing is made primarily from
                        recyclable steel. At the end of a home’s life, steel can
                        be fully recycled.
                      </p>
                      <p>
                        Unlike wood, it does not end up in landfills due to
                        decay, contamination, or chemical treatments.
                      </p>
                      <h3>Steel framing has a long service life.</h3>
                      <p>
                        Building to last, reduces the need for replacement or
                        repair over time.
                      </p>
                      <h3>
                        Prefabrication and precision fabrication reduce waste.
                      </h3>
                      <p>
                        Computer-controlled and AI-based design optimizes each
                        steel component for maximum structural performance with
                        minimal material use.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={classes.section}>
                  <div className={classes.row}>
                    <div className={classes.imageBoxGrid}>
                      <div className={classes.imageFrame}>
                        <FirebaseImage
                          path="Resources/Construction/21.jpg"
                          alt="about"
                        />
                      </div>
                      <p>
                        Prefabricated LSF Exterior Wall Panel with Integrated
                        Window Openings. Buildsmartr project, Burnaby, BC,
                        Canada (2023)
                      </p>
                      <div className={classes.imageFrame}>
                        <FirebaseImage
                          path="Resources/Construction/22.jpg"
                          alt="about"
                        />
                      </div>
                      <p>
                        Computer-Calculated Prefabricated Steel Roof Truss
                        Installation. Image source: Unbak Machinery
                      </p>
                      <div className={classes.imageFrame}>
                        <FirebaseImage
                          path="Resources/Construction/23.jpg"
                          alt="about"
                        />
                      </div>
                      <p>Image courtesy of Bailey Metal Products Limited</p>
                    </div>
                    <div className={classes.infoBox}>
                      <h2>Speed & Cost</h2>
                      <h3>LSF reduces overall construction time and cost.</h3>
                      <h3>Speed</h3>
                      <p>
                        Computer-calculated components are delivered pre-cut or
                        panelized as wall panels, joists and trusses, allowing
                        faster installation and quicker enclosure compared to
                        traditional wood framing. Factory-precision fabrication
                        minimizes material waste, reduces on-site cleanup, and
                        lowers labor time. Pre-engineered service openings in
                        steel studs and joists make electrical, plumbing and
                        mechanical installations faster, cleaner and more
                        accurate, eliminating much of the drilling and
                        modification required in wood framing. For a typical
                        4,000 sq ft (370 m²) single-family home, wood framing
                        can take 1.5 to 2 months, while LSF takes about two
                        weeks.
                      </p>
                      <h3>Cost</h3>
                      <p>
                        The non-combustible nature and durability of steel
                        framing can reduce insurance risk and long-term
                        maintenance costs. Non-combustible construction
                        materials such as LSF may benefit from lower insurance
                        rates.
                      </p>
                      <p>
                        Steel framing offers a service life that can exceed that
                        of conventional wood framing, making it a durable,
                        cost-effective investment over the life of the home.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
