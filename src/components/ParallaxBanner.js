import React, { memo } from "react";

const ParallaxBanner = memo(({ image, isLandscape }) => {
  return (
    <div
      className="relative w-screen parallax"
      style={{
        transform: "translateZ(0)",
        zIndex: "-1",
      }}
    >
      <img
        src={image}
        alt="u"
        className={`${
          !isLandscape ? "w-auto h-auto" : "w-auto h-auto"
        }  top-0 left-0  bg-center bg-no-repeat bg-cover parallax-bg `}
        style={{
          backfaceVisibility: "hidden",
          perspective: "1000",
          willChange: "transform",
        }}
      />
      {/* <div
        className="absolute top-0 left-0 w-full h-full bg-center bg-no-repeat bg-cover parallax-bg "
        style={{
          backgroundImage: `url(${image})`,
          backfaceVisibility: "hidden",
          perspective: "1000",
          willChange: "transform",
        }}
      /> */}
    </div>
  );
});

ParallaxBanner.displayName = "ParallaxBanner";

export default ParallaxBanner;
