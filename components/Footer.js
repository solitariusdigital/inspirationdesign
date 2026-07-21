import { useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Footer.module.scss";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Tooltip from "@mui/material/Tooltip";

export default function Footer() {
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);

  return (
    <div
      className={classes.container}
      style={{
        fontFamily: "RobotoRegular",
      }}
    >
      <nav className={classes.fullSizeNavigation}>
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
      <div className={classes.icons}>
        <Tooltip title="LinkedIn">
          <LinkedInIcon
            sx={{ fontSize: 24 }}
            className={classes.icon}
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/parastoojafari",
                "_ self",
              )
            }
          />
        </Tooltip>
        <Tooltip title="Instagram">
          <InstagramIcon
            sx={{ fontSize: 24 }}
            className={classes.icon}
            onClick={() =>
              window.open(
                "https://instagram.com/inspirationdesigns.ca",
                "_ self",
              )
            }
          />
        </Tooltip>
      </div>
    </div>
  );
}
