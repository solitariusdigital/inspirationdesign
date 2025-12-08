import { useState, useContext, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./portal.module.scss";
import { NextSeo } from "next-seo";
import logoBlack from "@/assets/logo-black.png";
import loading from "@/assets/loading.svg";
import Image from "next/legacy/image";
import secureLocalStorage from "react-secure-storage";
import Admin from "@/components/Admin";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/services/firebase";

export default function Portal() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const [alert, setAlert] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [displayAdmin, setDisplayAdmin] = useState(false);
  const allowedEmail = "inspirationdesignsgroup@gmail.com";

  useEffect(() => {
    if (!currentUser) {
      setDisplayAdmin(false);
    } else {
      setDisplayAdmin(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    navigationTopBar.map((nav) => {
      nav.active = false;
    });
    setNavigationTopBar([...navigationTopBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async () => {
    try {
      setDisableButton(true);
      const result = await signInWithPopup(auth, googleProvider);
      const userData = result.user;
      if (userData.email !== allowedEmail) {
        await signOut(auth);
        showAlert("Access denied - This account is not authorized.");
        return;
      }
      setDisplayAdmin(true);
      setCurrentUser(userData);
      secureLocalStorage.setItem("currentUser", JSON.stringify(userData));
    } catch (error) {
      showAlert("Google login error - " + (error.message || "Unknown error"));
    } finally {
      setDisableButton(false);
    }
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 5000);
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
            <h3
              style={{
                fontFamily: "OpenSansRegular",
              }}
            >
              Portal
            </h3>
            <div className={classes.form}>
              <div className={classes.formAction}>
                <p className={classes.alert}>{alert}</p>
                {!disableButton ? (
                  <button onClick={() => handleLogin()}>
                    <span>Login with Google</span>
                  </button>
                ) : (
                  <Image width={50} height={50} src={loading} alt="isLoading" />
                )}
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
