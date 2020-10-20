import React, { useEffect, useRef } from "react";
import { Curtains, Plane, Vec3 } from "curtainsjs";
import useIntersect from "./utils/useIntersect";

const CurtainsJS = () => {
  const [ref, entry] = useIntersect({
    threshold: 0,
  });

  let plane = useRef();
  let curtains = useRef();
  let parentRef = useRef();

  function init() {
    // set up our WebGL context and append the canvas to our wrapper
    curtains.current = new Curtains({
      container: "canvas",
      watchScroll: false, // no need to listen for the scroll in this example
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

    // get our plane.current element
    const planeElement = document.getElementsByClassName("plane");

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
        uniform sampler2D planeTexture;
        void main() {
            // draw our texture
            gl_FragColor = texture2D(planeTexture, vTextureCoord);
        }
    `;

    // plane parameters
    const params = {
      vertexShader: vs,
      fragmentShader: fs,
      //   texturesOptions: {
      //     anisotropy: 16, // set anisotropy to a max so the texture isn't blurred when the plane.current's rotated
      //   },
    };

    // create our plane.current
    plane.current = new Plane(curtains.current, planeElement[0], params);

    // when our plane.current is ready, add the GUI and update its BBox viewer
    plane.current
      .onReady(() => {
        // add the GUI
      })
      .onAfterResize(() => {});

    // once everything is ready, stop drawing the scene
    curtains.current.disableDrawing();
  }

  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    if (entry.isIntersecting) {
      window.addEventListener("scroll", onScroll, {
        passive: true,
        capture: false,
      });
      window.addEventListener("resize", onScroll, {
        passive: true,
        capture: false,
      });
    } else {
      window.removeEventListener("scroll", onScroll, {
        passive: true,
        capture: false,
      });
      window.removeEventListener("resize", onScroll, {
        passive: true,
        capture: false,
      });
    }
    return () => {
      window.removeEventListener("scroll", onScroll, {
        passive: true,
        capture: false,
      });
      window.removeEventListener("resize", onScroll, {
        passive: true,
        capture: false,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry]);

  const onScroll = () => {
    plane.current.setRelativeTranslation(
      new Vec3(0, parentRef.current.getBoundingClientRect().y * -0.5, 0)
    );
    curtains.current.needRender();
    // updatePlaneBBoxViewer();
  };

  return (
    <div ref={ref}>
      <div id="page-wrap" ref={parentRef}>
        <div id="canvas"></div>

        <div className="plane">
          <img
            src="http://localhost:8000/static/4L-632bc53e2e728270bc81bfb848fc68da.jpg"
            data-sampler="planeTexture"
            alt="2"
          />
        </div>
      </div>
      <style jsx>{`
        @media screen {
          #page-wrap {
            position: relative;
            width: 100%;
            height: 100vh;
            overflow: hidden;
          }

          /*** canvas ***/

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

          #content {
            position: relative;
            z-index: 2;
            width: 97.5vw;
            margin: 40px auto;
          }

          .plane {
            visibility: hidden;
            position: absolute;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .plane img {
            display: block;
            min-width: 100%;
            min-height: 100%;
            object-fit: cover;
            opacity: 0.2;
          }

          /*** handling errors ***/

          .no-curtains .plane img {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CurtainsJS;
