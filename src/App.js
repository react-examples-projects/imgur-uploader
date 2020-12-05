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
import Loader from "./components/loader/Loader";

function App() {
  const [userClicked, setUserClicked] = useState(false);
  const imgNode = useRef(null);
  const [description, setDescription] = useState("");
  const inputFileRef = useRef(null);
  const { init, isLoading, isError, data } = useMounted();
  const [action, setAction] = useState("");
  const [status, setStatus] = useState("");
  const [images, setImages] = useState([]);

  const setState = (type, text) => {
    setAction(type);
    setStatus(text);
  };

  const getAllImages = useCallback(() => {
    setState("download", "Fetch images...");
    
    init(getImages());
    
  }, []);
     
  useEffect(() => {
    if (data && action === "download") {
      setImages(data);
      console.log(data);
    }
    // si los datos cambian ya sean por eliminacion o subida de imagenes
    // se vuelve a actualizar los datos en la IU y se resetean estados
    else if (data && (action === "delete" || action === "upload")) {
      getAllImages();
      setUserClicked(false);
    }
  }, [data, action, getAllImages]);

  useEffect(() => {
    getAllImages();
  }, [getAllImages]);

  const uploadImage = () => {
    if (inputFileRef.current?.files?.length < 1) {
      alert("No there images. Please find a image in your computer.");
      return;
    }
    setState("upload", "Subiendo imagen...");
    init(
      uploadImageData({
        inputFileRef,
        description,
      })
    );
  };

  const deleteImage = (id) => {
    setState("delete", "Eliminando imagen...");
    init(deleteImageData(id));
  };

  const onClickImage = (link) => {
    setUserClicked(true);
    if (imgNode.current) imgNode.current.src = link;
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
      {isError && <span>Error de red</span>}
      <div
        className={`image-carrusel-container${!userClicked ? " hidden" : ""}`}
      >
        <img
          src=""
          alt="test"
          ref={imgNode}
          className="image image-carrusel-preview"
        />
      </div>

      <div className="field">
        <input
          type="file"
          ref={inputFileRef}
          accept="image/*"
          className="btn btn-grad w-100"
          disabled={isLoading}
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
        disabled={isLoading}
      >
        Subir una imágen
      </button>
      <Carrusel {...{ onClickImage, onClickImageDelete, images, isLoading, action }} />
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
