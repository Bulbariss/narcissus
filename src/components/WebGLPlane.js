import React, {
  useContext,
  useRef,
  useLayoutEffect,
  useEffect,
  memo,
} from "react";
import { Plane } from "curtainsjs";
import { CurtainsContext } from "./curtainsStore";
import iosInnerHeight from "ios-inner-height";
import useIntersect from "./utils/useIntersect";

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

const WebGLPlane = memo(({ image }) => {
  const [ref, entry] = useIntersect({
    threshold: 0,
  });
  const { state } = useContext(CurtainsContext);
  const planeEl = useRef();
  var waiting = false;
  let plane = useRef();
  let curtains = useRef();

  useLayoutEffect(() => {
    curtains.current = state.curtains;

    // curtains container has been set
    if (state.container) {
      const planeParams = {
        vertexShader: vs,
        production: true,
        fragmentShader: fs,
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
          curtains.current.resize();
          onScroll();
        })
        .onAfterResize(() => {
          planeEl.current.style.height = iosInnerHeight() + "px";
          planeEl.current.parentNode.style.height = iosInnerHeight() + "px";
          onScroll();
        });
      curtains.current.disableDrawing();
      // remove plane if we're unmounting the component
      return () => {
        plane.current.remove();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.container, state.curtains]);

  useEffect(() => {
    if (entry.isIntersecting) {
      window.addEventListener("scroll", onScroll, {
        passive: true,
        capture: false,
      });
    } else {
      window.removeEventListener("scroll", onScroll, {
        passive: true,
        capture: false,
      });
    }
    return () => {
      window.removeEventListener("scroll", onScroll, {
        passive: true,
        capture: false,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry]);

  const onScroll = () => {
    if (!waiting) {
      plane.current.uniforms.offset.value =
        (planeEl.current.getBoundingClientRect().y / iosInnerHeight()) * -0.5;
      curtains.current.updateScrollValues(
        0,
        typeof window !== `undefined` && window.pageYOffset
      );
      plane.current.updateScrollPosition();
      waiting = true;
      setTimeout(function () {
        waiting = false;
      }, 10);
    }
  };

  return (
    <div
      ref={ref}
      className="w-screen"
      style={{ height: iosInnerHeight() + "px", zIndex: "-1" }}
    >
      <div
        className="top-0 left-0 w-screen WebGLPlane"
        ref={planeEl}
        style={{ height: iosInnerHeight() + "px" }}
      >
        <img
          src={image}
          alt="Обложка"
          data-sampler="planeTexture"
          className="hidden object-cover"
        />
      </div>
    </div>
  );
});

WebGLPlane.displayName = "WebGLPlane";

export default WebGLPlane;
