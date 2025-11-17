import { useState, useEffect, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import Router from "next/router";
import classes from "@/pages/projects/projects.module.scss";
import logoBlack from "@/assets/logo-black.png";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
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
        <article className={classes.cardBox}>
          {currentUser && (
            <div className={classes.controlPanel}>
              {displayNews.active ? (
                <Tooltip title="Hide">
                  <VerifiedUserIcon
                    className="icon"
                    sx={{ fontSize: 24 }}
                    onClick={() => handlePublish(displayNews, "Hide")}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Publish">
                  <VisibilityOffIcon
                    sx={{ fontSize: 24 }}
                    className="icon"
                    onClick={() => handlePublish(displayNews, "Publish")}
                  />
                </Tooltip>
              )}
              <Tooltip title="Edit">
                <EditIcon
                  className="icon"
                  sx={{ fontSize: 24 }}
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
                  sx={{ fontSize: 24 }}
                  onClick={() => handleDelete(displayNews)}
                />
              </Tooltip>
            </div>
          )}
          <h2
            style={{
              fontFamily: "TitilliumLight",
            }}
          >
            {displayNews.title}
          </h2>
          <p>{convertDateName(displayNews.date)}</p>
          <div className={classes.imageBox}>
            <FirebaseImage path={displayNews.hero} alt={displayNews.title} />
          </div>
          <div className={classes.description}>
            {displayNews.description.split("\n\n").map((desc, index) => (
              <p key={index}>{desc}</p>
            ))}
          </div>
        </article>
      )}
    </>
  );
}
