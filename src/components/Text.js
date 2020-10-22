import React from "react";

const TextBlock = ({ text, image }) => {
  return (
    <section
      className="w-full px-4 py-16 bg-cover md:px-0"
      style={{ backgroundImage: `url(${image})` }}
    >
      <p className="max-w-full m-0 mx-auto text-lg text-justify whitespace-pre-wrap P max-w-text">
        {text}
      </p>
    </section>
  );
};

export default TextBlock;
