import React, { useRef, useEffect, useState, memo } from "react";
import { useInViewport } from "ahooks";

const Test = memo(({ image }) => {
  const parentRef = useRef();
  const childRef = useRef();

  const offsetTop = useRef();
  const offsetHeight = useRef();
  const windowHeight = useRef();

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
    childRef.current.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${percentageSeen()}, 0, 1)`;
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
      //   style={{ height: windowOuterHeight + "px" }}
    >
      <div ref={childRef} className="w-full h-screen parallax" />
      <style jsx>{`
        .parallax-container {
          z-index: -1;
        }
        .parallax {
          will-change: transform;
        }
        .parallax::after {
          background-image: url(${image});
          will-change: transform;
          background-position-x: 50%;
          content: "";
          position: fixed;
          top: 0;
          height: 100vh;
          left: 0;
          right: 0;
          z-index: -1;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      `}</style>
    </div>
  );
});

Test.displayName = "Test";

export default Test;
