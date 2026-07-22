import { useEffect, useRef } from "react";
import classes from "./GallerySlider.module.scss";
import FirebaseImage from "./FirebaseImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function GallerySlider({ media, startIndex }) {
  const swiperRef = useRef(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <div className={classes.slider}>
      <div className={classes.swiper}>
        <div className="custom-prev" ref={navigationPrevRef}>
          <ArrowBackIosNewIcon sx={{ fontSize: 20 }} />
        </div>
        <div className="custom-next" ref={navigationNextRef}>
          <ArrowForwardIosIcon sx={{ fontSize: 20 }} />
        </div>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          initialSlide={startIndex}
          slidesPerView="auto"
          spaceBetween={0}
          mousewheel={true}
          loop={false}
          modules={[Navigation, Mousewheel]}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
          }}
        >
          {media.map((image, index) => (
            <SwiperSlide key={index}>
              <div className={classes.image}>
                <FirebaseImage path={image} alt="image" objectFit="contain" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
