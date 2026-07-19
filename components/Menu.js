import { useEffect, useContext, Fragment } from "react";
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
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";

export default function Menu() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { editProject, setEditProject } = useContext(StateContext);
  const { editNews, setEditNews } = useContext(StateContext);
  const { menuMobile, setMenuMobile } = useContext(StateContext);
  const { projectsCategory, setProjectsCategory } = useContext(StateContext);

  const router = useRouter();
  let pathname = router.pathname;

  const isHome = pathname === "/";
  const fullSizeScreen = screenSize !== "mobile";
  const colorCode = isHome ? "white" : "black";

  useEffect(() => {
    if (menuMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuMobile]);

  const activateNav = (link, index) => {
    setTimeout(() => {
      setProjectsCategory("residential");
    }, 100);
    setMenuMobile(false);
    navigationTopBar.map((nav, i) => {
      if (i === index) {
        Router.push(link);
        nav.active = true;
      } else {
        nav.active = false;
      }
    });
    setNavigationTopBar([...navigationTopBar]);
  };

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
      }}
    >
      <div className={classes.logo}>
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
        <div className={classes.portal}>
          <Tooltip title="Logout">
            <LogoutIcon
              className="icon"
              sx={{ fontSize: 18, color: colorCode }}
              onClick={() => logout()}
            />
          </Tooltip>
          <Tooltip title="Portal">
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
        </div>
      )}
      {fullSizeScreen && (
        <nav
          className={classes.fullSizeNavigation}
          style={{
            color: colorCode,
          }}
        >
          {navigationTopBar.map((nav, index) => (
            <Link
              key={index}
              className={!nav.active ? classes.nav : classes.navActive}
              onClick={() => activateNav(nav.link, index)}
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
                  onClick={() => activateNav(nav.link, index)}
                >
                  {nav.title}
                </Link>
              ))}
              <div
                className={`${classes.logo} animate__animated animate__slideInDown`}
                style={{
                  marginTop: "50px",
                }}
                onClick={() =>
                  setTimeout(() => {
                    setMenuMobile(!menuMobile);
                  }, 250)
                }
              >
                <Link href="/" passHref>
                  <Image
                    src={logoWhite}
                    layout="fill"
                    objectFit="contain"
                    alt="logo"
                    as="image"
                    priority
                  />
                </Link>
              </div>
            </nav>
          )}
        </nav>
      )}
    </div>
  );
}
