import { useState, useEffect, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./home.module.scss";

export default function Home() {
  return <div className={classes.main}>home</div>;
}
