import { useState, createContext } from "react";
export const StateContext = createContext();

export const StateProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [menuDisplay, setMenuDisplay] = useState(true);
  const [screenSize, setScreenSize] = useState(
    "desktop" || "tablet-landscape" || "tablet-portrait" || "mobile"
  );
  const [editProject, setEditProject] = useState(null);
  const [editNews, setEditNews] = useState(null);
  const [navigationTopBar, setNavigationTopBar] = useState([
    {
      title: "Projects",
      link: "/projects",
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
    editProject,
    setEditProject,
    editNews,
    setEditNews,
  };
  return (
    <StateContext.Provider value={stateContext}>
      {props.children}
    </StateContext.Provider>
  );
};
