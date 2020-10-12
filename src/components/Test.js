import React from "react";
import BackgroundImage from "gatsby-background-image";

const ParallaxBanner = ({ image }) => {
  return (
    <div className="relative flex items-center justify-center h-screen parallax">
      <BackgroundImage
        className="absolute top-0 left-0 w-full h-full bg-fixed bg-center bg-no-repeat bg-cover bg"
        loading="eager"
        Tag="div"
        alt="Обложка"
        fluid={image}
        fadeIn="soft"
      />
    </div>
  );
};

export default ParallaxBanner;
