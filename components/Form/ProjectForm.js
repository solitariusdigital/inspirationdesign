import { useState } from "react";
import classes from "./Form.module.scss";
import Image from "next/legacy/image";
import loading from "@/assets/loading.svg";
import CloseIcon from "@mui/icons-material/Close";
import imageCompression from "browser-image-compression";
import db from "@/services/firestore";
import { storage } from "@/services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";
import { fourGenerator, sixGenerator } from "@/services/utility";

export default function ProjectForm() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const categories = ["residential", "commercial", "lighting", "construction"];

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  };

  const handleSubmit = async () => {
    if (!title || !location || !year || !category || !description) {
      showAlert("All fields Required");
      setDisableButton(false);
      return;
    }
    if (imagesPreview.length === 0) {
      showAlert("Select images");
      setDisableButton(false);
      return;
    }
    setDisableButton(true);
    try {
      const links = [];
      const folder = `pro${sixGenerator()}`;
      for (const media of uploadImages) {
        const name = `img${fourGenerator()}`;
        const compressedFile = await compressImage(media);
        const storageRef = ref(storage, `Projects/${folder}/${name}`);
        const snapshot = await uploadBytes(storageRef, compressedFile);
        const downloadURL = await getDownloadURL(snapshot.ref);
        links.push(downloadURL);
      }
      const docRef = await addDoc(collection(db, "Projects"), {
        title: title.trim(),
        location: location.trim(),
        year: year.trim(),
        category: category,
        description: description.trim(),
        links: links,
        hero: links[0],
        createdAt: new Date().toISOString(),
      });
      if (docRef.id) {
        setTitle("");
        setLocation("");
        setYear("");
        setCategory("");
        setDescription("");
        removeImageInputFile();
        setDisableButton(false);
        showAlert("Project saved successfully!");
      }
    } catch (error) {
      console.error("Error adding document:", error);
      showAlert("Failed to save. Please try again later.");
      setDisableButton(false);
    }
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
        Add Project
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
              Location
              <span>*</span>
            </p>
            <CloseIcon
              className="icon"
              onClick={() => setLocation("")}
              sx={{ fontSize: 16 }}
            />
          </div>
          <input
            type="text"
            id="location"
            name="location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            autoComplete="off"
            dir="ltr"
          />
        </div>
        <div className={classes.input}>
          <div className={classes.bar}>
            <p className={classes.label}>
              Category
              <span>*</span>
            </p>
          </div>
          <select
            value={category || "default"}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="default" disabled>
              Select
            </option>
            {categories.map((category, index) => {
              return (
                <option key={index} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
        </div>
        <div className={classes.input}>
          <div className={classes.bar}>
            <p className={classes.label}>
              Year
              <span>*</span>
            </p>
            <CloseIcon
              className="icon"
              onClick={() => setYear("")}
              sx={{ fontSize: 16 }}
            />
          </div>
          <input
            type="tel"
            id="year"
            name="year"
            onChange={(e) => setYear(e.target.value)}
            value={year}
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
              multiple
            />
            <p>Select Images</p>
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
          <Image width={50} height={50} src={loading} alt="isLoading" />
        )}
      </div>
    </div>
  );
}
