import { useState, useEffect, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import Router from "next/router";
import classes from "@/pages/work/work.module.scss";
import logoBlack from "@/assets/logo-black.png";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import Tooltip from "@mui/material/Tooltip";
import GallerySlider from "@/components/GallerySlider";
import { replaceSpacesAndHyphens } from "@/services/utility";
import FirebaseImage from "@/components/FirebaseImage";
import db from "@/services/firestore";
import {
  getDocs,
  doc,
  deleteDoc,
  collection,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, listAll, deleteObject } from "firebase/storage";

export default function Project() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { editProject, setEditProject } = useContext(StateContext);
  const { editNews, setEditNews } = useContext(StateContext);
  const { menuDisplay, setMenuDisplay } = useContext(StateContext);
  const { footerDisplay, setFooterDisplay } = useContext(StateContext);
  const [displayGallerySlider, setDisplayGallerySlider] = useState(false);
  const [displayProject, setDisplayProject] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const router = useRouter();
  const slug = router.asPath.replace(/^\/work\//, "");
  const title = replaceSpacesAndHyphens(slug);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "Projects"), where("title", "==", title));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        Router.push("/404");
        return;
      }
      const doc = querySnapshot.docs[0];
      setDisplayProject({ id: doc.id, ...doc.data() });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  useEffect(() => {
    if (displayGallerySlider) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [displayGallerySlider]);

  const handlePublish = async (project, type) => {
    const confirmMessage = `${type} project - Are you sure?`;
    const confirm = window.confirm(confirmMessage);
    if (!confirm) return;
    let updatedActiveValue = project.active;
    switch (type) {
      case "Publish":
        updatedActiveValue = true;
        break;
      case "Hide":
        updatedActiveValue = false;
        break;
    }
    try {
      const docRef = doc(db, "Projects", project.id);
      await updateDoc(docRef, { active: updatedActiveValue });
      Router.push("/work");
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const handleDelete = async (project) => {
    const confirmMessage = "Delete project - Are you sure?";
    const confirm = window.confirm(confirmMessage);
    if (!confirm) return;
    try {
      const storage = getStorage();
      const folderRef = ref(storage, `Projects/${project.folder}`);
      const items = await listAll(folderRef);
      await Promise.all(
        items.items.map(async (itemRef) => {
          try {
            await deleteObject(itemRef);
          } catch (error) {
            if (error.code !== "storage/object-not-found") {
              throw error;
            }
          }
        }),
      );
      const docRef = doc(db, "Projects", project.id);
      await deleteDoc(docRef);
      Router.push("/work");
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project.");
    }
  };

  const handleDeleteImage = async (image, index) => {
    const confirmMessage = "Delete image - Are you sure?";
    const confirm = window.confirm(confirmMessage);
    if (!confirm) return;
    try {
      const storage = getStorage();
      const storageRef = ref(storage, image);
      try {
        await deleteObject(storageRef);
      } catch (error) {
        if (error.code !== "storage/object-not-found") {
          throw error;
        }
      }
      const newPath = displayProject.path.filter((p) => p !== image);
      const docRef = doc(db, "Projects", displayProject.id);
      await updateDoc(docRef, { path: newPath });
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image.");
    }
  };

  const makeHeroImage = async (image) => {
    const confirmMessage = "Make hero - Are you sure?";
    const confirm = window.confirm(confirmMessage);
    if (!confirm) return;
    const docRef = doc(db, "Projects", displayProject.id);
    await updateDoc(docRef, { hero: image });
    setRefresh((prev) => prev + 1);
  };

  const findIndex = (path) => {
    setMenuDisplay(false);
    setFooterDisplay(false);
    setDisplayGallerySlider(true);
    window.scrollTo(0, 0);
    let index = displayProject.path.indexOf(path);
    setSelectedIndex(index);
  };

  return (
    <>
      <NextSeo
        title={title}
        description="Inspiration Design is a turnkey design firm, specializing in creative designs for residential and commercial projects."
        canonical={`https://inspirationdesigns.ca/work/${slug}`}
        openGraph={{
          type: "website",
          locale: "en_CA",
          url: `https://inspirationdesigns.ca/work/${slug}`,
          title: title,
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
      {displayProject && (
        <div className={classes.cardBox}>
          <div className={classes.hero}>
            <div
              className={`${
                displayProject.orientation === "portrait"
                  ? classes.imageBoxPortrait
                  : classes.imageBoxLandscape
              }`}
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                findIndex(displayProject.hero);
              }}
            >
              <FirebaseImage
                path={displayProject.hero}
                alt={displayProject.title}
              />
            </div>
          </div>
          {currentUser && (
            <div className={classes.controlPanel}>
              {displayProject.active ? (
                <Tooltip title="Hide">
                  <VerifiedUserIcon
                    className="icon"
                    sx={{ fontSize: 20 }}
                    onClick={() => handlePublish(displayProject, "Hide")}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Publish">
                  <VisibilityOffIcon
                    sx={{ fontSize: 20 }}
                    className="icon"
                    onClick={() => handlePublish(displayProject, "Publish")}
                  />
                </Tooltip>
              )}
              <Tooltip title="Edit">
                <EditIcon
                  className="icon"
                  sx={{ fontSize: 20 }}
                  onClick={() => {
                    Router.push("/portal");
                    setEditProject(displayProject);
                    setEditNews(null);
                  }}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <DeleteOutlineIcon
                  className="icon"
                  sx={{ fontSize: 20 }}
                  onClick={() => handleDelete(displayProject)}
                />
              </Tooltip>
            </div>
          )}
          <div className={classes.info}>
            <h1
              style={{
                fontFamily: "RobotoRegular",
                marginTop: "50px",
              }}
            >
              {displayProject.title}
            </h1>
            <h3
              style={{
                margin: "8px 0px",
              }}
            >
              {displayProject.location}
            </h3>
            <p>{displayProject.year}</p>
          </div>
          <div
            className={classes.description}
            style={{
              marginBottom: "50px",
              marginTop: "50px",
            }}
          >
            <h2
              className={classes.subTitle}
              style={{
                fontFamily: "RobotoRegular",
              }}
            >
              {displayProject.description.split("\n\n")[0]}
            </h2>
            {displayProject.description
              .split("\n\n")
              .slice(1)
              .map((desc, index) => {
                const trimmedDesc = desc.trim();
                const urlRegex = /(https?:\/\/[^\s]+)/g;
                const parts = trimmedDesc.split(urlRegex);

                const renderWithLinks = () =>
                  parts.map((part, i) => {
                    const isUrl = i % 2 === 1;
                    if (isUrl) {
                      return (
                        <a
                          className={classes.link}
                          key={i}
                          href={part}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {" "}
                          Open Link{" "}
                        </a>
                      );
                    }
                    const trimmedPart = part.trim();
                    const isQuoted =
                      trimmedPart.startsWith("“") && trimmedPart.endsWith("”");
                    return (
                      <span
                        key={i}
                        style={
                          isQuoted ? { fontFamily: "RobotoItalic" } : undefined
                        }
                      >
                        {part}
                      </span>
                    );
                  });
                if (
                  trimmedDesc === "Credits" ||
                  trimmedDesc === "Project Note"
                ) {
                  return (
                    <h3
                      className={classes.subTitle}
                      style={{
                        fontFamily: "RobotoRegular",
                        marginTop: "50px",
                      }}
                      key={index}
                    >
                      {trimmedDesc}
                    </h3>
                  );
                }
                return (
                  <p
                    key={index}
                    style={{
                      marginBottom: "8px",
                    }}
                  >
                    {renderWithLinks()}
                  </p>
                );
              })}
          </div>
          {displayProject.path
            .filter((item) => item !== displayProject.hero)
            .map((image, index) => (
              <div className={classes.imageBox} key={index}>
                {currentUser && (
                  <div className={classes.control}>
                    <Tooltip title="Delete">
                      <DeleteOutlineIcon
                        className="icon"
                        sx={{ fontSize: 20 }}
                        onClick={() => handleDeleteImage(image, index)}
                      />
                    </Tooltip>
                    <Tooltip title="Hero">
                      <StarIcon
                        className="icon"
                        sx={{ fontSize: 20 }}
                        onClick={() => {
                          makeHeroImage(image);
                        }}
                      />
                    </Tooltip>
                  </div>
                )}
                <div
                  onClick={() => {
                    findIndex(image);
                  }}
                >
                  <FirebaseImage
                    path={image}
                    alt={displayProject.title}
                    mode="intrinsic"
                  />
                </div>
              </div>
            ))}
        </div>
      )}
      {displayProject && (
        <div className="scrollUp">
          <KeyboardArrowUpIcon
            className="icon"
            sx={{ fontSize: 30 }}
            onClick={() =>
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              })
            }
          />
        </div>
      )}
      {displayGallerySlider && (
        <div className={classes.gallerySlider}>
          <div className={classes.bar}>
            <Tooltip title="Close">
              <CloseIcon
                className="icon"
                sx={{ fontSize: 28 }}
                onClick={() => {
                  setMenuDisplay(true);
                  setFooterDisplay(true);
                  setDisplayGallerySlider(false);
                  setSelectedIndex(0);
                }}
              />
            </Tooltip>
            <h2
              style={{
                fontFamily: "RobotoRegular",
              }}
            >
              {displayProject.title}
            </h2>
          </div>
          <GallerySlider
            media={displayProject.path}
            startIndex={selectedIndex}
          />
        </div>
      )}
    </>
  );
}
