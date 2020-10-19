import React, { useEffect, memo, useRef } from "react";
import useIntersect from "./utils/useIntersect";

const Test3 = memo(({ image }) => {
  const [ref, entry] = useIntersect({
    threshold: 0,
  });

  let childRef = useRef();
  let parentRef = useRef();

  const onScroll = () => {
    childRef.current.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${
      parentRef.current.getBoundingClientRect().y * -0.5
    }, 0, 1)`;
  };

  useEffect(() => {
    if (entry.isIntersecting) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    } else {
      window.removeEventListener("scroll", onScroll, { passive: true });
      window.removeEventListener("resize", onScroll, { passive: true });
    }
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
      window.removeEventListener("resize", onScroll, { passive: true });
    };
  }, [entry]);

  return (
    <div className="relative h-screen parallax-container" ref={parentRef}>
      <div className="relative h-screen parallax-container" ref={ref}>
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
    </div>
  );
});

Test3.displayName = "Test3";

export default Test3;
