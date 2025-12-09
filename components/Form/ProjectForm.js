import { useState, useEffect, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Form.module.scss";
import Image from "next/legacy/image";
import loading from "@/assets/loading.svg";
import CloseIcon from "@mui/icons-material/Close";
import imageCompression from "browser-image-compression";
import Router from "next/router";
import db from "@/services/firestore";
import { storage } from "@/services/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, doc, updateDoc } from "@firebase/firestore";
import { fourGenerator, sixGenerator } from "@/services/utility";

export default function ProjectForm() {
  const { editProject, setEditProject } = useContext(StateContext);
  const [title, setTitle] = useState(editProject?.title || "");
  const [location, setLocation] = useState(editProject?.location || "");
  const [year, setYear] = useState(editProject?.year || "");
  const [category, setCategory] = useState(editProject?.category || "");
  const [orientation, setOrientation] = useState(
    editProject?.orientation || ""
  );
  const [order, setOrder] = useState(editProject?.order || "");
  const [description, setDescription] = useState(
    editProject?.description || ""
  );
  const [alert, setAlert] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const categories = ["residential", "commercial", "lighting", "construction"];
  const orientations = ["portrait", "landscape"];
  const orders = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  );

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  };

  const handleSubmit = async () => {
    if (
      !title ||
      !location ||
      !year ||
      !category ||
      !orientation ||
      !order ||
      !description
    ) {
      showAlert("All fields required");
      setDisableButton(false);
      return;
    }
    if (!editProject && imagesPreview.length === 0) {
      showAlert("Select images");
      setDisableButton(false);
      return;
    }
    setDisableButton(true);

    const totalSteps = imagesPreview.length;
    const progressIncrement = 100 / totalSteps;

    try {
      const path = editProject?.path || [];
      const folder = editProject?.folder || `pro${sixGenerator()}`;
      for (const media of uploadImages) {
        const name = `img${fourGenerator()}`;
        const imgPath = `Projects/${folder}/${name}`;
        const compressedFile = await compressImage(media);
        const storageRef = ref(storage, imgPath);
        await uploadBytes(storageRef, compressedFile);
        path.push(imgPath);
        setProgress((prevProgress) => prevProgress + progressIncrement);
      }
      const projectObject = {
        title: title.trim(),
        location: location.trim(),
        year: year.trim(),
        category: category,
        orientation: orientation,
        order: order,
        description: description.trim(),
        path: path,
        hero: editProject?.hero || path[0],
        folder: folder,
        active: false,
        createdAt: new Date().toISOString(),
      };
      let docRef = null;
      if (editProject) {
        docRef = doc(db, "Projects", editProject.id);
        await updateDoc(docRef, projectObject);
      } else {
        docRef = await addDoc(collection(db, "Projects"), projectObject);
      }
      if (docRef.id) {
        setTitle("");
        setLocation("");
        setYear("");
        setCategory("");
        setOrientation("");
        setOrder("");
        setDescription("");
        removeImageInputFile();
        setProgress(100);
        setEditProject(null);
        showAlert("Project saved successfully!");
        setTimeout(() => {
          Router.push("/work");
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
      <h3
        style={{
          fontFamily: "OpenSansRegular",
        }}
      >
        {editProject ? "Edit" : "Add"} Project
      </h3>
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
        <div className={classes.input}>
          <div className={classes.bar}>
            <p className={classes.label}>
              Orientation
              <span>*</span>
            </p>
          </div>
          <select
            value={orientation || "default"}
            onChange={(e) => setOrientation(e.target.value)}
          >
            <option value="default" disabled>
              Select
            </option>
            {orientations.map((orientation, index) => {
              return (
                <option key={index} value={orientation}>
                  {orientation}
                </option>
              );
            })}
          </select>
        </div>
        <div className={classes.input}>
          <div className={classes.bar}>
            <p className={classes.label}>
              Oreder
              <span>*</span>
            </p>
          </div>
          <select
            value={order || "default"}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="default" disabled>
              Select
            </option>
            {orders.map((order, index) => {
              return (
                <option key={index} value={order}>
                  {order}
                </option>
              );
            })}
          </select>
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
            <p>Select Multiple Images</p>
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
            <span>Save</span>
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
