import React, { memo } from "react";

function Image({
  deletehash,
  link,
  description,
  onOpenImage,
  onClickImageDelete,
}) {
  const showImage = (e) => {
    e.stopPropagation();
    onOpenImage(link);
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
