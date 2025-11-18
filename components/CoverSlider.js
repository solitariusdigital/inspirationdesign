import { useState, useEffect } from "react";
import classes from "./CoverSlider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "@/services/firebase";

export default function CoverSlider() {
  const [videoFiles, setVideoFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const listRef = ref(storage, "Resources/Videos");
      const res = await listAll(listRef);
      const fetchedFiles = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url };
        })
      );
      setVideoFiles(fetchedFiles);
    };
    fetchFiles();
  }, []);

  return (
    <div className={classes.slider}>
      {/* <Swiper
        spaceBetween={0}
        navigation={true}
        loop={true}
        modules={[Navigation]}
      >
        {videoFiles.map((video, index) => (
          <SwiperSlide key={index}>
            <video
              className={classes.video}
              src={video.url}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={classes.information}>
        <h4>Chinatown Millennium Gate</h4>
      </div> */}
    </div>
  );
}
