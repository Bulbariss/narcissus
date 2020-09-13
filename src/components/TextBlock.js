import React from "react";

const TextBlock = ({ heading, name, text, img }) => {
  return (
    <section className="py-24 px-4 sm:px-0 max-w-text mx-auto">
      <p className="H1 pb-6">{heading}</p>
      <div className="flex flex-row items-center pb-8 justify-between">
        <div className="flex items-center">
          <img src={img} alt="" className="rounded-full w-12" />
          <p className="pl-4 text-xl text-gray-500 font-medium">{name}</p>
        </div>
        <div className="flex items-center">
          <a href="/">
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
              className="feather feather-twitter "
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
          <a href="/">
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
              className="feather feather-twitter ml-4"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
        </div>
      </div>
      <p className="P m-0 max-w-full whitespace-pre-wrap text-lg">{text}</p>
    </section>
  );
};

export default TextBlock;
