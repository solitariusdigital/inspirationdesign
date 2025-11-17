import { useState, useEffect, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/legacy/image";
import loading from "@/assets/loading.svg";
import imageCompression from "browser-image-compression";
import Router from "next/router";
import db from "@/services/firestore";
import { storage } from "@/services/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, doc, updateDoc } from "@firebase/firestore";
import {
  fourGenerator,
  sixGenerator,
  isValidDateFormat,
} from "@/services/utility";

export default function NewsForm() {
  const { editNews, setEditNews } = useContext(StateContext);
  const [title, setTitle] = useState(editNews?.title || "");
  const [date, setDate] = useState(editNews?.date || "");
  const [description, setDescription] = useState(editNews?.description || "");
  const [alert, setAlert] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const [progress, setProgress] = useState(0);

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  };

  const handleSubmit = async () => {
    if (!title || !date || !description) {
      showAlert("All fields required");
      setDisableButton(false);
      return;
    }
    if (!isValidDateFormat(date)) {
      showAlert("Invalid date");
      return;
    }
    if (!editNews && imagesPreview.length === 0) {
      showAlert("Select image");
      setDisableButton(false);
      return;
    }
    setDisableButton(true);

    const totalSteps = imagesPreview.length;
    const progressIncrement = 100 / totalSteps;

    try {
      const path = editNews?.path || [];
      const folder = editNews?.folder || `news${sixGenerator()}`;
      for (const media of uploadImages) {
        const name = `img${fourGenerator()}`;
        const imgPath = `News/${folder}/${name}`;
        const compressedFile = await compressImage(media);
        const storageRef = ref(storage, imgPath);
        await uploadBytes(storageRef, compressedFile);
        path.push(imgPath);
        setProgress((prevProgress) => prevProgress + progressIncrement);
      }
      const newsObject = {
        title: title.trim(),
        date: date.trim(),
        description: description.trim(),
        path: path,
        hero: path.at(-1),
        folder: folder,
        active: false,
        createdAt: new Date().toISOString(),
      };
      let docRef = null;
      if (editNews) {
        docRef = doc(db, "News", editNews.id);
        await updateDoc(docRef, newsObject);
      } else {
        docRef = await addDoc(collection(db, "News"), newsObject);
      }
      if (docRef.id) {
        setTitle("");
        setDate("");
        setDescription("");
        removeImageInputFile();
        setProgress(100);
        setEditNews(null);
        showAlert("News saved successfully!");
        setTimeout(() => {
          Router.push("/news");
        }, 500);
      }
    } catch (error) {
      console.error("Error adding document:", error);
      showAlert("Failed to save. Please try again later.");
    }
    setDisableButton(false);
  };

  const handleImageChange = (event) => {
    const array = Array.from(event.target.files);
    setUploadImages(array);
    setImagesPreview(
      array.map((item) => ({
        file: item,
        link: URL.createObjectURL(item),
      }))
    );
  };

  const removeImageInputFile = () => {
    setImagesPreview([]);
    setUploadImages([]);
    const input = document.getElementById("inputImage");
    input.value = null;
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  return (
    <div className={classes.formBox}>
      <h4
        style={{
          fontFamily: "TitilliumLight",
        }}
      >
        {editNews ? "Edit" : "Add"} News
      </h4>
      <div className={classes.form}>
        <div className={classes.input}>
          <div className={classes.bar}>
            <p className={classes.label}>
              Title
              <span>*</span>
            </p>
            <CloseIcon
              className="icon"
              onClick={() => setTitle("")}
              sx={{ fontSize: 16 }}
            />
          </div>
          <input
            type="text"
            id="title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            autoComplete="off"
          ></input>
        </div>
        <div className={classes.input}>
          <div className={classes.bar}>
            <p className={classes.label}>
              Date
              <span>*</span>
            </p>
            <CloseIcon
              className="icon"
              onClick={() => setDate("")}
              sx={{ fontSize: 16 }}
            />
          </div>
          <input
            placeholder="yyyy-mm-dd"
            type="text"
            id="date"
            name="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            autoComplete="off"
            dir="ltr"
          />
        </div>
      </div>
      <div className={classes.input}>
        <div className={classes.bar}>
          <p className={classes.label}>
            Description
            <span>*</span>
          </p>
          <CloseIcon
            className="icon"
            onClick={() => setDescription("")}
            sx={{ fontSize: 16 }}
          />
        </div>
        <textarea
          type="text"
          id="description"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          autoComplete="off"
        ></textarea>
      </div>
      <div className={classes.mediaContainer}>
        <div>
          <label className="file">
            <input
              onChange={handleImageChange}
              id="inputImage"
              type="file"
              accept="image/*"
            />
            <p>Select Single Image</p>
          </label>
          <CloseIcon
            className={classes.icon}
            sx={{ fontSize: 16 }}
            onClick={() => {
              removeImageInputFile();
            }}
          />
          {imagesPreview.length > 0 && (
            <div className={classes.imageBox}>
              {imagesPreview.map((image, index) => (
                <div className={classes.image} key={index}>
                  <Image
                    src={image.link}
                    layout="fill"
                    objectFit="cover"
                    alt="image"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={classes.formAction}>
        <p className={classes.alert}>{alert}</p>
        {!disableButton ? (
          <button disabled={disableButton} onClick={() => handleSubmit()}>
            Save
          </button>
        ) : (
          <>
            <p className={classes.progress}>
              Uploading {Math.round(progress)}%
            </p>
            <Image width={50} height={50} src={loading} alt="isLoading" />
          </>
        )}
      </div>
    </div>
  );
}
