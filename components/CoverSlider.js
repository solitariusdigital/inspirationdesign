import { useState, useEffect, useContext, useRef } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./CoverSlider.module.scss";
import Link from "next/link";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import Router from "next/router";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/services/firebase";
import FirebaseImage from "@/components/FirebaseImage";

export default function CoverSlider() {
  const { projectsCategory, setProjectsCategory } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [videoFiles, setVideoFiles] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  const fullSizeScreen =
    screenSize === "desktop" || screenSize === "tablet-landscape";

  const coverMedia = [
    {
      path: videoFiles?.url,
      type: "video",
      // link: "work/Chinatown-Millennium-Gate",
    },
    {
      path: "Resources/Cover/chinatown.jpg",
      type: "image",
      link: "work/Chinatown-Millennium-Gate",
    },
    {
      path: "Resources/Cover/orchard.jpg",
      type: "image",
      link: "work/Orchard-Residence",
    },
    {
      path: "Resources/Cover/lowry.jpg",
      type: "image",
      link: "work/Lowry-Residence",
    },
  ];
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
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };
  // For swiper slide change — always force mute, never toggle
  const handleSlideChange = (swiper) => {
    const activeIndex = swiper.realIndex;
    setActiveIndex(activeIndex);
    const activeItem = coverMedia[activeIndex];
    if (!videoRef.current) return;
    if (activeIndex === 0 && activeItem?.type === "video") {
      // Back on the video slide — resume, muted
      videoRef.current.muted = true;
      setIsMuted(true);
      videoRef.current.play().catch(() => {});
    } else {
      // Any other slide — pause in the background
      videoRef.current.pause();
    }
  };

  return (
    <div className={classes.container}>
      <Swiper
        spaceBetween={0}
        navigation={true}
        loop={true}
        modules={[Navigation]}
        onSlideChange={handleSlideChange}
      >
        {coverMedia.map((item, index) => (
          <SwiperSlide key={index}>
            <div className={classes.media}>
              {item.type === "image" ? (
                <div onClick={() => Router.push(item.link)}>
                  <FirebaseImage path={item.path} alt="image" />
                </div>
              ) : (
                <video
                  className={classes.video}
                  src={item.path}
                  muted={isMuted}
                  onClick={handleVideoClick}
                  ref={videoRef}
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {activeIndex === 0 && (
        <div className={classes.control} onClick={handleVideoClick}>
          {isMuted ? (
            <MusicOffIcon className="icon" sx={{ fontSize: 16 }} />
          ) : (
            <AudiotrackIcon className="icon" sx={{ fontSize: 16 }} />
          )}
        </div>
      )}
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
                    fontFamily: "RobotoRegular",
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
                    fontFamily: "RobotoRegular",
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
