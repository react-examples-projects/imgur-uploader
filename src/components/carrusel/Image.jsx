import React, { memo } from "react";

function Image({
  deletehash,
  link,
  description,
  onClickImage,
  onClickImageDelete,
}) {
  const showImage = (e) => {
    e.stopPropagation();
    onClickImage(link);
  };
  const deleteImage = () => onClickImageDelete(deletehash);
  return (
    <>
      <figure className="carrusel-figure">
        <div className="carrusel-figure-delete" onClick={deleteImage}>
          <span>x</span>
        </div>
        <img src={link} alt={link} loading="lazy" onClick={showImage} />
        <figcaption>{description ? description : "No description."}</figcaption>
      </figure>
    </>
  );
}

export default memo(Image);
