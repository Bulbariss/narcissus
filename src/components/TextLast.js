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
      <div className="top-0 z-10 flex flex-col w-screen h-auto pt-20">
        <div
          className="flex justify-around w-full max-w-80"
          style={{ color: "#cf0" }}
        >
          <p>© 2020</p>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://facebook.com/koshka.neon"
          >
            FACEBOOK
          </a>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://vimeo.com/koshkaneon"
          >
            VIMEO
          </a>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.instagram.com/koshka.neon"
          >
            INSTAGRAM
          </a>
        </div>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.koshkaneon.com/"
          className="pt-6 text-4xl text-center bbb"
        >
          Koshka Neon
        </a>
      </div>
    </BackgroundImage>
  );
};

export default TextLast;
