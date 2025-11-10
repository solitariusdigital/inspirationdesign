import { useState, useContext, Fragment } from "react";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";

export default function NewsForm() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState("");

  return (
    <div className={classes.formBox}>
      <h4>Add News</h4>
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
              Date
              <span>*</span>
            </p>
            <CloseIcon
              className="icon"
              onClick={() => setDate("")}
              sx={{ fontSize: 16 }}
            />
          </div>
          <input
            type="text"
            id="date"
            name="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
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
