import React, { memo } from "react";
import Loader from "../loader/Loader";
import Image from "./Image";

function Carrusel({
  onClickImage,
  onClickImageDelete,
  images,
  isLoading,
  action,
}) {
  return (
    <>
      <div
        className="carrusel"
        style={{
          overflowX: isLoading ? "hidden" : "auto",
        }}
      >
        {isLoading && (action == "delete" || action == "upload") && (
          <div className="carrusel-loader">
            <Loader />
          </div>
        )}
        {images.map((image) => (
          <Image
            {...{ ...image, onClickImageDelete, onClickImage }}
            key={image.id}
          />
        ))}
      </div>
    </>
  );
}

export default memo(Carrusel);
