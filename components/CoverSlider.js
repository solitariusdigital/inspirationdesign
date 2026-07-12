import { useState, useEffect, useContext, useRef } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./CoverSlider.module.scss";
import Link from "next/link";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "@/services/firebase";

export default function CoverSlider() {
  const { projectsCategory, setProjectsCategory } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [videoFiles, setVideoFiles] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  const fullSizeScreen =
    screenSize === "desktop" || screenSize === "tablet-landscape";

  // useEffect(() => {
  //   const fetchFiles = async () => {
  //     const listRef = ref(storage, "Resources/Videos");
  //     const res = await listAll(listRef);
  //     const fetchedFiles = await Promise.all(
  //       res.items.map(async (itemRef) => {
  //         const url = await getDownloadURL(itemRef);
  //         return { name: itemRef.name, url };
  //       }),
  //     );
  //     setVideoFiles(fetchedFiles);
  //   };
  //   fetchFiles();
  // }, []);

  useEffect(() => {
    const fetchVideo = async () => {
      let sourceRef = fullSizeScreen
        ? "Resources/Videos/desktop.mov"
        : "Resources/Videos/mobile.mov";
      const videoRef = ref(storage, sourceRef);
      const url = await getDownloadURL(videoRef);
      setVideoFiles({
        url,
      });
    };
    fetchVideo();
  }, [fullSizeScreen]);

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
      title: "Healthy House Design & Construction",
      type: "construction",
    },
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
      title: "Healthy House Design & Construction",
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
      title: "Interior Lighting Design ",
      type: "lighting",
    },
    {
      title: "Exterior Lighting Design ",
      type: "lighting",
    },
    {
      title: "Construction Consultation",
      type: "construction",
    },
    {
      title: "Lightweight Steel Framing",
      type: "construction",
    },
    {
      title: "Mold-Free House Design",
      type: "construction",
    },
    {
      title: "Fire-Resistant House Design",
      type: "construction",
    },
  ];

  return (
    <div className={classes.container}>
      <video
        className={classes.video}
        src={videoFiles?.url}
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
          <MusicOffIcon className="icon" sx={{ fontSize: 16 }} />
        ) : (
          <AudiotrackIcon className="icon" sx={{ fontSize: 16 }} />
        )}
      </div>
      <div className={classes.sliderBox}>
        <div className={classes.sliderInfoTop}>
          <div className={classes.slideTrackTop}>
            {servicesTop.concat(servicesTop).map((service, index) => (
              <Link
                className={classes.item}
                key={index}
                onClick={() => {
                  setProjectsCategory(service.type);
                }}
                href="/work"
                passHref
              >
                <h3
                  style={{
                    fontFamily: "RobotoMedium",
                  }}
                >
                  {service.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
        <div className={classes.sliderInfoBottom}>
          <div className={classes.slideTrackBottom}>
            {servicesBottom.concat(servicesBottom).map((service, index) => (
              <Link
                className={classes.item}
                key={index}
                onClick={() => {
                  setProjectsCategory(service.type);
                }}
                href="/work"
                passHref
              >
                <h4
                  style={{
                    fontFamily: "RobotoMedium",
                  }}
                >
                  {service.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="fadeOverlayBottom"></div>
    </div>
  );
}
