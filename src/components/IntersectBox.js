import React, { useRef, useEffect, useState, memo } from "react";
import { useInViewport } from "ahooks";
import BackgroundImage from "gatsby-background-image";

const IntersectBox = memo(({ image }) => {
  const ref = useRef();
  const ref2 = useRef();
  const windowHeight = useRef();
  let [clientHeight, setClientHeight] = useState();
  // let [clientHeight2, setClientHeight2] = useState();
  const inViewPort = useInViewport(ref);

  const onScroll = () => {
    ref2.current.selfRef.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${
      -0.5 * ref.current.getBoundingClientRect().y
    }, 0, 1)`;
    // setClientHeight2(-0.5 * ref.current.getBoundingClientRect().y);
  };

  const onResize = () => {
    if (windowHeight.current !== window.screen.height) {
      setClientHeight(window.innerHeight);
      windowHeight.current = window.screen.height;
      // setClientHeight2(-0.5 * ref.current.getBoundingClientRect().y);
      onScroll;
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
    setClientHeight(window.innerHeight);
    windowHeight.current = window.screen.height;
  }, []);
  return (
    <div
      className="relative h-screen"
      ref={ref}
      style={{
        zIndex: "-1",
        transform: "translateZ(0)",
        height: clientHeight + "px",
      }}
    >
      {/* <div
        ref={ref2}
        className="absolute w-full h-full bg-center bg-no-repeat bg-cover test"
        style={{
          backgroundImage: `url(${image})`,
          // transform: `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${clientHeight2}, 0, 1)`,
        }}
      /> */}

      <BackgroundImage
        ref={ref2}
        className="absolute w-full h-full bg-center bg-no-repeat bg-cover test"
        // className="flex min-h-screen"
        Tag="section"
        fluid={image}
        fadeIn="soft"
      />
    </div>
  );
});

IntersectBox.displayName = "IntersectBox";

export default IntersectBox;
