import React, { useState, forwardRef, useEffect } from "react";
import ReactPlayer from "react-player";
import Vid from "../images/main.mp4";
import Img from "../images/col.jpg";
import Cover from "../images/cover.jpg";
import { useEventListener, useDebounceFn } from "ahooks";

const Video = forwardRef(({ playing }, ref) => {
  const [ready, setReady] = useState(false);
  const [play, setPlay] = useState(false);
  const [test, setTest] = useState(false);

  const { run } = useDebounceFn(
    () => {
      onResize();
    },
    {
      wait: 50,
    }
  );

  useEventListener("resize", run);
  function onResize() {
    if (window.innerWidth / window.innerHeight <= 4 / 3) {
      setTest(true);
    }
  }
  useEffect(() => {
    onResize();
  }, []);
  return (
    <div
      ref={ref}
      style={{ backgroundImage: `url(${Img})` }}
      className={`relative w-screen`}
    >
      <ReactPlayer
        id="react-player"
        className={"react-player"}
        onReady={() => setReady(true)}
        playing={playing && ready && play}
        url={Vid}
        width={"auto"}
        height={test ? "auto" : "100vh"}
        playsinline
        autoPlay={false}
        style={{ margin: "auto" }}
      />
      {!play && (
        <div
          className="absolute top-0 w-full h-full bg-cover"
          style={{ backgroundImage: `url(${Cover})` }}
        >
          <button className="absolute center-xy" onClick={() => setPlay(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#cf0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ top: "50%" }}
              className="w-12 h-12 m-auto"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
});
Video.displayName = "Video";

export default Video;
