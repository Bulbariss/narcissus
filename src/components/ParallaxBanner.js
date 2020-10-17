import React, { memo } from "react";

const ParallaxBanner = memo(({ image, height }) => {
  return (
    <div
      className="relative w-screen parallax"
      style={{
        height: height,
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-center bg-no-repeat bg-cover parallax-bg"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
    </div>
  );
});

ParallaxBanner.displayName = "ParallaxBanner";

export default ParallaxBanner;
