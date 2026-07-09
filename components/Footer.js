import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Footer.module.scss";
import Link from "next/link";
import Router from "next/router";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { projectsCategory, setProjectsCategory } = useContext(StateContext);

  const activateNav = (link, index) => {
    setProjectsCategory("residential");
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
    <div
      className={classes.container}
      style={{
        fontFamily: "RobotoRegular",
      }}
    >
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
      <div className={classes.icons}>
        <InstagramIcon
          sx={{ fontSize: 24 }}
          className={classes.icon}
          onClick={() =>
            window.open("https://instagram.com/inspirationdesigns.ca", "_ self")
          }
        />
      </div>
    </div>
  );
}
