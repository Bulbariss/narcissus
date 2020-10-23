import React, { useEffect, useRef } from "react";
import { Curtains, Plane } from "curtainsjs";
import useIntersect from "./utils/useIntersect";

const Cur = ({ image }) => {
  const [ref, entry] = useIntersect({
    threshold: 0,
  });

  var waiting = false; // Initially, we're not waiting
  let plane = useRef();
  let curtains = useRef();
  let parentRef = useRef();
  let planeElement = useRef();
  let canvas = useRef();

  function init() {
    // set up our WebGL context and append the canvas to our wrapper
    curtains.current = new Curtains({
      container: canvas.current,
      watchScroll: true, // no need to listen for the scroll in this example
      antialias: false,
      alpha: false,
      depth: false,
      autoResize: true,
      production: true,
      pixelRatio: Math.min(1.5, window.devicePixelRatio), // limit pixel ratio for performance
    });

    // handling errors
    curtains.current
      .onError(() => {
        // we will add a class to the document body to display original images
        document.body.classList.add("no-curtains");
      })
      .onContextLost(() => {
        // on context lost, try to restore the context
        curtains.current.restoreContext();
      });

    const vs = `
			precision mediump float;
        // default mandatory variables
        attribute vec3 aVertexPosition;
        attribute vec2 aTextureCoord;
        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;
        
        // our texture matrix uniform
        uniform mat4 planeTextureMatrix;
        // custom variables
        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord;
        void main() {
            gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
            // varyings
            vTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
            vVertexPosition = aVertexPosition;
        }
    `;

    const fs = `
			precision mediump float;
        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord;
         uniform float uOffset;
        uniform sampler2D planeTexture;
        void main() {
            vec2 textureCoord = vTextureCoord;
            textureCoord.y += uOffset;
            // draw our texture
            gl_FragColor = texture2D(planeTexture, textureCoord);
        }
        
    `;

    // plane parameters
    const params = {
      vertexShader: vs,
      fragmentShader: fs,
      //   production: true,
      //   alpha: false,
      //   antialias: false,
      //   depth: false,
      //   autoRender: false,
      //   watchScroll: false,
      uniforms: {
        offset: {
          name: "uOffset",
          type: "1f",
          value: 0,
        },
      },
    };

    // create our plane.current
    plane.current = new Plane(curtains.current, planeElement.current, params);

    // once everything is ready, stop drawing the scene
    // curtains.current.disableDrawing();
  }

  useEffect(() => {
    init();
    onScroll();
    plane.current.updatePosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

  const onResize = () => {
    curtains.current.updateScrollValues();
  };
  const onScroll = () => {
    if (!waiting) {
      // If we're not waiting
      //   plane.current.setRelativeTranslation(
      //     new Vec3(0, parentRef.current.getBoundingClientRect().y * -0.5, 0)
      //   );
      //   plane.current.uniforms.offset.value =
      //     (document.querySelector(".plane").getBoundingClientRect().y /
      //       window.innerHeight) *
      //     -0.5;
      curtains.current.needRender();
      waiting = true; // Prevent future invocations
      setTimeout(function () {
        // After a period of time
        waiting = false; // And allow future invocations
      }, 10);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden" ref={ref}>
      <div
        id="page-wrap"
        className="relative w-screen h-screen overflow-hidden"
        ref={parentRef}
      >
        <div id="canvas" ref={canvas}></div>
        <div className="plane" ref={planeElement}>
          <img src={image} data-sampler="planeTexture" alt="Коллаж" />
        </div>
      </div>
      <style jsx>{`
        #canvas {
          position: absolute;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          z-index: 1;
        }

        .dg.ac {
          z-index: 3 !important;
        }

         {
          /* .plane {
          visibility: hidden;
          position: fixed;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 0;
          left: 0;
        }

        .plane img {
          top: 0;
          left: 0;
          display: block;
          min-width: 100%;
          min-height: 100%;
          opacity: 0.2;
        } */
        }
        .plane {
          position: absolute;
          width: 100vw;
          height: 100vh;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }

        .plane img {
          object-fit: cover;
          display: none;
        }

        /*** handling errors ***/

        .no-curtains .plane img {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Cur;
