import React, { useContext, useRef, useLayoutEffect, memo } from "react";
import { CurtainsContext } from "./curtainsStore";

const WebGLCanvas = memo(() => {
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
          curtains.updateScrollValues(0, window.pageYOffset);
          curtains.needRender();
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
          curtains.updateScrollValues(0, window.pageYOffset);
          curtains.needRender();
        });

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
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none WebGLCanvas"
      ref={container}
    />
  );
});

WebGLCanvas.displayName = "WebGLCanvas";

export default WebGLCanvas;
