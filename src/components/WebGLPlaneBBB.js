import React from "react";

const WebGLPlane = ({ image }) => {
  return (
    <div className="plane-wrapper true-height">
      <div className="plane-inner">
        <div className="plane true-height">
          <img src={image} alt="Обложка" data-sampler="planeTexture" />
        </div>
      </div>
      <style jsx>{`
        .plane-wrapper {
          position: relative;
          width: 100vw;
          height: 100vh;
        }

        .plane {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }

        .plane img {
          display: none;
        }

        /*** handling errors ***/

        .no-curtains .plane-title {
          z-index: 1;
        }

        .no-curtains .plane {
          display: flex;
          overflow: hidden;
        }

        .no-curtains .plane img {
          display: block;
          min-width: 100%;
          min-height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

WebGLPlane.displayName = "WebGLPlane";

export default WebGLPlane;
