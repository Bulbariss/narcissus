import React, { useContext, useRef, useLayoutEffect } from "react";
import { CurtainsContext } from "./curtainsStore";
import iosInnerHeight from "ios-inner-height";

const WebGLCanvas = () => {
  // init our curtains instance
  const { state, dispatch } = useContext(CurtainsContext);
  const container = useRef();
  useLayoutEffect(() => {
    const curtains = state.curtains;

    if (container.current && !curtains.container) {
      // set our curtains instance container once
      curtains.setContainer(container.current);

      curtains
        .onRender(() => {
          curtains.resize();
        })
        .onError(() => {
          dispatch({
            type: "SET_CURTAINS_ERROR",
          });
        })
        .onContextLost(() => {
          curtains.restoreContext();
        })
        .onAfterResize(() => {
          container.current.style.height = iosInnerHeight() + "px";
          curtains.updateScrollValues(
            0,
            typeof window !== `undefined` && window.pageYOffset
          );
          document
            .querySelector("body")
            .style.setProperty("--height", iosInnerHeight() + "px");
          // Might be performance killer
          curtains.resize();
        });
      curtains.disableDrawing();
      dispatch({
        type: "SET_CURTAINS_CONTAINER",
        container: curtains.container,
      });

      // dispose curtains if we're unmounting the component (shouldn't ever happen)
      return () => {
        curtains.dispose();
      };
    }
  }, [container, state.container, state.curtains, dispatch]);

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none"
      style={{ height: iosInnerHeight() + "px" }}
      ref={container}
    />
  );
};

export default WebGLCanvas;
