/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import Image from "next/legacy/image";
import logoWhite from "@/assets/logo-white.png";
import arrowUp from "@/assets/arrowUp.svg";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import secureLocalStorage from "react-secure-storage";
import Typewriter from "@/components/Typewriter";

export default function RootLayout({ children }) {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { menuDisplay, setMenuDisplay } = useContext(StateContext);
  const { footerDisplay, setFooterDisplay } = useContext(StateContext);
  const [appLoader, setAppLoader] = useState(false);
  const [scrollArrow, setScrollArrow] = useState(false);

  const handleResize = () => {
    let element = document.getElementById("detailsInformation");
    if (element) {
      let elemHeight = element.getBoundingClientRect().height;
      setHeroHeight(elemHeight);
    }
    const width = window.innerWidth;
    const height = window.innerHeight;

    let screenSize;
    if (width < 700) {
      screenSize = "mobile";
    } else if (width >= 700 && width < 1400) {
      screenSize = width > height ? "tablet-landscape" : "tablet-portrait";
    } else {
      screenSize = "desktop";
    }
    setScreenSize(screenSize);
  };

  useEffect(() => {
    const localCurrentUser = JSON.parse(
      secureLocalStorage.getItem("currentUser")
    );
    if (localCurrentUser) {
      setCurrentUser(localCurrentUser);
    }
    setTimeout(() => {
      setAppLoader(true);
    }, 3000);
  }, []);

  useEffect(() => {
    const handleResizeDebounced = () => {
      clearTimeout(window._resizeTimeout);
      window._resizeTimeout = setTimeout(handleResize, 150);
    };

    handleResize();
    window.addEventListener("resize", handleResizeDebounced);
    return () => {
      window.removeEventListener("resize", handleResizeDebounced);
      clearTimeout(window._resizeTimeout);
    };
  }, []);

  useEffect(() => {
    let prevScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 0) {
        setMenuDisplay(true);
      } else if (currentScrollY > prevScrollY) {
        setMenuDisplay(false);
      }
      prevScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // detect scroll postion on app to toggle scroll arrow visibility
  useEffect(() => {
    let prevScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 200) {
        setScrollArrow(false);
      } else if (currentScrollY > prevScrollY) {
        setScrollArrow(true);
      }
      prevScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [, scrollArrow]);

  return (
    <>
      {appLoader ? (
        <div
          style={{
            fontFamily: "OpenSansLight",
          }}
        >
          {menuDisplay && (
            <section className="menu animate__animated animate__slideInDown">
              <Menu />
            </section>
          )}
          <section className="main">
            <main>{children}</main>
          </section>
          {footerDisplay && (
            <section className="footer">
              <Footer />
            </section>
          )}
          {scrollArrow && (
            <div
              className="scrollArrow"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                })
              }
            >
              <Image
                layout="fill"
                objectFit="contain"
                src={arrowUp}
                alt="arrow"
                as="image"
                priority
              />
            </div>
          )}
        </div>
      ) : (
        <div className="appload">
          <div className="typewrite">
            <div className="border"></div>
            <Typewriter
              text="INSPIRATION"
              font="OpenSansSemiBold"
              size={false}
            />
            <Typewriter text="DESIGN" font="OpenSansLight" size={true} />
          </div>
        </div>
      )}
    </>
  );
}
