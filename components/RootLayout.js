/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import Image from "next/legacy/image";
import logoWhite from "@/assets/logo-white.png";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { menuDisplay, setMenuDisplay } = useContext(StateContext);
  const [appLoader, setAppLoader] = useState(false);

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
    setTimeout(() => {
      setAppLoader(true);
    }, 1200);
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

  return (
    <>
      {appLoader ? (
        <div
          style={{
            fontFamily: "EnglishLight",
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
          <section className="footer">
            <Footer />
          </section>
        </div>
      ) : (
        <div className="appload animate__animated animate__pulse">
          {logoWhite && (
            <div className="logo ">
              <Image
                src={logoWhite}
                layout="fill"
                objectFit="contain"
                alt="logo"
                as="image"
                priority
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
