import React, { useRef, useEffect, useState } from "react";
import { useInViewport, useEventListener } from "ahooks";

const IntersectBox = ({ image }) => {
  const ref = useRef();
  const img = useRef();

  let latestKnownScrollY = 0;
  let ticking = false;

  let [clientHeight, setClientHeight] = useState(
    typeof window !== `undefined` && window.screen.height
  );
  const inViewPort = useInViewport(ref);

  function update() {
    ticking = false;
    img.current.style.transform = `translateY(${latestKnownScrollY}px)`;
  }

  function onScroll() {
    latestKnownScrollY = -0.5 * ref.current.getBoundingClientRect().y;
    requestTick();
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(update);
    }
    ticking = true;
  }

  const onResize = () => {
    if (clientHeight.current !== window.screen.height) {
      setClientHeight(window.screen.height);
      img.current.style.transform = `translateY(${latestKnownScrollY}px)`;
    }
  };

  useEventListener("resize", onResize);
  useEffect(() => {
    if (inViewPort) {
      window.addEventListener("scroll", onScroll, false);
    } else {
      window.removeEventListener("scroll", onScroll, false);
    }
    return () => {
      window.removeEventListener("scroll", onScroll, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inViewPort]);
  return (
    <div
      className="relative h-screen"
      ref={ref}
      style={{ zIndex: "-1", transform: "translateZ(0)", height: clientHeight }}
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
};

IntersectBox.displayName = "IntersectBox";

export default IntersectBox;
