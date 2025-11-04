import { useState, useContext, Fragment } from "react";
import { NextSeo } from "next-seo";
import classes from "./contact.module.scss";
import logoBlack from "@/assets/logo-black.png";
import CloseIcon from "@mui/icons-material/Close";
import { validateEmail } from "@/services/utility";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");
  const [notification, setNotification] = useState(false);

  const headLocationLink = "https://maps.app.goo.gl/PL91GoWmYGTzhMqt6";
  const maxWords = 150;

  const currentWordCount = message.trim()
    ? message.trim().split(/\s+/).length
    : 0;
  const remainingWords = maxWords - currentWordCount;

  const handleSubmit = () => {
    // if (!name || !email || !message) {
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
    <>
      <NextSeo
        title="Contact"
        description="Inspiration Design is a turnkey design firm, specializing in creative designs for residential and commercial projects."
        canonical="https://inspirationdesigns.ca/contact"
        openGraph={{
          type: "website",
          locale: "en_CA",
          url: "https://inspirationdesigns.ca/contact",
          title: "Contact",
          description:
            "Inspiration Design is a turnkey design firm, specializing in creative designs for residential and commercial projects.",
          siteName: "Design Firm",
          images: {
            url: logoBlack,
            width: 1200,
            height: 630,
            alt: "Inspiration Design",
          },
        }}
        robots="index, follow"
      />
      <div className={classes.container}>
        <div className={classes.text}>
          <h3>Let's light together</h3>
          <p
            style={{
              fontFamily: "EnglishExtraLight",
            }}
          >
            We welcome inquiries from new and existing clients, job seekers, and
            anyone who wants to connect. If you have a unique project in mind,
            please don't hesitate to contact us. We're eager to hear from you.
          </p>
        </div>
        <div
          className={classes.contact}
          style={{
            fontFamily: "EnglishLight",
          }}
        >
          <div className={classes.contactBox}>
            <div>
              <h4>Contact us</h4>
              <p
                className={classes.phone}
                onClick={() => window.open(`tel:+16049710270`, "_self")}
              >
                T 604 971 0270
              </p>
              <p
                className={classes.phone}
                onClick={() => window.open(`tel:+16043659191`, "_self")}
              >
                C 604 365 9191
              </p>
              <p>info@inspirationdesigns.ca</p>
            </div>
            <div>
              <h4>Reach us</h4>
              <p>
                Harbourfront Business Centre, 500 – 224 West Esplanade North
                Vancouver V7M 1A4
              </p>
              <p
                className={classes.direction}
                onClick={() => window.open(headLocationLink)}
              >
                Get directions
              </p>
            </div>
          </div>
        </div>
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
                <p className={classes.label}>Subject</p>
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
      </div>
    </>
  );
}
