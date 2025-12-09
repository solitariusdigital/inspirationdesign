import { useState, createContext } from "react";
export const StateContext = createContext();

export const StateProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [menuDisplay, setMenuDisplay] = useState(true);
  const [footerDisplay, setFooterDisplay] = useState(true);
  const [screenSize, setScreenSize] = useState(
    "desktop" || "tablet-landscape" || "tablet-portrait" || "mobile"
  );
  const [editProject, setEditProject] = useState(null);
  const [projectsCategory, setProjectsCategory] = useState("residential");
  const [editNews, setEditNews] = useState(null);
  const [navigationTopBar, setNavigationTopBar] = useState([
    {
      title: "Work",
      link: "/work",
      active: false,
    },
    {
      title: "About",
      link: "/about",
      active: false,
    },
    {
      title: "News",
      link: "/news",
      active: false,
    },
    {
      title: "Contact",
      link: "/contact",
      active: false,
    },
  ]);
  const stateContext = {
    currentUser,
    setCurrentUser,
    screenSize,
    setScreenSize,
    navigationTopBar,
    setNavigationTopBar,
    menuDisplay,
    setMenuDisplay,
    footerDisplay,
    setFooterDisplay,
    editProject,
    setEditProject,
    editNews,
    setEditNews,
    projectsCategory,
    setProjectsCategory,
  };
  return (
    <StateContext.Provider value={stateContext}>
      {props.children}
    </StateContext.Provider>
  );
};
