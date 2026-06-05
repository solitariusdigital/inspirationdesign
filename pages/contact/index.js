import { useEffect, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import classes from "./contact.module.scss";
import logoBlack from "@/assets/logo-black.png";
import ContactForm from "@/components/Form/ContactForm";
import FirebaseImage from "@/components/FirebaseImage";

export default function Contact() {
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const headLocationLink = "https://maps.app.goo.gl/PL91GoWmYGTzhMqt6";
  const router = useRouter();
  let pathname = router.pathname;

  useEffect(() => {
    navigationTopBar.map((nav) => {
      if (pathname === nav.link) {
        nav.active = true;
      }
    });
    setNavigationTopBar([...navigationTopBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <div className={classes.text}>
          <h1
            style={{
              fontFamily: "OpenSansRegular",
            }}
          >
            Let's Design Together
          </h1>
          <h3>
            We welcome inquiries from new and existing clients and anyone who
            wants to connect. If you have a unique project in mind, please don't
            hesitate to contact us. We're eager to design your next home or
            space.
          </h3>
        </div>
        <div className={classes.imageBox}>
          <FirebaseImage path="Resources/Contact.jpg" alt="contact" />
        </div>
        <div className={classes.contact}>
          <div className={classes.contactBox}>
            <div>
              <h2
                style={{
                  fontFamily: "OpenSansRegular",
                  marginBottom: "8px",
                }}
              >
                Contact us
              </h2>
              <h4
                className={classes.phone}
                onClick={() => window.open(`tel:+16049710270`, "_self")}
              >
                T 604 971 0270
              </h4>
              <h4
                className={classes.phone}
                onClick={() => window.open(`tel:+16043659191`, "_self")}
              >
                C 604 365 9191
              </h4>
              <h4>info@inspirationdesigns.ca</h4>
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "OpenSansRegular",
                  marginBottom: "8px",
                }}
              >
                Reach us
              </h2>
              <h4>
                Harbourfront Business Centre, 500 – 224 West Esplanade North
                Vancouver V7M 1A4
              </h4>
              <p
                className={classes.direction}
                onClick={() => window.open(headLocationLink)}
              >
                Get directions
              </p>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </>
  );
}
