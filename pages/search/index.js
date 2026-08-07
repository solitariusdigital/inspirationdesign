import { useEffect, useContext, useState } from "react";
import { StateContext } from "@/context/stateContext";
import { NextSeo } from "next-seo";
import classes from "@/pages/search/search.module.scss";
import logoBlack from "@/assets/logo-black.png";
import FirebaseImage from "@/components/FirebaseImage";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import db from "@/services/firestore";
import { collection, getDocs } from "@firebase/firestore";
import { replaceSpacesAndHyphens } from "@/services/utility";

export default function Search() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [displayProjects, setDisplayProjects] = useState(null);
  const [displayNews, setDisplayNews] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

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

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const combined = [...displayProjects, ...displayNews];

    const results = combined.filter((item) => {
      const query = value.toLowerCase();
      return (
        item.title?.toLowerCase().includes(query) ||
        item.location?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.year?.toLowerCase().includes(query) ||
        item.date?.toLowerCase().includes(query)
      );
    });
    setFilteredItems(results);
  };

  return (
    <>
      <NextSeo
        title="Search"
        description="Inspiration Design is a turnkey design firm, specializing in creative designs for residential and commercial projects."
        canonical="https://inspirationdesigns.ca/search"
        openGraph={{
          type: "website",
          locale: "en_CA",
          url: "https://inspirationdesigns.ca/search",
          title: "Search",
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
        <div className={classes.form}>
          <input
            placeholder="Search by title, category, location, or year"
            type="text"
            id="search"
            name="search"
            onChange={handleSearch}
            value={search}
            autoComplete="off"
          ></input>
          <CloseIcon
            className="icon"
            onClick={() => {
              setSearch("");
              setFilteredItems([]);
            }}
            sx={{ fontSize: 16 }}
          />
        </div>
        <div className={classes.gridLayout}>
          {filteredItems.map((item, index) => {
            const isProject = item.hero?.startsWith("Projects/");
            const basePath = isProject ? "/work" : "/news";
            const link = `${basePath}/${replaceSpacesAndHyphens(item.title)}`;
            return (
              <Link key={index} className={classes.item} href={link} passHref>
                <div className={classes.imageBox}>
                  <FirebaseImage path={item.hero} alt={item.title} />
                  <h2
                    style={{
                      fontFamily: "RobotoRegular",
                      marginTop: "12px",
                    }}
                  >
                    {item.title}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
