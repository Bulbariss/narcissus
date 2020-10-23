import React from "react";
import BackgroundImage from "gatsby-background-image";

const TextLast = ({ text, image }) => {
  return (
    <BackgroundImage
      className="w-full pt-16 pb-6 bg-cover "
      Tag="section"
      alt="Обложка"
      fluid={image}
      fadeIn="soft"
      durationFadeIn={300}
    >
      <p className="max-w-full px-4 m-0 mx-auto text-lg text-justify whitespace-pre-wrap md:px-0 P max-w-text">
        {text}
      </p>
      <div className="top-0 z-10 w-screen h-auto pt-20">
        <div className="flex justify-around max-w-80" style={{ color: "#cf0" }}>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.vogue.ru/lifestyle/nasilie-eto-ne-pro-lyubov-chto-posmotret-i-prochest-ob-abyuze"
          >
            © 2020 Koshka Neon
          </a>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://srsly.ru/article/show/4481/"
          >
            SRSLY
          </a>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://flacon-magazine.com/rubric/people/sabrina-bagirova-diskomfort-cast-moej-zizni"
          >
            FLACON
          </a>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.buro247.ru/culture/music/30-sep-2020-sabrina-interview.html"
          >
            BURO24/7
          </a>
        </div>
        <p className="py-6 text-4xl text-center bbb">Koshka Neon</p>
      </div>
    </BackgroundImage>
  );
};

export default TextLast;
