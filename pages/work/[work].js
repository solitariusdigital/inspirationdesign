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
      const docRef = doc(db, "Projects", project.id);
      await deleteDoc(docRef);
      const storage = getStorage();
      const folderRef = ref(storage, `Projects/${project.folder}`);
      const items = await listAll(folderRef);
      for (const itemRef of items.items) {
        await deleteObject(itemRef);
      }
      Router.push("/work");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleDeleteImage = async (image, index) => {
    const confirmMessage = "Delete image - Are you sure?";
    const confirm = window.confirm(confirmMessage);
    if (!confirm) return;
    try {
      const storage = getStorage();
      const storageRef = ref(storage, image);
      await deleteObject(storageRef);

      const newPath = [...displayProject.path];
      newPath.splice(index, 1);
      const docRef = doc(db, "Projects", displayProject.id);
      await updateDoc(docRef, { path: newPath });
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image.");
    }
    setRefresh((prev) => prev + 1);
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
    document.body.style.overflow = "hidden";
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
            <h2
              style={{
                fontFamily: "OpenSansRegular",
              }}
            >
              {displayProject.title}
            </h2>
            <h3>{displayProject.location}</h3>
            <p>{displayProject.year}</p>
          </div>
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
          <div className={classes.description}>
            <h3 className={classes.subTitle}>
              {displayProject.description.split("\n\n")[0]}
            </h3>
            {displayProject.description
              .split("\n\n")
              .slice(1)
              .map((desc, index) => {
                const trimmedDesc = desc.trim();
                const urlRegex = /(https?:\/\/[^\s]+)/g;
                const parts = trimmedDesc.split(urlRegex);
                const renderWithLinks = () =>
                  parts.map((part, i) =>
                    urlRegex.test(part) ? (
                      <a
                        className={classes.link}
                        key={i}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {part}
                      </a>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  );
                if (trimmedDesc === "Credits") {
                  return (
                    <h3
                      className={classes.subTitle}
                      style={{ marginTop: "24px" }}
                      key={index}
                    >
                      {trimmedDesc}
                    </h3>
                  );
                }
                return <p key={index}>{renderWithLinks()}</p>;
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
                  <FirebaseImage path={image} alt={displayProject.title} />
                </div>
              </div>
            ))}
        </div>
      )}
      {displayGallerySlider && (
        <div className={classes.gallerySlider}>
          <div className={classes.icon}>
            <Tooltip title="Close">
              <CloseIcon
                className="icon"
                onClick={() => {
                  setMenuDisplay(true);
                  setFooterDisplay(true);
                  setDisplayGallerySlider(false);
                  setSelectedIndex(0);
                  document.body.style.overflow = "";
                }}
              />
            </Tooltip>
            <h2
              style={{
                fontFamily: "OpenSansRegular",
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
