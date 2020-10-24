import React, { useContext, useRef, useLayoutEffect } from "react";
import { Plane } from "curtainsjs";
import { CurtainsContext } from "./curtainsStore";
// import useIntersect from "./utils/useIntersect";
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
  const { state } = useContext(CurtainsContext);
  const planeEl = useRef();
  //   var waiting = false;
  let plane = useRef();
  let curtains = useRef();

  useLayoutEffect(() => {
    curtains.current = state.curtains;

    // curtains container has been set
    if (state.container) {
      const planeParams = {
        vertexShader: vs,
        fragmentShader: fs,
        production: true,
        shareProgram: true,
        // watchScroll: false,
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
          planeEl.current.parentNode.style.height = iosInnerHeight() + "px";
          curtains.current.resize();
          //   plane.current.uniforms.offset.value = getScrollValue();
        })
        .onAfterResize(() => {
          planeEl.current.parentNode.style.height = iosInnerHeight() + "px";
          //   plane.current.uniforms.offset.value = getScrollValue();
        })
        .onReEnterView(() => {})
        .onLeaveView(() => {})
        .onRender(() => {
          plane.current.uniforms.offset.value = getScrollValue();
        });
      curtains.current.disableDrawing();

      // remove plane if we're unmounting the component
      return () => {
        plane.current.remove();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.container, state.curtains]);

  const getScrollValue = () => {
    return Number.parseFloat(
      (planeEl.current.getBoundingClientRect().y / iosInnerHeight()) * -0.5
    ).toFixed(3);
  };

  return (
    <div
      className="relative w-screen h-screen"
      style={{ height: iosInnerHeight() + "px" }}
    >
      <div className="absolute top-0 left-0 w-screen h-full" ref={planeEl}>
        <img
          src={image}
          alt="Обложка"
          data-sampler="planeTexture"
          className="hidden object-cover"
        />
      </div>
    </div>
  );
};

WebGLPlane.displayName = "WebGLPlane";

export default WebGLPlane;
