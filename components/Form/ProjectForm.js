import { useState, useContext, Fragment } from "react";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";

export default function ProjectForm() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState("");

  return (
    <div className={classes.formBox}>
      <h4>Add Project</h4>
      <div className={classes.form}>
        <div className={classes.input}>
          <div className={classes.bar}>
            <p className={classes.label}>
              Title
              <span>*</span>
            </p>
            <CloseIcon
              className="icon"
              onClick={() => setTitle("")}
              sx={{ fontSize: 16 }}
            />
          </div>
          <input
            type="text"
            id="title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            autoComplete="off"
          ></input>
        </div>
        <div className={classes.input}>
          <div className={classes.bar}>
            <p className={classes.label}>
              Location
              <span>*</span>
            </p>
            <CloseIcon
              className="icon"
              onClick={() => setLocation("")}
              sx={{ fontSize: 16 }}
            />
          </div>
          <input
            type="text"
            id="location"
            name="location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            autoComplete="off"
            dir="ltr"
          />
        </div>
        <div className={classes.input}>
          <div className={classes.bar}>
            <p className={classes.label}>
              Year
              <span>*</span>
            </p>
            <CloseIcon
              className="icon"
              onClick={() => setYear("")}
              sx={{ fontSize: 16 }}
            />
          </div>
          <input
            type="tel"
            id="year"
            name="year"
            onChange={(e) => setYear(e.target.value)}
            value={year}
            autoComplete="off"
            dir="ltr"
          />
        </div>
      </div>
      <div className={classes.input}>
        <div className={classes.bar}>
          <p className={classes.label}>
            Description
            <span>*</span>
          </p>
          <CloseIcon
            className="icon"
            onClick={() => setDescription("")}
            sx={{ fontSize: 16 }}
          />
        </div>
        <textarea
          type="text"
          id="description"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          autoComplete="off"
        ></textarea>
      </div>
      <div className={classes.formAction}>
        <p className={classes.alert}>{alert}</p>
        <button onClick={() => handleSubmit()}>Save</button>
      </div>
    </div>
  );
}
