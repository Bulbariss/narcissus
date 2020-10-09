import React from "react";
import ParallaxBanner from "./ParallaxBanner.js";

// eslint-disable-next-line no-unused-vars
const Collage = React.memo(
  ({ isLandscape, imageH, imageL, alt = "Коллаж" }) => {
    return (
      <ParallaxBanner
        className={`min-h-screen`}
        alt={alt}
        fluid={isLandscape ? imageL : imageH}
        layers={[
          {
            image: "",
            amount: 0.5,
          },
        ]}
      ></ParallaxBanner>
    );
  }
);

Collage.displayName = "Collage";

export default Collage;
