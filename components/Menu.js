import { useEffect, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Router from "next/router";
import classes from "./Menu.module.scss";
import Image from "next/legacy/image";
import logoWhite from "@/assets/logo-white.png";
import logoBlack from "@/assets/logo-black.png";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import secureLocalStorage from "react-secure-storage";
import SearchIcon from "@mui/icons-material/Search";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";

export default function Menu() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { editProject, setEditProject } = useContext(StateContext);
  const { editNews, setEditNews } = useContext(StateContext);
  const { menuMobile, setMenuMobile } = useContext(StateContext);
  const { menuBackground, setMenuBackground } = useContext(StateContext);

  const router = useRouter();
  let pathname = router.pathname;

  const isHome = pathname === "/";
  const fullSizeScreen = screenSize !== "mobile";
  const colorCode = isHome ? "white" : "black";

  useEffect(() => {
    if (!menuMobile) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollY);
    };
  }, [menuMobile]);

  useEffect(() => {
    navigationTopBar.map((nav) => {
      nav.active = nav.link === pathname;
    });
    setNavigationTopBar([...navigationTopBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const logout = async () => {
    try {
      await signOut(auth);
      secureLocalStorage.removeItem("currentUser");
      setCurrentUser(null);
      Router.push("/");
    } catch (error) {
      console.error("Logout error - " + (error.message || "Unknown error"));
    }
  };

  return (
    <div
      className={classes.container}
      style={{
        fontFamily: "RobotoRegular",
        backgroundColor: menuBackground,
      }}
    >
      <div className={classes.fullMenu}>
        <div className={classes.portal}>
          <div
            className={classes.logo}
            onClick={() => {
              setMenuMobile(!menuMobile);
            }}
          >
            <Link href="/" passHref>
              <Image
                src={isHome ? logoWhite : logoBlack}
                layout="fill"
                objectFit="contain"
                alt="logo"
                as="image"
                priority
              />
            </Link>
          </div>
          {currentUser && (
            <>
              <Tooltip title="Logout">
                <LogoutIcon
                  className="icon"
                  sx={{ fontSize: 18, color: colorCode }}
                  onClick={() => logout()}
                />
              </Tooltip>
              <Tooltip
                title="Portal"
                style={{
                  margin: "0px 8px",
                }}
              >
                <SpaceDashboardIcon
                  className="icon"
                  sx={{ fontSize: 18, color: colorCode }}
                  onClick={() => {
                    Router.push("/portal");
                    setEditProject(null);
                    setEditNews(null);
                  }}
                />
              </Tooltip>
            </>
          )}
          {fullSizeScreen && (
            <Tooltip title="Search">
              <SearchIcon
                className="icon"
                sx={{ fontSize: 18, color: colorCode }}
                onClick={() => {
                  Router.push("/search");
                }}
              />
            </Tooltip>
          )}
        </div>
        {fullSizeScreen && (
          <nav
            className={classes.fullNavigation}
            style={{
              color: colorCode,
            }}
          >
            {navigationTopBar.map((nav, index) => (
              <Link
                key={index}
                className={!nav.active ? classes.nav : classes.navActive}
                href={nav.link}
                passHref
              >
                {nav.title}
              </Link>
            ))}
          </nav>
        )}
        {!fullSizeScreen && (
          <nav>
            <div className={classes.control}>
              {menuMobile ? (
                <CloseIcon
                  onClick={() => setMenuMobile(!menuMobile)}
                  sx={{ fontSize: 28, color: "white" }}
                />
              ) : (
                <MenuIcon
                  onClick={() => setMenuMobile(!menuMobile)}
                  sx={{ fontSize: 28, color: colorCode }}
                />
              )}
            </div>
            {menuMobile && (
              <nav className={classes.mobileNavigation}>
                {navigationTopBar.map((nav, index) => (
                  <Link
                    key={nav.link}
                    href={nav.link}
                    className={nav.active ? classes.navActive : classes.nav}
                    style={{
                      animationDelay: `${index * 180}ms`,
                    }}
                    onClick={() => {
                      setMenuMobile(!menuMobile);
                    }}
                  >
                    {nav.title}
                  </Link>
                ))}
                <Tooltip
                  title="Search"
                  className={classes.nav}
                  style={{
                    animationDelay: `${4 * 180}ms`,
                  }}
                >
                  <SearchIcon
                    className="icon"
                    sx={{ fontSize: 18 }}
                    onClick={() => {
                      Router.push("/search");
                      setMenuMobile(!menuMobile);
                    }}
                  />
                </Tooltip>
              </nav>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
