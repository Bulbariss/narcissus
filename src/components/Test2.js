import React, { useEffect, memo, useRef } from "react";
import useIntersect from "./utils/useIntersect";

const Test = memo(({ image }) => {
  const [ref, entry] = useIntersect({
    threshold: 0,
  });

  let timeout = useRef();
  let childRef = useRef();
  let parentRef = useRef();
  let memory = useRef();

  const run = () => {
    if (memory.current !== parentRef.current.getBoundingClientRect().y)
      memory.current = parentRef.current.getBoundingClientRect().y;
    timeout.current = setInterval(() => {
      childRef.current.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${
        parentRef.current.getBoundingClientRect().y * -0.5
      }, 0, 1)`;
    }, 10);
  };

  useEffect(() => {
    if (entry.isIntersecting) {
      run();
    } else {
      clearInterval(timeout.current);
    }
    return () => clearInterval(timeout.current);
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

Test.displayName = "Test";

export default Test;
