import { useState, useEffect, useContext, useRef } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./CoverSlider.module.scss";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "@/services/firebase";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";

export default function CoverSlider() {
  const { projectsCategory, setProjectsCategory } = useContext(StateContext);
  const [videoFiles, setVideoFiles] = useState([]);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      const listRef = ref(storage, "Resources/Videos");
      const res = await listAll(listRef);
      const fetchedFiles = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url };
        }),
      );
      setVideoFiles(fetchedFiles);
    };
    fetchFiles();
  }, []);

  const videoRef = useRef(null);
  const handleVideoClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const servicesTop = [
    {
      title: "Building Design",
      type: "residential",
    },
    {
      title: "Interior Design",
      type: "residential",
    },
    {
      title: "Lighting Design",
      type: "lighting",
    },
    {
      title: "Single Family Construction",
      type: "construction",
    },
  ];
  const servicesBottom = [
    {
      title: "Residential",
      type: "residential",
    },
    {
      title: "Commercial",
      type: "commercial",
    },
    {
      title: "Construction Consultation",
      type: "construction",
    },
    {
      title: "Lightweight Steel Framing",
      type: "construction",
    },
  ];

  return (
    <div className={classes.container}>
      <video
        className={classes.video}
        src={videoFiles[0]?.url}
        muted={isMuted}
        onClick={handleVideoClick}
        ref={videoRef}
        autoPlay
        loop
        playsInline
        preload="metadata"
      />
      <div className={classes.control} onClick={handleVideoClick}>
        {isMuted ? (
          <MusicOffIcon
            className="icon"
            sx={{ fontSize: 18, color: "#ffffff" }}
          />
        ) : (
          <AudiotrackIcon
            className="icon"
            sx={{ fontSize: 18, color: "#ffffff" }}
          />
        )}
      </div>
      <div className={classes.sliderInfoTop}>
        <div className={classes.slideTrack}>
          {servicesTop.concat(servicesTop).map((service, index) => (
            <Link
              className={classes.slideItem}
              key={index}
              onClick={() => {
                setProjectsCategory(service.type);
              }}
              href="/work"
              passHref
            >
              <h3>{service.title}</h3>
            </Link>
          ))}
        </div>
      </div>
      <div className={classes.sliderInfoBottom}>
        <div className={classes.slideTrack}>
          {servicesBottom.concat(servicesBottom).map((service, index) => (
            <Link
              className={classes.slideItem}
              key={index}
              onClick={() => {
                setProjectsCategory(service.type);
              }}
              href="/work"
              passHref
            >
              <h3>{service.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
