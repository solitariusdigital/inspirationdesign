import { useState, useContext, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./portal.module.scss";
import { NextSeo } from "next-seo";
import logoBlack from "@/assets/logo-black.png";
import CloseIcon from "@mui/icons-material/Close";
import Router from "next/router";
import secureLocalStorage from "react-secure-storage";
import AES from "crypto-js/aes";
import { enc } from "crypto-js";
import Admin from "@/components/Admin";
import { validateEmail } from "@/services/utility";

export default function Portal() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [displayAdmin, setDisplayAdmin] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setDisplayAdmin(false);
    } else {
      setDisplayAdmin(true);
    }
  }, [currentUser]);

  useEffect(() => {
    navigationTopBar.map((nav) => {
      nav.active = false;
    });
    setNavigationTopBar([...navigationTopBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = () => {
    // if (!email || !password) {
    //   showAlert("Email & Password are required");
    //   return;
    // }
    // if (!validateEmail(email)) {
    //   showAlert("Invalid email");
    //   return;
    // }
    // if (password.length < 8) {
    //   showAlert("Password must be minimum 8 characters");
    //   return;
    // }
    // signInUser();
    setDisplayAdmin(true);
  };

  const signInUser = async () => {
    if (userData) {
      if (decryptPassword(userData.password) === password) {
        setCurrentUser(userData);
        secureLocalStorage.setItem("currentUser", JSON.stringify(userData));
        Router.push("/admin");
      } else {
        showAlert("Wrong password");
      }
    } else {
      showAlert("Email does not exist");
    }
  };

  // dencrypt password
  const decryptPassword = (password) => {
    let decryptedBytes = AES.decrypt(
      password,
      process.env.NEXT_PUBLIC_CRYPTO_SECRETKEY
    );
    return decryptedBytes.toString(enc.Utf8);
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
        title="Portal"
        description="Inspiration Design is a turnkey design firm, specializing in creative designs for residential and commercial projects."
        canonical="https://inspirationdesigns.ca/portal"
        openGraph={{
          type: "website",
          locale: "en_CA",
          url: "https://inspirationdesigns.ca/portal",
          title: "Portal",
          description:
            "Inspiration Design is a turnkey design firm, specializing in creative designs for residential and commercial projects.",
          siteName: "Inspiration Design",
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
        {!displayAdmin ? (
          <>
            <h3>Portal</h3>
            <div className={classes.form}>
              <div className={classes.input}>
                <div className={classes.bar}>
                  <p className={classes.label}>Email</p>
                  <CloseIcon
                    className="icon"
                    onClick={() => setEmail("")}
                    sx={{ fontSize: 16 }}
                  />
                </div>
                <input
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
                  <p className={classes.label}>Password</p>
                  <CloseIcon
                    className="icon"
                    onClick={() => setPassword("")}
                    sx={{ fontSize: 16 }}
                  />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete="off"
                  dir="ltr"
                />
              </div>
              <div className={classes.formAction}>
                <p className={classes.alert}>{alert}</p>
                <button onClick={() => handleLogin()}>Sign in</button>
              </div>
            </div>
          </>
        ) : (
          <Admin />
        )}
      </div>
    </>
  );
}
