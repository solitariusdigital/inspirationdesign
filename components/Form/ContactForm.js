import { useState, useContext, Fragment } from "react";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");
  const [notification, setNotification] = useState(false);

  const maxWords = 150;
  const currentWordCount = message.trim()
    ? message.trim().split(/\s+/).length
    : 0;
  const remainingWords = maxWords - currentWordCount;

  const handleSubmit = () => {
    // if (!name || !email || !subject || !message) {
    //   showAlert("Required fields *");
    //   return;
    // }
    // if (!validateEmail(email)) {
    //   showAlert("Invalid email");
    //   return;
    // }

    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 5000);
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  return (
    <div className={classes.formBox}>
      <h4>Submit your inquiry</h4>
      <div className={classes.form}>
        <div className={classes.input}>
          <div className={classes.bar}>
            <p className={classes.label}>
              Name
              <span>*</span>
            </p>
            <CloseIcon
              className="icon"
              onClick={() => setName("")}
              sx={{ fontSize: 16 }}
            />
          </div>
          <input
            placeholder="..."
            type="text"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoComplete="off"
          ></input>
        </div>
        <div className={classes.input}>
          <div className={classes.bar}>
            <p className={classes.label}>
              Email
              <span>*</span>
            </p>
            <CloseIcon
              className="icon"
              onClick={() => setEmail("")}
              sx={{ fontSize: 16 }}
            />
          </div>
          <input
            placeholder="..."
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="off"
            dir="ltr"
          />
        </div>
        <div className={classes.input}>
          <div className={classes.bar}>
            <p className={classes.label}>Phone</p>
            <CloseIcon
              className="icon"
              onClick={() => setPhone("")}
              sx={{ fontSize: 16 }}
            />
          </div>
          <input
            placeholder="..."
            type="tel"
            id="phone"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            autoComplete="off"
            dir="ltr"
          />
        </div>
        <div className={classes.input}>
          <div className={classes.bar}>
            <p className={classes.label}>
              Subject
              <span>*</span>
            </p>
            <CloseIcon
              className="icon"
              onClick={() => setSubject("")}
              sx={{ fontSize: 16 }}
            />
          </div>
          <input
            placeholder="..."
            type="text"
            id="subject"
            name="subject"
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
            autoComplete="off"
          ></input>
        </div>
      </div>
      <div className={classes.input}>
        <div className={classes.bar}>
          <p className={classes.label}>
            Message
            <span>*</span>
          </p>
          <CloseIcon
            className="icon"
            onClick={() => setMessage("")}
            sx={{ fontSize: 16 }}
          />
        </div>
        <textarea
          placeholder="..."
          type="text"
          id="message"
          name="message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          autoComplete="off"
          maxLength={maxWords * 7.3}
        ></textarea>
        <p className={classes.count}>
          {maxWords - remainingWords} / {maxWords}
        </p>
      </div>
      <div className={classes.formAction}>
        {!notification ? (
          <>
            <p className={classes.alert}>{alert}</p>
            <button onClick={() => handleSubmit()}>Submit</button>
          </>
        ) : (
          <h5 className={classes.notification}>
            Thanks for contacting us! We will be in touch with you shortly.
          </h5>
        )}
      </div>
    </div>
  );
}
