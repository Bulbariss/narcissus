import React, { useRef, useEffect } from "react";
// import fourL from "../images/collages/4L.jpg";
import useIntersect from "./utils/useIntersect";

const Regl = () => {
  let canvas = useRef();
  let regl = require("regl")(canvas.current);
  const baboon = require("baboon-image");

  const [ref, entry] = useIntersect({
    threshold: 0,
  });
  const draw = () =>
    regl({
      frag: `
          precision mediump float;
          uniform sampler2D texture;
          varying vec2 uv;
          void main () {
          gl_FragColor = texture2D(texture, uv);
        }`,

      vert: `
          precision mediump float;
          attribute vec2 position;
          uniform float color;
          varying vec2 uv;
          void main () {
          uv = position;
          gl_Position = vec4(1.0 - 2.0 * position.x,  color * 2.0 * position.y   , 0, 1.0);
        }`,

      attributes: {
        position: [2, 0, 0, 2, 2, 2],
      },

      uniforms: {
        color: Math.min(
          1,
          Math.max(
            -1,
            canvas.current.getBoundingClientRect().y / window.innerHeight
          )
        ),
        texture: regl.texture(baboon),
      },

      count: 3,
    })();
  useEffect(() => {
    console.log(
      Math.min(
        1,
        Math.max(
          -1,
          canvas.current.getBoundingClientRect().y / window.innerHeight
        )
      )
    );
    if (entry.isIntersecting) {
      window.addEventListener("scroll", draw, { passive: true });
      window.addEventListener("resize", draw, { passive: true });
    } else {
      window.removeEventListener("scroll", draw, { passive: true });
      window.removeEventListener("resize", draw, { passive: true });
    }
    return () => {
      window.removeEventListener("scroll", draw, { passive: true });
      window.removeEventListener("resize", draw, { passive: true });
    };
  }, [entry]);
  return (
    <div ref={ref}>
      <canvas className="w-screen h-screen" ref={canvas}></canvas>
    </div>
  );
};

export default Regl;
