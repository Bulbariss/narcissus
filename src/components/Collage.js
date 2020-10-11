import React from "react";
import ParallaxBanner from "react-scroll-parallax";

const Collage = React.memo(({ image, alt = "Коллаж" }) => {
  return (
    <div className="flex items-center w-full h-full">
      <ParallaxBanner
        className={`min-h-screen`}
        alt={alt}
        style={{
          height: "100vh",
        }}
        fluid={image}
        layers={[
          {
            image: image.src,
            amount: 0.4,
          },
        ]}
     />
    </div>
  );
});

Collage.displayName = "Collage";

export default Collage;
