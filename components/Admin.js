import { useContext, Fragment, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Admin.module.scss";
import ProjectForm from "@/components/Form/ProjectForm";
import NewsForm from "@/components/Form/NewsForm";

export default function Admin() {
  const [pageType, setPageType] = useState("projects" || "news");
  const navigation = ["projects", "news"];

  return (
    <div className={classes.container}>
      <div className={classes.navigation}>
        {navigation.map((nav, index) => (
          <p
            key={index}
            className={pageType === nav ? classes.navActive : classes.nav}
            onClick={() => setPageType(nav)}
          >
            {nav}
          </p>
        ))}
      </div>
      {pageType === "projects" && <ProjectForm />}
      {pageType === "news" && <NewsForm />}
    </div>
  );
}
