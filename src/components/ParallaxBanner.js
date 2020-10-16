import React from "react";

const ParallaxBanner = ({ image }) => {
  return (
    <div className="relative flex items-center justify-center w-screen h-screen parallax">
      <div
        className="absolute top-0 left-0 w-full h-full bg-center bg-no-repeat bg-cover parallax-bg"
        style={{ backgroundImage: `url(${image})` }}
      />
    </div>
  );
};

export default ParallaxBanner;
