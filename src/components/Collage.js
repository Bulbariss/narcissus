import React from "react";
import { ParallaxBanner } from "react-scroll-parallax";

const Collage = React.memo(({ image }) => {
  return (
    <div className="flex items-center w-full h-full">
      <ParallaxBanner
        style={{
          height: "100vh",
        }}
        layers={[
          {
            image: `${image.src}`,
            amount: 0.4,
          },
        ]}
      />
    </div>
  );
});

Collage.displayName = "Collage";

export default Collage;
