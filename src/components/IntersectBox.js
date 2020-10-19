import { useInViewport } from "ahooks";
import React, { useRef, useEffect, memo, useState } from "react";

const Test = memo(({ image }) => {
  const parentRef = useRef();
  const childRef = useRef();

  const offsetTop = useRef();
  const offsetHeight = useRef();
  // const windowHeight = useRef();

  let [windowOuterHeight, setWindowOuterHeight] = useState(
    typeof window !== `undefined` && window.outerHeight
  );

  const inViewPort = useInViewport(parentRef);

  // https://stackoverflow.com/questions/20223243/js-get-percentage-of-an-element-in-viewport
  const percentageSeen = () => {
    const distance = window.scrollY + offsetHeight.current - offsetTop.current;
    // const distance = window.scrollY + windowHeight.current - offsetTop.current;
    // let b = distance / (windowHeight.current + offsetHeight.current) - 0.5;
    let b = distance / (offsetHeight.current + offsetHeight.current) - 0.5;
    return Math.round(Math.min(0.5, Math.max(-0.5, b)) * window.innerHeight);
  };

  const onScroll = () => {
    childRef.current.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${percentageSeen()}, 0, 1)`;
  };

  const onResize = () => {
    offsetTop.current = parentRef.current.offsetTop;
    if (windowOuterHeight !== window.outerHeight) {
      setWindowOuterHeight(window.outerHeight);
      childRef.current.style.height = windowOuterHeight;
      offsetHeight.current = parentRef.current.offsetHeight;
      // windowHeight.current = window.innerHeight;
    }
    onScroll();
  };

  useEffect(() => {
    window.addEventListener("resize", onResize, { passive: true });
    if (inViewPort) {
      window.addEventListener("scroll", onScroll, { passive: true });
    } else {
      window.removeEventListener("scroll", onScroll, { passive: true });
    }
    return () => {
      window.removeEventListener("resize", onResize, { passive: true });
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inViewPort]);

  useEffect(() => {
    // windowHeight.current = window.innerHeight;
    setTimeout(() => {
      offsetHeight.current = parentRef.current.offsetHeight;
      onResize();
      childRef.current.style.height = windowOuterHeight + "px";
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
        className="absolute w-full h-screen bg-center bg-no-repeat bg-cover parallax"
      />
      <style jsx>{`
        .parallax-container {
          z-index: -1;
        }
        .parallax {
          will-change: transform;
          background-image: url(${image});
        }
      `}</style>
    </div>
  );
});

Test.displayName = "Test";

export default Test;
