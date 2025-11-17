import { useState, useEffect, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import { NextSeo } from "next-seo";
import classes from "./projects.module.scss";
import logoBlack from "@/assets/logo-black.png";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { replaceSpacesAndHyphens } from "@/services/utility";
import FirebaseImage from "@/components/FirebaseImage";
import db from "@/services/firestore";
import { collection, getDocs } from "@firebase/firestore";

export default function Projects() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [pageType, setPageType] = useState(
    "all" || "residential" || "commercial" || "lighting" || "construction"
  );
  const [displayProjects, setDisplayProjects] = useState(null);
  const [firstColumn, setFirstColumn] = useState([]);
  const [secondColumn, setSecondColumn] = useState([]);

  const navigation = [
    "all",
    "residential",
    "commercial",
    "lighting",
    "construction",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "Projects"));
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const sorted = data.sort((a, b) => b.year - a.year);
      if (currentUser) {
        setDisplayProjects(sorted);
      } else {
        setDisplayProjects(sorted.filter((project) => project.active));
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filtered = displayProjects?.filter(
      (project) => pageType === "all" || project.category === pageType
    );
    if (filtered?.length <= 1) {
      setFirstColumn(filtered);
      setSecondColumn([]);
    } else {
      const half = Math.ceil(filtered?.length / 2);
      setFirstColumn(filtered?.slice(0, half));
      setSecondColumn(filtered?.slice(half));
    }
  }, [pageType, displayProjects]);

  return (
    <>
      <NextSeo
        title="Projects"
        description="Inspiration Design is a turnkey design firm, specializing in creative designs for residential and commercial projects."
        canonical="https://inspirationdesigns.ca/projects"
        openGraph={{
          type: "website",
          locale: "en_CA",
          url: "https://inspirationdesigns.ca/projects",
          title: "Projects",
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
        <div className={classes.gridLayoutVertical}>
          <div className={classes.column}>
            {firstColumn?.map((project, index) => {
              const projectLink = `/projects/${replaceSpacesAndHyphens(
                project.title
              )}`;
              return (
                <Link
                  key={index}
                  className={classes.item}
                  href={projectLink}
                  passHref
                >
                  <div key={index} className={classes.card}>
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
                      className={`${
                        project.orientation === "portrait"
                          ? classes.imageBoxPortrait
                          : classes.imageBoxLandscape
                      }`}
                    >
                      <FirebaseImage path={project.hero} alt={project.title} />
                      <div className={classes.overlay}>
                        <h4
                          style={{
                            fontFamily: "TitilliumLight",
                          }}
                        >
                          {project.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className={classes.column}>
            {secondColumn?.map((project, index) => {
              const projectLink = `/projects/${replaceSpacesAndHyphens(
                project.title
              )}`;
              return (
                <Link
                  key={index}
                  className={classes.item}
                  href={projectLink}
                  passHref
                >
                  <div key={index} className={classes.card}>
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
                      className={`${
                        project.orientation === "portrait"
                          ? classes.imageBoxPortrait
                          : classes.imageBoxLandscape
                      }`}
                    >
                      <FirebaseImage path={project.hero} alt={project.title} />
                      <div className={classes.overlay}>
                        <h4
                          style={{
                            fontFamily: "TitilliumLight",
                          }}
                        >
                          {project.title}
                        </h4>
                      </div>
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
