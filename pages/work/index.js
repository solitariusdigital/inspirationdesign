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
  const router = useRouter();
  let pathname = router.pathname;

  const navigation = ["residential", "commercial", "lighting", "construction"];
  const services = {
    residential: "Building & Interior Design",
    commercial: "Building & Interior Design",
    lighting: "Lighting Design",
    construction: "Healthy House Design with Lightweight Steel Framing",
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
        (project) => project.category === projectsCategory
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
            <h3
              key={index}
              className={
                projectsCategory === nav ? classes.navActive : classes.nav
              }
              onClick={() => setProjectsCategory(nav)}
            >
              {nav}
            </h3>
          ))}
        </div>
        <h2
          className={classes.title}
          style={{
            fontFamily: "OpenSansRegular",
          }}
        >
          {services[projectsCategory]}
        </h2>
        <div className={classes.gridLayoutVertical}>
          <div className={classes.column}>
            {firstColumn?.map((project, index) => {
              const projectLink = `/work/${replaceSpacesAndHyphens(
                project.title
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
                      <FirebaseImage path={project.hero} alt={project.title} />
                      {hoveredId === project.id && (
                        <div className={classes.overlay}>
                          <h3
                            className="animate__animated animate__slideInUp"
                            style={{ fontFamily: "OpenSansRegular" }}
                          >
                            {project.title}
                          </h3>
                          <p className="animate__animated animate__slideInUp">
                            {project.location}
                          </p>
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
                project.title
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
                      <FirebaseImage path={project.hero} alt={project.title} />
                      {hoveredId === project.id && (
                        <div className={classes.overlay}>
                          <h3
                            className="animate__animated animate__slideInUp"
                            style={{ fontFamily: "OpenSansRegular" }}
                          >
                            {project.title}
                          </h3>
                          <p className="animate__animated animate__slideInUp">
                            {project.location}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
