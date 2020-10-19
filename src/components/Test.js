import React from "react";

const Test = ({ image, entry, entry2 }) => {
  console.log(image);
  return (
    <div>
      {entry.intersectionRatio} {entry2.intersectionRatio}
    </div>
  );
};

export default Test;
