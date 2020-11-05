import React, { useContext, useRef, useLayoutEffect } from "react";
import { Plane } from "curtainsjs";
import { useScrollPercentage } from "react-scroll-percentage";
import { CurtainsContext } from "./curtainsStore";
import iosInnerHeight from "ios-inner-height";

// vertex and fragment shaders
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

const WebGLPlane = ({ image }) => {
  const [ref, percentage] = useScrollPercentage({
    threshold: 0,
  });

  const { state } = useContext(CurtainsContext);
  const planeEl = useRef();
  const plane = useRef();
  const curtains = useRef();
  let waiting = false;

  if (!waiting && plane.current) {
    plane.current.uniforms.offset.value = percentage.toPrecision(3) - 0.5;
    waiting = true;
    setTimeout(function () {
      waiting = false;
    }, 10);
  }

  useLayoutEffect(() => {
    curtains.current = state.curtains;
    // curtains container has been set
    if (state.container) {
      const planeParams = {
        vertexShader: vs,
        production: true,
        fragmentShader: fs,
        shareProgram: true,
        uniforms: {
          offset: {
            name: "uOffset",
            type: "1f",
            value: 0,
          },
        },
      };

      plane.current = new Plane(curtains.current, planeEl.current, planeParams);

      plane.current
        .onReady(() => {
          curtains.current.resize();
        })
        .onAfterResize(() => {
          // planeEl.current.style.height = iosInnerHeight() + "px";
          planeEl.current.parentNode.style.height = iosInnerHeight() + "px";
        });
      // remove plane if we're unmounting the component
      return () => {
        plane.current.remove();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.container, state.curtains]);

  return (
    <div
      ref={ref}
      className="w-screen h-screen"
      style={{ height: iosInnerHeight() + "px" }}
    >
      <div
        className="w-screen h-screen"
        ref={planeEl}
        style={{ height: iosInnerHeight() + "px" }}
      >
        <img
          src={image}
          crossOrigin="anonymous"
          data-sampler="planeTexture"
          className="hidden object-cover"
          alt="Обложка"
        />
      </div>
    </div>
  );
};

export default WebGLPlane;
