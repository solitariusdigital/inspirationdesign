import { useState, useContext, Fragment } from "react";
import { NextSeo } from "next-seo";
import classes from "./contact.module.scss";
import logoBlack from "@/assets/logo-black.png";

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
          siteName: "Design Firm",
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
          <h3>Let's work together</h3>
          <p
            style={{
              fontFamily: "EnglishExtraLight",
            }}
          >
            We welcome inquiries from new and existing clients, job seekers, and
            anyone who wants to connect. If you have a unique project in mind,
            please don't hesitate to contact us. We're eager to hear from you.
          </p>
        </div>
        <div
          className={classes.contact}
          style={{
            fontFamily: "EnglishLight",
          }}
        >
          <div className={classes.contactBox}>
            <div>
              <h4>Contact us</h4>
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
              <h4>Reach us</h4>
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
      </div>
    </>
  );
}
