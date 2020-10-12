import React, { useEffect, useState, forwardRef } from "react";
import ReactPlayer from "react-player";
// import { isMobile } from "react-device-detect";
import Vid from "../images/main.mp4";
import Img from "../images/col.jpg";
import Cover from "../images/cover.jpg";

const Video = forwardRef(({ playing, isLandscape }, ref) => {
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setInView(playing === true ? true : false);
  }, [playing]);
  return (
    <div
      ref={ref}
      style={{ backgroundImage: `url(${Img})` }}
      className={`relative w-screen`}
    >
      <ReactPlayer
        className={"react-player"}
        id="react-player"
        onReady={() => setReady(true)}
        playing={inView && ready}
        url={Vid}
        width={"auto"}
        height={!isLandscape ? "auto" : "100vh"}
        playsinline
        autoplay={false}
        style={{ margin: "auto" }}
      />

      <div
        id="cover"
        className="absolute top-0 w-full h-full bg-cover"
        style={{ backgroundImage: `url(${Cover})` }}
      >
        <button
          className="absolute top-0 w-full h-full bg-cover"
          id="playButton"
          onClick={() => {
            document.getElementsByTagName("video")[0].play();
            document.getElementById("playButton").classList.add("hidden");
            document.getElementById("cover").classList.add("hidden");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#cf0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ top: "50%" }}
            className="w-12 h-12 m-auto feather feather-play"
          >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
});
Video.displayName = "Video";

export default Video;
