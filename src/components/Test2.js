import React, { useEffect, memo, useRef } from "react";
import useIntersect from "./utils/useIntersect";

const Test3 = memo(({ image }) => {
  const [ref, entry] = useIntersect({
    threshold: 0,
  });

  let childRef = useRef();
  let parentRef = useRef();

  const onResize = () => {
    childRef.current.style.height = window.outerHeight;
    onScroll();
  };
  const onScroll = () => {
    childRef.current.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${
      parentRef.current.getBoundingClientRect().y * -0.5
    }, 0, 1)`;
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
  }, [entry]);

  return (
    <div className="h-screen" ref={parentRef}>
      <div className="relative h-screen parallax-container" ref={ref}>
        <div
          ref={childRef}
          style={{ height: window.outerHeight }}
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
    </div>
  );
});

Test3.displayName = "Test3";

export default Test3;
