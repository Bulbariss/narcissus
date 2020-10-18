import React, { useRef, useEffect, useState, memo } from "react";
import { useInViewport } from "ahooks";

const IntersectBox = memo(({ image }) => {
  const ref = useRef();
  const ref2 = useRef();
  const windowHeight = useRef();
  let [clientHeight, setClientHeight] = useState();
  // let [clientHeight2, setClientHeight2] = useState();
  const inViewPort = useInViewport(ref);

  const onScroll = () => {
    ref2.current.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${
      -0.5 * ref.current.getBoundingClientRect().y
    }, 0, 1)`;
    // setClientHeight2(-0.5 * ref.current.getBoundingClientRect().y);
  };

  const onResize = () => {
    if (windowHeight.current !== window.screen.height) {
      windowHeight.current = window.screen.height;
      setClientHeight(window.innerHeight);
      onScroll();
    }
  };

  useEffect(() => {
    if (inViewPort) {
      window.addEventListener("resize", onResize);
      window.addEventListener("scroll", onScroll, false);
    } else {
      window.removeEventListener("resize", onResize);
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
