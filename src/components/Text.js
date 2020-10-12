import React from "react";

const TextBlock = ({ text }) => {
  return (
    <section className="px-4 py-24 mx-auto md:px-0 max-w-text">
      <p className="max-w-full m-0 text-lg text-justify whitespace-pre-wrap P">
        {text}
      </p>
    </section>
  );
};

export default TextBlock;
