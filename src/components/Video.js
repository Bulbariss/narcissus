import React, { useEffect, useState, forwardRef } from "react";
import ReactPlayer from "react-player";
import Img from "../images/hero.jpg";
import { isMobile } from "react-device-detect";

const Video = forwardRef(({ playing }, ref) => {
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setInView(playing === true ? true : false);
  }, [playing]);
  return (
    <div ref={ref} className="relative">
      <ReactPlayer
        className="react-player"
        id="react-player"
        onReady={() => setReady(true)}
        playing={inView && ready}
        url="https://www.plvs.ru/videos/pilaeva.mp4"
        width={"100%"}
        height={"auto"}
        playsinline
      />
      {isMobile && (
        <button
          className="absolute top-0 w-full h-full bg-cover"
          style={{ backgroundImage: `url(${Img})` }}
          id="playButton"
          onClick={() => {
            document.getElementsByTagName("video")[0].play();
            document.getElementById("playButton").classList.add("hidden");
          }}
        />
      )}
    </div>
  );
});
Video.displayName = "Video";

export default Video;
