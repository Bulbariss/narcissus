import React from "react";
import ParallaxBanner from "./ParallaxBanner.js";

const Collage = React.memo(({ image, alt = "Коллаж" }) => {
  return (
    <ParallaxBanner
      className={`min-h-screen`}
      alt={alt}
      fluid={image}
      layers={[
        {
          image: "",
          amount: 0.5,
        },
      ]}
    ></ParallaxBanner>
  );
});

Collage.displayName = "Collage";

export default Collage;
