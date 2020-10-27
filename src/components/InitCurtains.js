import { Curtains, Plane } from "curtainsjs";
import iosInnerHeight from "ios-inner-height";

export default function InitCurtains() {
  // set up our WebGL context and append the canvas to our wrapper
  const curtains = new Curtains({
    container: "canvas",
    pixelRatio: Math.min(
      1.5,
      typeof window !== `undefined` && window.devicePixelRatio
    ),
    production: true,
    // watchScroll: false,
    antialias: false,
    depth: false,
    autoResize: true,
  });

  curtains
    .onRender(() => {})
    .onScroll(() => {
      for (let i = 0; i < planes.length; i++) {
        // apply additional translation, scale and rotation
        onScroll(i);
      }
    })
    .onError(() => {
      // we will add a class to the document body to display original images
      document.body.classList.add("no-curtains", "planes-loaded");
    })
    .onContextLost(() => {
      // on context lost, try to restore the context
      curtains.restoreContext();
    })
    .onAfterResize(() => {
      // apply new parallax values after resize
      document
        .querySelector("body")
        .style.setProperty("--height", iosInnerHeight() + "px");
    });

  // we will keep track of all our planes in an array
  const planes = [];

  // get our planes elements
  const planeElements = document.getElementsByClassName("plane");

  // keep track of the number of plane we're currently drawing
  //   const debugElement = document.getElementById("debug-value");
  // we need to fill the counter with all our planes
  //   let planeDrawn = planeElements.length;

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

  const params = {
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

  // add our planes and handle them
  for (let i = 0; i < planeElements.length; i++) {
    const plane = new Plane(curtains, planeElements[i], params);

    planes.push(plane);

    handlePlanes(i);
  }

  // handle all the planes
  function handlePlanes(index) {
    const plane = planes[index];

    plane
      .onReady(() => {
        // apply parallax on load
        onScroll(index);

        // once everything is ready, display everything
        if (index === planes.length - 1) {
          document.body.classList.add("planes-loaded");
        }
      })
      .onAfterResize(() => {
        // apply new parallax values after resize
        onScroll(index);
      })
      .onRender(() => {
        // apply the rotation
        // plane.setRotation(new Vec3(0, 0, scrollEffect / 750));
        // // scale plane and its texture
        // plane.setScale(new Vec2(1, 1 + Math.abs(scrollEffect) / 300));
        // plane.textures[0].setScale(
        //   new Vec2(1, 1 + Math.abs(scrollEffect) / 150)
        // );
        // // update the uniform
        // plane.uniforms.scrollEffect.value = scrollEffect;
      })
      .onReEnterView(() => {})
      .onLeaveView(() => {});
  }

  //   function applyPlanesParallax(index) {
  //     // calculate the parallax effect
  //     // get our window size
  //     const sceneBoundingRect = curtains.getBoundingRect();
  //     // get our plane center coordinate
  //     const planeBoundingRect = planes[index].getBoundingRect();
  //     const planeOffsetTop = planeBoundingRect.top + planeBoundingRect.height / 2;
  //     // get a float value based on window height (0 means the plane is centered)
  //     const parallaxEffect =
  //       (planeOffsetTop - sceneBoundingRect.height / 2) /
  //       sceneBoundingRect.height;

  //     // apply the parallax effect
  //     planes[index].setRelativeTranslation(
  //       new Vec3(0, parallaxEffect * (sceneBoundingRect.height / 4))
  //     );
  //   }

  function getScrollValue(index) {
    return Number.parseFloat(
      (planes[index].htmlElement.getBoundingClientRect().y / iosInnerHeight()) *
        -0.5
    ).toFixed(3);
  }

  function onScroll(index) {
    planes[index].uniforms.offset.value = getScrollValue(index);
  }
}
