import React from "react";
import ParallaxBanner from "react-scroll-parallax";

const Collage = React.memo(({ image, alt = "Коллаж" }) => {
  return (
    <ParallaxBanner
      className={`min-h-screen`}
      alt={alt}
      fluid={image}
      layers={[
        {
          image: image.src,
          amount: 0.4,
        },
      ]}
    ></ParallaxBanner>
  );
});

Collage.displayName = "Collage";

export default Collage;
