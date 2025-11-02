import { Fragment, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./home.module.scss";

export default function NotFoundPage() {
  return (
    <div className={classes.notFound}>
      <h2>Page not found</h2>
      <p>The desired page does not exist</p>
    </div>
  );
}
