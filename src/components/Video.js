import React, { useEffect, useState, forwardRef } from "react";
import ReactPlayer from "react-player";
// import Img from "../images/hero.jpg";
import { isMobile } from "react-device-detect";
import Img from "../images/col.jpg";

const Video = forwardRef(({ playing, isLandscape }, ref) => {
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setInView(playing === true ? true : false);
  }, [playing]);
  return (
    <div ref={ref} className="relative w-screen h-full">
      <ReactPlayer
        className={`${isLandscape ? "absolute" : ""} react-player`}
        id="react-player"
        onReady={() => setReady(true)}
        playing={inView && ready}
        url="https://www.plvs.ru/videos/main.mp4"
        width={"100%"}
        height={isLandscape ? "100vh" : "100%"}
        playsinline
      />
      {isLandscape && (
        <img
          src={Img}
          alt="test"
          className="absolute w-screen h-full opacity-25"
        />
      )}
      {isMobile && (
        <button
          className="absolute top-0 w-full h-full bg-cover"
          //   style={{ backgroundImage: `url(${Img})` }}
          id="playButton"
          onClick={() => {
            document.getElementsByTagName("video")[0].play();
            document.getElementById("playButton").classList.add("hidden");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ top: "50%" }}
            className="w-10 h-10 m-auto feather feather-play"
          >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>
      )}
    </div>
  );
});
Video.displayName = "Video";

export default Video;
