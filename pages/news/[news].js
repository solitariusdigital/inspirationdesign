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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Tooltip from "@mui/material/Tooltip";
import { replaceSpacesAndHyphens, convertDateName } from "@/services/utility";
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
  }, []);

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
                  <div className={classes.info}>
                    <h1
                      style={{
                        fontFamily: "OpenSansRegular",
                      }}
                    >
                      {displayNews.title}
                    </h1>
                    <h2>{convertDateName(displayNews.date)}</h2>
                    <p>{getTotalReadingTime(displayNews)}</p>
                  </div>
                  <h3
                    style={{
                      fontFamily: "OpenSansRegular",
                    }}
                  >
                    {displayNews.description.split("\n\n")[0]}
                  </h3>
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
                .map((desc, index) => (
                  <p key={index}>{desc}</p>
                ))}
            </div>
          </article>
          <div className={classes.action}>
            <Tooltip title="Top">
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
            </Tooltip>
          </div>
        </>
      )}
    </>
  );
}
