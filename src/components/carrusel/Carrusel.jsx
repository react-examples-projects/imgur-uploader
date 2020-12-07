import React, { memo, useState, useRef } from "react";
import Loader from "../loader/Loader";
import Image from "./Image";

function Carrusel({ onClickImageDelete, images, isLoading }) {
  const [userClicked, setUserClicked] = useState(false);
  const imgNode = useRef(null);

  const onOpenImage = (link) => {
    setUserClicked(true);
    if (imgNode.current) imgNode.current.src = link;
  };

  const onCloseImage = () => {
    setUserClicked(false);
    if (imgNode.current) imgNode.current.src = "";
  };
  return (
    <>
      <div
        className={`image-carrusel-container${!userClicked ? " hidden" : ""}`}
      >
        <button className="image-carrusel-close" onClick={onCloseImage}>
          <i className="fa fa-times"></i>
        </button>
        <img
          src=""
          alt="test"
          ref={imgNode}
          className="image image-carrusel-preview"
        />
      </div>
      <div
        className="carrusel"
        style={{
          overflowX: isLoading ? "hidden" : "auto",
        }}
      >
        {isLoading && (
          <div className="carrusel-loader">
            <Loader />
          </div>
        )}
        {images.map((image) => (
          <Image
            {...{ ...image, onClickImageDelete, onOpenImage }}
            key={image.id}
          />
        ))}
      </div>
    </>
  );
}

export default memo(Carrusel);
