import { useEffect, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import { NextSeo } from "next-seo";
import classes from "./contact.module.scss";
import logoBlack from "@/assets/logo-black.png";
import ContactForm from "@/components/Form/ContactForm";
import FirebaseImage from "@/components/FirebaseImage";

export default function Contact() {
  const { projectsCategory, setProjectsCategory } = useContext(StateContext);

  useEffect(() => {
    setProjectsCategory("residential");
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
          <h2
            style={{
              fontFamily: "RobotoRegular",
            }}
          >
            Let's Design Together
          </h2>
        </div>
        <div className={classes.contact}>
          <div className={classes.imageBox}>
            <FirebaseImage path="Resources/Contact.jpg" alt="contact" />
          </div>
          <div className={classes.overlay}>
            <div className={classes.row}>
              <div className={classes.item}>
                <h2
                  style={{
                    fontFamily: "RobotoRegular",
                    marginBottom: "8px",
                  }}
                >
                  Phone
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
              </div>
              <div className={classes.item}>
                <h2
                  style={{
                    fontFamily: "RobotoRegular",
                    marginBottom: "8px",
                  }}
                >
                  Email
                </h2>
                <h4>info@inspirationdesigns.ca</h4>
              </div>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </>
  );
}
