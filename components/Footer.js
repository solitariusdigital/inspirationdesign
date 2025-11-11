import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Footer.module.scss";
import Link from "next/link";
import Router from "next/router";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";

export default function Footer() {
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);

  const activateNav = (link, index) => {
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
        <Link href="" target="_blank" rel="noopener noreferrer" passHref>
          <LinkedInIcon sx={{ fontSize: 24 }} className={classes.icon} />
        </Link>
        <Link href="" target="_blank" rel="noopener noreferrer" passHref>
          <InstagramIcon sx={{ fontSize: 24 }} className={classes.icon} />
        </Link>
        <Link href="" target="_blank" rel="noopener noreferrer" passHref>
          <XIcon sx={{ fontSize: 24 }} className={classes.icon} />
        </Link>
        <Link href="" target="_blank" rel="noopener noreferrer" passHref>
          <FacebookIcon sx={{ fontSize: 24 }} className={classes.icon} />
        </Link>
        <Link href="" target="_blank" rel="noopener noreferrer" passHref>
          <PinterestIcon sx={{ fontSize: 24 }} className={classes.icon} />
        </Link>
      </div>
    </div>
  );
}
