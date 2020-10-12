import React from "react";

const ParallaxBanner = ({ image }) => {
  return (
    <div className="relative flex items-center justify-center w-screen h-screen parallax">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="absolute top-0 left-0 w-full h-full bg-fixed bg-center bg-no-repeat bg-cover bg"
      ></div>
    </div>
  );
};

export default ParallaxBanner;
