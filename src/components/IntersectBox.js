import React, { useRef, useEffect } from "react";
import { useInViewport, useEventListener } from "ahooks";

const IntersectBox = ({ image }) => {
  const ref = useRef();
  const img = useRef();
  const clientHeight = useRef(window.screen.height);
  const inViewPort = useInViewport(ref);
  let myReq = useRef();

  const onResize = () => {
    if (clientHeight.current !== window.screen.height) {
      clientHeight.current = window.screen.height;
      img.current.style.transform = `translateY(${
        -0.5 * ref.current.getBoundingClientRect().y
      }px)`;
    }
  };
  function go() {
    if (inViewPort) {
      img.current.style.transform = `translateY(${
        -0.5 * ref.current.getBoundingClientRect().y
      }px)`;
      myReq.current = window.requestAnimationFrame(go);
    } else {
      myReq.current = null;
    }
  }

  useEventListener("resize", onResize);
  useEffect(() => {
    if (inViewPort) {
      myReq.current = window.requestAnimationFrame(go);
    } else {
      cancelAnimationFrame(myReq.current);
    }
    return () => {
      cancelAnimationFrame(myReq.current);
    };
  }, [inViewPort]);
  return (
    <div
      className="relative h-screen text-6xl bg-white"
      ref={ref}
      style={{ zIndex: "-1", transform: "translateZ(0)" }}
    >
      <div
        ref={img}
        className="absolute w-full h-screen bg-center bg-no-repeat bg-cover test"
        style={{
          backgroundImage: `url(${image})`,
          backfaceVisibility: "hidden",
        }}
      ></div>
    </div>
  );
};

IntersectBox.displayName = "IntersectBox";

export default IntersectBox;
