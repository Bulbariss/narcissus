import React, { useEffect, memo, useRef, useState } from "react";
import Regl from "./Regl";
import useIntersect from "./utils/useIntersect";

const GetVal = memo(() => {
  const [ref, entry] = useIntersect({
    threshold: 0,
  });

  let parentRef = useRef();
  let [test, setTest] = useState(0);
  const onResize = () => {
    onScroll();
  };
  const onScroll = () => {
    setTest(parentRef.current.getBoundingClientRect().y / window.innerHeight);
  };

  useEffect(() => {
    if (entry.isIntersecting) {
      window.addEventListener("scroll", onScroll, {
        passive: true,
        capture: false,
      });
      window.addEventListener("resize", onResize, {
        passive: true,
        capture: false,
      });
    } else {
      window.removeEventListener("scroll", onScroll, {
        passive: true,
        capture: false,
      });
      window.removeEventListener("resize", onResize, {
        passive: true,
        capture: false,
      });
    }
    return () => {
      window.removeEventListener("scroll", onScroll, {
        passive: true,
        capture: false,
      });
      window.removeEventListener("resize", onResize, {
        passive: true,
        capture: false,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry]);

  return (
    <div className="h-screen" ref={parentRef}>
      <div className="relative h-full parallax-container" ref={ref}>
        <Regl test2={test} />
      </div>
    </div>
  );
});

GetVal.displayName = "GetVal";

export default GetVal;
