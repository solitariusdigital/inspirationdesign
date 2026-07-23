/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import secureLocalStorage from "react-secure-storage";
import Typewriter from "@/components/Typewriter";

export default function RootLayout({ children }) {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { menuDisplay, setMenuDisplay } = useContext(StateContext);
  const { footerDisplay, setFooterDisplay } = useContext(StateContext);
  const { menuMobile, setMenuMobile } = useContext(StateContext);
  const { menuBackground, setMenuBackground } = useContext(StateContext);
  const [appLoader, setAppLoader] = useState(false);
  const [moveLogo, setMoveLogo] = useState(false);

  const router = useRouter();
  let pathname = router.pathname;

  const isHome = pathname === "/";

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
      secureLocalStorage.getItem("currentUser"),
    );
    if (localCurrentUser) {
      setCurrentUser(localCurrentUser);
    }
    setTimeout(() => {
      setAppLoader(true);
    }, 3500);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMoveLogo(true);
    }, 100);
    return () => clearTimeout(timer);
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
      if (menuMobile) return;
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 0) {
        setMenuDisplay(true);
        setMenuBackground("transparent");
      } else if (currentScrollY > prevScrollY) {
        setMenuDisplay(false);
      } else if (currentScrollY < prevScrollY) {
        setMenuDisplay(true);
        setMenuBackground(isHome ? "#23282b" : "#ffffff");
      }
      prevScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuMobile, isHome]);

  return (
    <>
      {appLoader ? (
        <div
          style={{
            fontFamily: "RobotoLight",
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
        </div>
      ) : (
        <div className="appload">
          <div className={`typewrite ${moveLogo ? "moveLogo" : ""}`}>
            <Typewriter
              text="INSPIRATION"
              font="RobotoMedium"
              speed={150}
              margin={false}
            />
            <Typewriter
              text="DESIGN"
              font="RobotoLight"
              speed={300}
              margin={true}
            />
          </div>
        </div>
      )}
    </>
  );
}
