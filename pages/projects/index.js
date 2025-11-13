import { useState, useEffect, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import { NextSeo } from "next-seo";
import classes from "./projects.module.scss";
import logoBlack from "@/assets/logo-black.png";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Tooltip from "@mui/material/Tooltip";
import FirebaseImage from "@/components/FirebaseImage";
import db from "@/services/firestore";
import { collection, getDocs } from "@firebase/firestore";

export default function Projects() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [pageType, setPageType] = useState(
    "all" || "residential" || "commercial" || "lighting" || "construction"
  );
  const [displayProjects, setDisplayProjects] = useState(null);

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
      setDisplayProjects(data.sort((a, b) => b.year - a.year));
    };
    fetchData();
  }, []);

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
      {/* <div className={classes.container}>
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
        <div className={classes.gridLayout}>
          {displayProjects
            ?.filter(
              (project) => pageType === "all" || project.category === pageType
            )
            .map((project, index) => (
              <div key={index} className={classes.card}>
                {currentUser && (
                  <div className={classes.visibility}>
                    {project.active ? (
                      <Tooltip title="Visible">
                        <VerifiedUserIcon
                          sx={{ fontSize: 18, color: "#84994F" }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Hidden">
                        <VisibilityOffIcon
                          sx={{ fontSize: 18, color: "#bf1a1a" }}
                        />
                      </Tooltip>
                    )}
                  </div>
                )}
                <div className={classes.imageBox}>
                  <FirebaseImage path={project.hero} alt={project.title} />
                </div>
                <h4
                  style={{
                    fontFamily: "TitilliumLight",
                  }}
                >
                  {project.title}
                </h4>
              </div>
            ))}
        </div>
      </div> */}
    </>
  );
}
