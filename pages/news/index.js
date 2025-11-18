import { useState, useEffect, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import classes from "@/pages/projects/projects.module.scss";
import logoBlack from "@/assets/logo-black.png";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { replaceSpacesAndHyphens, sliceString } from "@/services/utility";
import FirebaseImage from "@/components/FirebaseImage";
import db from "@/services/firestore";
import { collection, getDocs } from "@firebase/firestore";

export default function News() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const [displayNews, setDisplayNews] = useState(null);
  const router = useRouter();
  let pathname = router.pathname;

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
      const querySnapshot = await getDocs(collection(db, "News"));
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      if (currentUser) {
        setDisplayNews(sorted);
      } else {
        setDisplayNews(sorted.filter((news) => news.active));
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NextSeo
        title="News"
        description="Inspiration Design is a turnkey design firm, specializing in creative designs for residential and commercial projects."
        canonical="https://inspirationdesigns.ca/news"
        openGraph={{
          type: "website",
          locale: "en_CA",
          url: "https://inspirationdesigns.ca/news",
          title: "News",
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
        <div className={classes.gridLayout}>
          {displayNews?.map((news, index) => {
            const newsLink = `/news/${replaceSpacesAndHyphens(news.title)}`;
            return (
              <Link
                key={index}
                className={classes.item}
                href={newsLink}
                passHref
              >
                <div className={classes.card}>
                  {currentUser && (
                    <div className={classes.visibility}>
                      {news.active ? (
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
                  <div className={classes.imageBoxLandscape}>
                    <FirebaseImage path={news.hero} alt={news.title} />
                  </div>
                  <h4
                    style={{
                      fontFamily: "TitilliumLight",
                      marginTop: "12px",
                    }}
                  >
                    {news.title}
                  </h4>
                  <p className={classes.description}>
                    {sliceString(news.description, 80)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
