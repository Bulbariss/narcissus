import React from "react";
import BackgroundImage from "gatsby-background-image";

const TextBlock = ({ heading, name, text, img, image }) => {
  return (
    <BackgroundImage
      className="relative bg-cover"
      Tag="section"
      alt="Обложка"
      fluid={image}
      fadeIn="soft"
      durationFadeIn={300}
    >
      <div className="px-4 py-16 mx-auto md:px-0 max-w-text">
        <p className="pb-6 H1 bbb">{heading}</p>
        <div className="flex flex-row items-center justify-between pb-8">
          <div className="flex items-center">
            <img src={img} alt="" className="w-12 h-12 rounded-full" />
            <p className="pl-4 text-xl font-bold text-gray-400">{name}</p>
          </div>
          <div className="flex items-center">
            <a
              href="https://www.facebook.com/medvedzeva"
              rel="noreferrer"
              target="_blank"
              aria-label="Фейсбук"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-4 stroke-current feather feather-twitter text-acid"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>
        <p className="max-w-full m-0 text-lg text-justify whitespace-pre-wrap P">
          {text}
        </p>
      </div>
    </BackgroundImage>
  );
};

export default TextBlock;
