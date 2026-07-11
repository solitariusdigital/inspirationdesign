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
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StarIcon from "@mui/icons-material/Star";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Tooltip from "@mui/material/Tooltip";
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

export default function NewsArticle() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { editNews, setEditNews } = useContext(StateContext);
  const { editProject, setEditProject } = useContext(StateContext);
  const [displayNews, setDisplayNews] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const router = useRouter();
  const slug = router.asPath.replace(/^\/news\//, "");
  const title = replaceSpacesAndHyphens(slug);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "News"), where("title", "==", title));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        Router.push("/404");
        return;
      }
      const doc = querySnapshot.docs[0];
      setDisplayNews({ id: doc.id, ...doc.data() });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const handlePublish = async (news, type) => {
    const confirmMessage = `${type} news - Are you sure?`;
    const confirm = window.confirm(confirmMessage);
    if (!confirm) return;
    let updatedActiveValue = news.active;
    switch (type) {
      case "Publish":
        updatedActiveValue = true;
        break;
      case "Hide":
        updatedActiveValue = false;
        break;
    }
    try {
      const docRef = doc(db, "News", news.id);
      await updateDoc(docRef, { active: updatedActiveValue });
      Router.push("/news");
    } catch (error) {
      console.error("Failed to update news:", error);
    }
  };

  const handleDelete = async (news) => {
    const confirmMessage = "Delete news - Are you sure?";
    const confirm = window.confirm(confirmMessage);
    if (!confirm) return;
    try {
      const docRef = doc(db, "News", news.id);
      await deleteDoc(docRef);
      const storage = getStorage();
      const folderRef = ref(storage, `News/${news.folder}`);
      const items = await listAll(folderRef);
      for (const itemRef of items.items) {
        await deleteObject(itemRef);
      }
      Router.push("/news");
    } catch (error) {
      console.error("Error deleting news:", error);
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

      const newPath = [...displayNews.path];
      newPath.splice(index, 1);
      const docRef = doc(db, "News", displayNews.id);
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
    const docRef = doc(db, "News", displayNews.id);
    await updateDoc(docRef, { hero: image });
    setRefresh((prev) => prev + 1);
  };

  const getTotalReadingTime = (data) => {
    const readingTime = calculateReadingTime(data.description);
    return `${readingTime} min read`;
  };

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 180;
    const words = text.trim().split(/\s+/);
    const wordCount = words.length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  return (
    <>
      <NextSeo
        title={title}
        description="Inspiration Design is a turnkey design firm, specializing in creative designs for residential and commercial projects."
        canonical={`https://inspirationdesigns.ca/news/${slug}`}
        openGraph={{
          type: "website",
          locale: "en_CA",
          url: `https://inspirationdesigns.ca/news/${slug}`,
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
      {displayNews && (
        <>
          <article
            className={classes.cardBox}
            style={{
              marginTop: "100px",
            }}
          >
            <div className={classes.heroNews}>
              <div className={classes.imageBoxLandscape}>
                <FirebaseImage
                  path={displayNews.hero}
                  alt={displayNews.title}
                />
              </div>
              <div className={classes.overlay}>
                <div className={classes.row}>
                  <h1
                    style={{
                      fontFamily: "RobotoRegular",
                    }}
                  >
                    {displayNews.title}
                  </h1>
                  <div className={classes.info}>
                    <h4>{displayNews.description.split("\n\n")[0]}</h4>
                    <h4
                      style={{
                        margin: "8px 0px",
                      }}
                    >
                      {displayNews.date}
                    </h4>
                    <p>{getTotalReadingTime(displayNews)}</p>
                  </div>
                </div>
              </div>
            </div>
            {currentUser && (
              <div className={classes.controlPanel}>
                {displayNews.active ? (
                  <Tooltip title="Hide">
                    <VerifiedUserIcon
                      className="icon"
                      sx={{ fontSize: 20 }}
                      onClick={() => handlePublish(displayNews, "Hide")}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Publish">
                    <VisibilityOffIcon
                      sx={{ fontSize: 20 }}
                      className="icon"
                      onClick={() => handlePublish(displayNews, "Publish")}
                    />
                  </Tooltip>
                )}
                <Tooltip title="Edit">
                  <EditIcon
                    className="icon"
                    sx={{ fontSize: 20 }}
                    onClick={() => {
                      Router.push("/portal");
                      setEditNews(displayNews);
                      setEditProject(null);
                    }}
                  />
                </Tooltip>
                <Tooltip title="Delete">
                  <DeleteOutlineIcon
                    className="icon"
                    sx={{ fontSize: 20 }}
                    onClick={() => handleDelete(displayNews)}
                  />
                </Tooltip>
              </div>
            )}
            <div
              className={classes.description}
              style={{
                marginTop: "50px",
              }}
            >
              {displayNews.description
                .split("\n\n")
                .slice(1)
                .map((desc, index) => {
                  const trimmedDesc = desc.trim();
                  const urlRegex = /(https?:\/\/[^\s]+)/g;
                  const testUrlRegex = /^https?:\/\/[^\s]+$/;
                  const parts = trimmedDesc.split(urlRegex);
                  return (
                    <div
                      key={index}
                      style={{
                        marginBottom:
                          trimmedDesc.charAt(0) === "-" ? "4px" : "8px",
                      }}
                    >
                      {parts.map((part, i) =>
                        testUrlRegex.test(part) ? (
                          <a
                            className={classes.link}
                            key={i}
                            href={part}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Open Link
                          </a>
                        ) : (
                          <span key={i}>{part}</span>
                        ),
                      )}
                    </div>
                  );
                })}
              {displayNews.projectLink && (
                <div
                  style={{
                    marginTop: "40px",
                  }}
                >
                  <a
                    className={classes.link}
                    href={displayNews.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginTop: "24px",
                      fontSize: "1em",
                    }}
                  >
                    View the Project
                  </a>
                </div>
              )}
            </div>
            <div className={classes.newsImageBox}>
              {displayNews.path
                .filter((item) => item !== displayNews.hero)
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
                    <div>
                      <FirebaseImage
                        path={image}
                        alt={displayNews.title}
                        mode="intrinsic"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </article>
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
        </>
      )}
    </>
  );
}
