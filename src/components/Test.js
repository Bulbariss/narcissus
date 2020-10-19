import React, { useRef, useEffect, useState, memo } from "react";
import { useInViewport } from "ahooks";

const IntersectBox = memo(({ image }) => {
  const parentRef = useRef();
  const childRef = useRef();

  const offsetTop = useRef();
  const offsetHeight = useRef();
  const windowHeight = useRef();

  let [windowOuterHeight2, setWindowOuterHeight2] = useState();
  let [windowOuterHeight, setWindowOuterHeight] = useState(
    typeof window !== `undefined` && window.outerHeight
  );

  const inViewPort = useInViewport(parentRef);

  // https://stackoverflow.com/questions/20223243/js-get-percentage-of-an-element-in-viewport
  const percentageSeen = () => {
    const distance = window.scrollY + windowHeight.current - offsetTop.current;
    let b = distance / (windowHeight.current + offsetHeight.current) - 0.5;
    return Math.round(Math.min(0.5, Math.max(-0.5, b)) * windowOuterHeight);
  };

  const onScroll = () => {
    setWindowOuterHeight2(percentageSeen());
    // childRef.current.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${percentageSeen()}, 0, 1)`;
  };

  const onResize = () => {
    offsetHeight.current = parentRef.current.offsetHeight;
    offsetTop.current = parentRef.current.offsetTop;
    if (windowOuterHeight !== window.outerHeight) {
      setWindowOuterHeight(window.outerHeight);
      windowHeight.current = window.innerHeight;
    }
    onScroll();
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    if (inViewPort) {
      window.addEventListener("scroll", onScroll);
    } else {
      window.removeEventListener("scroll", onScroll);
    }
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inViewPort]);

  useEffect(() => {
    windowHeight.current = window.innerHeight;
    setTimeout(() => {
      onResize();
    }, 1300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="relative h-screen parallax-container"
      ref={parentRef}
      // style={{ height: windowOuterHeight + "px" }}
    >
      <div
        ref={childRef}
        className="absolute w-full h-full bg-center bg-no-repeat bg-cover parallax"
      />
      <style jsx>{`
        .parallax::after {
           {
            /* background-position-y: ${windowOuterHeight2 * -1}px; */
          }
          transform: matrix3d(
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            ${windowOuterHeight2 * -1},
            0,
            1
          );
        }
      `}</style>
      <style jsx>{`
        .parallax-container {
          z-index: -1;
        }
        .parallax::after {
          background-image: url(${image});
           {
            /* position: fixed;
          z-index: -1;
          width: 100%;
          height: 100vh;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed; */
          }
          will-change: transform;
          background-position-x: 50%;
          content: "";
          position: fixed;
          top: 0;
          height: 100vh;
          left: 0;
          right: 0;
          z-index: -1; // needed to keep in the background
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      `}</style>
    </div>
  );
});

IntersectBox.displayName = "IntersectBox";

export default IntersectBox;
