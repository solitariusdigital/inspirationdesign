import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import Router from "next/router";
import classes from "@/pages/projects/projects.module.scss";
import logoBlack from "@/assets/logo-black.png";
import { replaceSpacesAndHyphens, convertDateName } from "@/services/utility";
import FirebaseImage from "@/components/FirebaseImage";
import db from "@/services/firestore";
import { getDocs, collection, query, where } from "firebase/firestore";

export default function NewsArticle() {
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
        <article className={classes.newsArticle}>
          <h2>{displayNews.title}</h2>
          <p>{convertDateName(displayNews.date)}</p>
          <div className={classes.imageBox}>
            <FirebaseImage path={displayNews.hero} alt={displayNews.title} />
          </div>
        </article>
      )}
    </>
  );
}
