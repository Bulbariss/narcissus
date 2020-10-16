import React from "react";

const ParallaxBanner = ({ image }) => {
  return (
    <div className="relative flex items-center justify-center w-screen h-screen parallax">
      <div
        className="w-screen h-screen bg-center bg-no-repeat bg-cover parallax-bg"
        style={{ backgroundImage: `url(${image})` }}
      />
    </div>
  );
};

export default ParallaxBanner;
