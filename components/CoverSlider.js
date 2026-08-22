import { useState, useContext, useRef } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./CoverSlider.module.scss";
import Link from "next/link";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import FirebaseImage from "@/components/FirebaseImage";

export default function CoverSlider() {
  const { projectsCategory, setProjectsCategory } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [isMuted, setIsMuted] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const fullSizeScreen =
    screenSize === "desktop" || screenSize === "tablet-landscape";

  const videoFiles = fullSizeScreen
    ? "https://firebasestorage.googleapis.com/v0/b/inspirationdesign-a9691.firebasestorage.app/o/Resources%2FVideos%2Fdesktop.mp4?alt=media&token=60130489-1f6a-4d76-82ac-2f7102e13430"
    : "https://firebasestorage.googleapis.com/v0/b/inspirationdesign-a9691.firebasestorage.app/o/Resources%2FVideos%2Fmobile.mp4?alt=media&token=3994a5bd-3069-4151-9c86-4e67888fce56";

  const posterImage = fullSizeScreen
    ? "https://firebasestorage.googleapis.com/v0/b/inspirationdesign-a9691.firebasestorage.app/o/Resources%2FVideos%2FposterDesktop.webp?alt=media&token=5c68a83e-d95b-4d44-86b6-196e5f708b84"
    : "https://firebasestorage.googleapis.com/v0/b/inspirationdesign-a9691.firebasestorage.app/o/Resources%2FVideos%2FposterMobile.webp?alt=media&token=19e4ab66-733d-4a6e-a1bf-9192620987bf";

  const coverMedia = [
    {
      path: videoFiles,
      type: "video",
    },
    {
      path: "Resources/Cover/chinatown.jpg",
      type: "image",
    },
    {
      path: "Resources/Cover/orchard.jpg",
      type: "image",
    },
    {
      path: fullSizeScreen
        ? "Resources/Cover/lowry.jpg"
        : "Resources/Cover/lowry-mobile.jpg",
      type: "image",
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
      <div className="custom-prev" ref={navigationPrevRef}>
        <ArrowBackIosNewIcon sx={{ fontSize: 20 }} />
      </div>
      <div className="custom-next" ref={navigationNextRef}>
        <ArrowForwardIosIcon sx={{ fontSize: 20 }} />
      </div>
      <Swiper
        spaceBetween={0}
        loop={true}
        modules={[Navigation]}
        onSlideChange={handleSlideChange}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
      >
        {coverMedia.map((item, index) => (
          <SwiperSlide key={index}>
            <div className={classes.media}>
              {item.type === "image" ? (
                <div className={classes.imageBox}>
                  <FirebaseImage path={item.path} alt="image" />
                </div>
              ) : (
                <video
                  className={classes.video}
                  src={item.path}
                  poster={posterImage}
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
                <h4>{service.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="fadeOverlayBottom"></div>
    </div>
  );
}
