import React from "react";

const ParallaxBanner = ({ image }) => {
  return (
    <div
      className="relative flex items-center justify-center w-screen h-screen parallax"
      style={{ zIndex: "-1", transform: "translateZ(0)" }}
    >
      <div className="relative top-0 left-0 w-full h-full parallax-bg"></div>
      <style jsx>{`
        .parallax-bg:after {
          content: "";
          position: absolute; /* stretch a fixed position to the whole screen */
          top: 0;
          height: 100vh; /* fix for mobile browser address bar appearing disappearing */
          left: 0;
          right: 0;
          background-image: url(${image});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
           {
            /* background-position: 50%; */
          }
          transform: translateZ(0);
        }
      `}</style>
    </div>
  );
};

export default ParallaxBanner;
