import classes from "./GallerySlider.module.scss";
import FirebaseImage from "./FirebaseImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function GallerySlider({ media }) {
  return (
    <div className={classes.slider}>
      <div className={classes.swiper}>
        <Swiper
          slidesPerView="auto"
          spaceBetween={0}
          navigation={true}
          mousewheel={true}
          loop={true}
          modules={[Navigation, Mousewheel]}
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
