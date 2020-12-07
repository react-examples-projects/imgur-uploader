import React from "react";
import { Link } from "react-router-dom";
import Carrusel from "../carrusel/Carrusel";

export default function ApplicationComponent({
  existError,
  loadingData,
  inputFileRef,
  onChangeDesc,
  description,
  uploadImage,
  onClickImageDelete,
  images,
}) {
  return (
    <div className="App">
      <nav>
        <h1 className="title title-principal">Imgur uploader</h1>
        <Link to="/person" className="link">
          Ir a person
        </Link>
      </nav>

      {existError && <h5>Error de red</h5>}

      <div className="field">
        <input
          type="file"
          ref={inputFileRef}
          accept="image/*"
          className="btn btn-grad w-100"
          disabled={loadingData}
        />
      </div>

      <div className="field">
        <textarea
          onChange={onChangeDesc}
          value={description}
          className="input textarea w-100"
          placeholder="Description"
          maxLength="500"
        />
      </div>

      <button
        className="btn btn-grad w-100"
        onClick={uploadImage}
        disabled={loadingData}
      >
        Subir una imágen
        <i
          className="fa fa-cloud-upload-alt"
          style={{ marginLeft: "10px" }}
        ></i>
      </button>
      <Carrusel
        {...{
          onClickImageDelete,
          images,
          isLoading: loadingData,
        }}
      />
    </div>
  );
}
