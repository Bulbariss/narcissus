import { Curtains, Plane, Vec3 } from "curtainsjs";
import React, { useEffect } from "react";

const CurtainsJS = () => {
  useEffect(() => {
    // set up our WebGL context and append the canvas to our wrapper
    const curtains = new Curtains({
      container: "canvas",
      watchScroll: false, // no need to listen for the scroll in this example
      pixelRatio: Math.min(1.5, window.devicePixelRatio), // limit pixel ratio for performance
    });

    // handling errors
    curtains
      .onScroll(() => {
        console.log("object");
      })
      .onError(() => {
        // we will add a class to the document body to display original images
        document.body.classList.add("no-curtains");
      })
      .onContextLost(() => {
        // on context lost, try to restore the context
        curtains.restoreContext();
      });

    // get our plane element
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
      texturesOptions: {
        anisotropy: 16, // set anisotropy to a max so the texture isn't blurred when the plane's rotated
      },
    };

    // create our plane
    const plane = new Plane(curtains, planeElement[0], params);

    const planeBBoxEl = document.getElementById("plane-bounding-rect");

    function updatePlaneBBoxViewer() {
      // wait for next render to update the bounding rect sizes
      curtains.nextRender(() => {
        // update of bounding box size and position
        const planeBBox = plane.getWebGLBoundingRect();

        planeBBoxEl.style.width =
          planeBBox.width / curtains.pixelRatio +
          (plane.drawCheckMargins.right + plane.drawCheckMargins.left) +
          "px";
        planeBBoxEl.style.height =
          planeBBox.height / curtains.pixelRatio +
          (plane.drawCheckMargins.top + plane.drawCheckMargins.bottom) +
          "px";
        planeBBoxEl.style.top =
          planeBBox.top / curtains.pixelRatio -
          plane.drawCheckMargins.top +
          "px";
        planeBBoxEl.style.left =
          planeBBox.left / curtains.pixelRatio -
          plane.drawCheckMargins.left +
          "px";
      });
    }

    // when our plane is ready, add the GUI and update its BBox viewer
    plane
      .onReady(() => {
        // add the GUI

        updatePlaneBBoxViewer();
      })
      .onAfterResize(() => {
        updatePlaneBBoxViewer();
      });

    // once everything is ready, stop drawing the scene
    curtains.disableDrawing();
    setTimeout(() => {
      plane.setRelativeTranslation(
        new Vec3(plane.relativeTranslation.x, -100, plane.relativeTranslation.z)
      );
      curtains.needRender();
      updatePlaneBBoxViewer();
    }, 2000);
  }, []);
  return (
    <div>
      <div id="page-wrap">
        <div id="canvas"></div>

        <div className="plane">
          <img
            src="http://localhost:8000/static/4L-632bc53e2e728270bc81bfb848fc68da.jpg"
            data-sampler="planeTexture"
            alt="2"
          />
        </div>
        <div id="plane-bounding-rect"></div>
      </div>
      <style jsx>{`
        @media screen {
          #page-wrap {
            width: 100%;
            height: 100vh;
            overflow: hidden;
          }

          /*** canvas ***/

          #canvas {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            z-index: 1;
          }

          #back-to-lib-link {
            display: inline-block;
            position: fixed;
            top: 0;
            left: 0;
            padding: 0.25em 0.5em;
            background: #ee6557;
            color: white;
            text-decoration: none;
            z-index: 20;
            font-size: 0.85em;
          }

          #back-to-lib-link:hover {
            background: black;
          }

          #source-code-link {
            display: inline-block;
            position: fixed;
            bottom: 1em;
            left: 1em;
            padding: 0.25em 0.5em;
            background: #ee6557;
            color: white;
            text-decoration: none;
            z-index: 50;
          }

          #source-code-link:hover {
            background: black;
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
            position: fixed;
            width: 50%;
            height: 50vh;
            top: 25vh;
            left: 25%;
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

          #plane-bounding-rect {
            position: fixed;
            background: red;
            opacity: 0.2;
            pointer-events: none;
            display: block;
            z-index: 3;
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
