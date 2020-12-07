import React, { useState, useRef, useEffect, useCallback } from "react";
import useMounted from "../../hooks/useMounted";
import uploadImageData, {
  deleteImageData,
  getImages,
} from "../../req/requests";
import ApplicationComponent from "./ApplicationComponent";

export default function Application() {
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
      alert("Seleccione una imágen para subir.");
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

  const existError = imgReq.isError || imgUpload.isError || imgDelete.isError;
  const loadingData =
    imgReq.isLoading || imgUpload.isLoading || imgDelete.isLoading;

  return (
    <ApplicationComponent
      {...{
        existError,
        loadingData,
        inputFileRef,
        onChangeDesc,
        description,
        uploadImage,
        onClickImageDelete,
        images,
      }}
    />
  );
}
