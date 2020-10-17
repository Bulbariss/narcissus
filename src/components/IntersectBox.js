import React, { useRef, useEffect, useState, memo } from "react";
import { useInViewport } from "ahooks";

const IntersectBox = memo(({ image }) => {
  const ref = useRef();
  const img = useRef();

  let waiting = false;

  let [clientHeight, setClientHeight] = useState();
  const inViewPort = useInViewport(ref);

  const onScroll = () => {
    if (!waiting) {
      img.current.style.transform = `translateY(${
        -0.5 * ref.current.getBoundingClientRect().y
      }px)`;
      waiting = true;
      setTimeout(function () {
        waiting = false;
      }, 16);
    }
  };

  const onResize = () => {
    if (clientHeight !== window.screen.height) {
      setClientHeight(window.screen.height);
      img.current.style.transform = `translateY(${
        -0.5 * ref.current.getBoundingClientRect().y
      }px)`;
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
    setTimeout(() => {
      setClientHeight(window.screen.height);
    }, 200);
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
      <div
        ref={img}
        className="absolute w-full h-full bg-center bg-no-repeat bg-cover test"
        style={{
          backgroundImage: `url(${image})`,
          backfaceVisibility: "hidden",
        }}
      ></div>
    </div>
  );
});

IntersectBox.displayName = "IntersectBox";

export default IntersectBox;
