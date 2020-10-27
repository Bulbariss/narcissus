import React from "react";

const WebGLPlane = ({ image }) => {
  return (
    <div className="relative w-screen plane-wrapper true-height">
      <div className="plane-inner">
        <div className="absolute top-0 bottom-0 left-0 right-0 plane true-height">
          <img
            src={image}
            alt="Обложка"
            className="hidden"
            data-sampler="planeTexture"
          />
        </div>
      </div>
      <style jsx>{`
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
