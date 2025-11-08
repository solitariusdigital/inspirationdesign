import { useState, useContext, useEffect } from "react";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/legacy/image";
import loading from "@/assets/loading.svg";
import { validateEmail } from "@/services/utility";
import db from "@/services/firestore";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "@firebase/firestore";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");
  const [notification, setNotification] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const maxWords = 150;
  const currentWordCount = message.trim()
    ? message.trim().split(/\s+/).length
    : 0;
  const remainingWords = maxWords - currentWordCount;

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "inquiry"));
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(data, "data fetched");
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const docRef = doc(db, "inquiry", id);
    await deleteDoc(docRef);
  };

  const handleSubmit = async () => {
    if (!name || !email || !phone || !subject || !message) {
      showAlert("All fields Required");
      setDisableButton(false);
      return;
    }
    if (!validateEmail(email)) {
      showAlert("Invalid email");
      setDisableButton(false);
      return;
    }
    setDisableButton(true);
    try {
      const docRef = await addDoc(collection(db, "inquiry"), {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: subject.trim(),
        message: message.trim(),
        createdAt: new Date().toISOString(),
      });
      if (docRef.id) {
        setDisableButton(false);
        setNotification(true);
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
        setTimeout(() => {
          setNotification(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error adding document:", error);
      showAlert("Failed to send. Please try again later.");
    }
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  return (
    <div className={classes.formBox}>
      <h4
        style={{
          fontFamily: "English",
        }}
      >
        Submit your inquiry
      </h4>
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
            <p className={classes.label}>
              Phone
              <span>*</span>
            </p>
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
            {!disableButton ? (
              <button disabled={disableButton} onClick={() => handleSubmit()}>
                Submit
              </button>
            ) : (
              <Image width={50} height={50} src={loading} alt="isLoading" />
            )}
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
