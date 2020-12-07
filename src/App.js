import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./App.css";
import useMounted from "./hooks/useMounted";
import uploadImageData, { deleteImageData, getImages } from "./req/requests";
import Carrusel from "./components/carrusel/Carrusel";

function App() {
  const [description, setDescription] = useState("");
  const inputFileRef = useRef(null);
  const imgReq = useMounted();
  const imgUpload = useMounted();
  const imgDelete = useMounted();
  const [images, setImages] = useState([]);

  const getAllImages = useCallback(() => {
    imgReq.init(getImages());
  }, []);

  useEffect(() => {
    if (imgReq.data) setImages(imgReq.data);
  }, [imgReq.data]);

  useEffect(() => {
    getAllImages();
  }, [getAllImages, imgUpload.data, imgDelete.isLoading]);

  const uploadImage = () => {
    if (inputFileRef.current?.files?.length < 1) {
      alert("No there images. Please find a image in your computer.");
      return;
    }
    imgUpload.init(
      uploadImageData({
        inputFileRef,
        description,
      })
    );
  };

  const deleteImage = (id) => {
    document.querySelector(".carrusel").scroll(0, 0);
    imgDelete.init(deleteImageData(id));
  };

  const onClickImageDelete = (id) => {
    deleteImage(id);
  };

  const onChangeDesc = ({ target }) => {
    setDescription(target.value);
  };

  return (
    <div className="App">
      <nav>
        <h1 className="title title-principal">Imgur uploader</h1>
        <Link to="/person" className="link">
          Ir a person
        </Link>
      </nav>

      {(imgReq.isError || imgUpload.isError || imgDelete.isError) && (
        <h5>Error de red</h5>
      )}

      <div className="field">
        <input
          type="file"
          ref={inputFileRef}
          accept="image/*"
          className="btn btn-grad w-100"
          disabled={
            imgReq.isLoading || imgUpload.isLoading || imgDelete.isLoading
          }
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
        disabled={
          imgReq.isLoading || imgUpload.isLoading || imgDelete.isLoading
        }
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
          isLoading: imgUpload.isLoading || imgDelete.isLoading,
        }}
      />
    </div>
  );
}

export default function Application() {
  return (
    <Router>
      <Switch>
        <Route exact path="api">
          <Redirect to="/" />
        </Route>
        <Route exact path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  );
}
