import React, { memo } from "react";

const ParallaxBanner = memo(({ image, clientHeight, clientHeight2 }) => {
  return (
    <div
      className="relative h-screen"
      style={{
        zIndex: "-1",
        transform: "translateZ(0)",
        height: clientHeight * 2 + "px",
      }}
    >
      <div
        // ref={ref}
        className="absolute w-full h-full bg-center bg-no-repeat bg-cover test"
        style={{
          backgroundImage: `url(${image})`,
          transform: `translateY(${clientHeight2}px)`,
        }}
      />
    </div>
  );
});

ParallaxBanner.displayName = "ParallaxBanner";

export default ParallaxBanner;
