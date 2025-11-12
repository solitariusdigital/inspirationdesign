import { useState } from "react";
import classes from "./CoverSlider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import FirebaseImage from "@/components/FirebaseImage";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default function CoverSlider() {
  const [current, setCurrent] = useState(0);

  const covers = [
    {
      path: "Resources/1.jpg",
      title: "Chinatown Millennium Gate",
      type: "image",
    },
    {
      path: "Resources/2.jpg",
      title: "Chinatown Millennium Gate",
      type: "image",
    },
    {
      path: "Resources/3.jpg",
      title: "Chinatown Millennium Gate",
      type: "image",
    },
    {
      path: "Resources/4.jpg",
      title: "Chinatown Millennium Gate",
      type: "image",
    },
  ];

  const updateIndex = (swiperInstance) => {
    if (swiperInstance === null) return;
    const currentSlide = swiperInstance?.realIndex;
    setCurrent(currentSlide);
  };

  return (
    <div className={classes.slider}>
      <Swiper
        spaceBetween={0}
        navigation={false}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        effect="fade"
        modules={[Navigation, Autoplay, EffectFade]}
        onSlideChange={updateIndex}
      >
        {covers.map((project, index) => (
          <SwiperSlide key={index}>
            <div className={classes.image}>
              <FirebaseImage path={project.path} alt={project.title} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={classes.information}>
        <h4>{covers[current].title}</h4>
      </div>
    </div>
  );
}
