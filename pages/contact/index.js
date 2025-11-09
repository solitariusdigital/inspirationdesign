import { NextSeo } from "next-seo";
import classes from "./contact.module.scss";
import logoBlack from "@/assets/logo-black.png";
import ContactForm from "@/components/Form/ContactForm";

export default function Contact() {
  const headLocationLink = "https://maps.app.goo.gl/PL91GoWmYGTzhMqt6";

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
          <h3
            style={{
              fontFamily: "English",
            }}
          >
            Let's Design Together
          </h3>
          <p>
            We welcome inquiries from new and existing clients and anyone who
            wants to design. If you have a unique project in mind, please don't
            hesitate to contact us. We're eager to design your next home or
            space.
          </p>
        </div>
        <div className={classes.contact}>
          <div className={classes.contactBox}>
            <div>
              <h4
                style={{
                  fontFamily: "English",
                }}
              >
                Contact us
              </h4>
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
              <h4
                style={{
                  fontFamily: "English",
                }}
              >
                Reach us
              </h4>
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
        <ContactForm />
      </div>
    </>
  );
}
