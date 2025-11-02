import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  const { screenSize, setScreenSize } = useContext(StateContext);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        fontFamily: "English",
      }}
    >
      <section className="menu">
        <Menu />
      </section>
      <section className="main">
        <main>{children}</main>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
}
