import React from "react";

const ParallaxBanner = ({ image }) => {
  return (
    <div className="relative w-screen h-screen parallax">
      <div
        className="absolute top-0 left-0 w-screen bg-center bg-no-repeat bg-cover parallax-bg"
        style={{
          backgroundImage: `url(${image})`,
          zIndex: "-1",
          height: window.innerHeight,
        }}
      />
    </div>
  );
};

export default ParallaxBanner;
