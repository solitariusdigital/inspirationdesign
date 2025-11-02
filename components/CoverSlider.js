import { useState, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./CoverSlider.module.scss";
import Image from "next/legacy/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default function CoverSlider({ covers }) {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [current, setCurrent] = useState(0);

  const updateIndex = (swiperInstance) => {
    if (swiperInstance === null) return;
    const currentSlide = swiperInstance?.realIndex;
    setCurrent(currentSlide);
  };

  return (
    <div className={classes.slider}>
      <Swiper
        spaceBetween={0}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        modules={[Navigation, Autoplay, EffectFade]}
        onSlideChange={updateIndex}
      >
        {covers
          // .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .map((project, index) => (
            <SwiperSlide key={index}>
              <div
                className={classes.media}
                // onClick={() => Router.push(project.link)}
              >
                {project.type === "image" ? (
                  <Image
                    src={project.link}
                    blurDataURL={project.link}
                    placeholder="blur"
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    as="image"
                    priority
                  />
                ) : (
                  <video
                    className={classes.video}
                    src={project.link + "#t=0.1"}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className={classes.information}>
        {screenSize !== "mobile" && <h4>{covers[current].title}</h4>}
      </div>
    </div>
  );
}
