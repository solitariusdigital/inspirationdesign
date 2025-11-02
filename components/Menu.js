import { useState, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import Link from "next/link";
import Router from "next/router";
import classes from "./Menu.module.scss";
import Image from "next/legacy/image";
import logo from "@/assets/logo-black.png";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";

export default function Menu() {
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [menuMobile, setMenuMobile] = useState(false);

  const fullSizeChatBox = screenSize !== "mobile";

  const activateNav = (link, index) => {
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

  return (
    <div className={classes.container}>
      <div className={classes.logo} onClick={() => window.location.assign("/")}>
        <Link href="/" passHref>
          <Image
            src={logo}
            layout="fill"
            objectFit="contain"
            alt="logo"
            as="image"
          />
        </Link>
      </div>
      {fullSizeChatBox ? (
        <nav className={classes.fullSizeNavigation}>
          {navigationTopBar.map((nav, index) => (
            <Fragment key={index}>
              <Link
                className={!nav.active ? classes.nav : classes.navActive}
                onClick={() => activateNav(nav.link, index)}
                href={nav.link}
                passHref
              >
                {nav.title}
              </Link>
            </Fragment>
          ))}
        </nav>
      ) : (
        <nav>
          {menuMobile ? (
            <Tooltip title="Close">
              <CloseIcon
                className="icon"
                onClick={() => setMenuMobile(!menuMobile)}
                sx={{ fontSize: 30 }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Menu">
              <MenuIcon
                className="icon"
                onClick={() => setMenuMobile(!menuMobile)}
                sx={{ fontSize: 30 }}
              />
            </Tooltip>
          )}
          {menuMobile && (
            <nav
              className={`${classes.mobileNavigation} animate__animated animate__slideInLeft`}
            >
              {navigationTopBar.map((nav, index) => (
                <Fragment key={index}>
                  <Link
                    className={!nav.active ? classes.nav : classes.navActive}
                    onClick={() => activateNav(nav.link, index)}
                    href={nav.link}
                    passHref
                  >
                    {nav.title}
                  </Link>
                </Fragment>
              ))}
            </nav>
          )}
        </nav>
      )}
    </div>
  );
}
