import { useInViewport } from "ahooks";
import React, { useRef, useEffect, useState, memo } from "react";

const IntersectBox = memo(({ image }) => {
  const ref = useRef();
  const ref2 = useRef();
  const windowHeight = useRef();
  let [clientHeight, setClientHeight] = useState();
  // let [clientHeight2, setClientHeight2] = useState();
  const inViewPort = useInViewport(ref);

  // https://stackoverflow.com/questions/20223243/js-get-percentage-of-an-element-in-viewport
  const percentageSeen = () => {
    const distance =
      window.scrollY + windowHeight.current - ref.current.offsetTop;

    let b = distance / (windowHeight.current + ref.current.offsetHeight) - 0.5;

    return Math.min(0.5, Math.max(-0.5, b)) * clientHeight;
  };

  const onScroll = () => {
    ref2.current.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${percentageSeen()}, 0, 1)`;
  };

  const onResize = () => {
    if (clientHeight !== window.outerHeight) {
      setClientHeight(window.outerHeight);
      windowHeight.current = window.innerHeight;
      onScroll();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    if (inViewPort) {
      window.addEventListener("scroll", onScroll, false);
    } else {
      window.removeEventListener("scroll", onScroll, false);
    }
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inViewPort]);

  useEffect(() => {
    onResize();
  }, []);
  return (
    <div
      className="relative h-screen parallax-container"
      ref={ref}
      style={{ height: clientHeight + "px" }}
    >
      <div
        ref={ref2}
        className="absolute w-full h-full bg-center bg-no-repeat bg-cover parallax"
        // style={
        //   {
        //     // transform: `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${clientHeight2}, 0, 1)`,
        //   }
        // }
      />
      <style jsx>{`
        .parallax-container {
          z-index: -1;
          transform: translateZ(0);
        }
        .parallax {
          background-image: url(${image});
        }
      `}</style>
    </div>
  );
});

IntersectBox.displayName = "IntersectBox";

export default IntersectBox;
