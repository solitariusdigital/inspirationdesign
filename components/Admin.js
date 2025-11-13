import { useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Admin.module.scss";
import ProjectForm from "@/components/Form/ProjectForm";
import NewsForm from "@/components/Form/NewsForm";
import Tooltip from "@mui/material/Tooltip";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { convertDate } from "@/services/utility";
import db from "@/services/firestore";
import { collection, getDocs, doc, deleteDoc } from "@firebase/firestore";

export default function Admin() {
  const [pageType, setPageType] = useState("projects" || "news" || "inquiries");
  const navigation = ["projects", "news", "inquiries"];
  const [inquiries, setInquiries] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "Inquiries"));
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setInquiries(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    let confirmationMessage = "Delete - Are you sure?";
    let confirm = window.confirm(confirmationMessage);
    if (confirm) {
      const docRef = doc(db, "Inquiries", id);
      await deleteDoc(docRef);
      setInquiries(null);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.navigation}>
        {navigation.map((nav, index) => (
          <p
            key={index}
            className={pageType === nav ? classes.navActive : classes.nav}
            onClick={() => setPageType(nav)}
          >
            {nav}
          </p>
        ))}
      </div>
      {pageType === "projects" && <ProjectForm />}
      {pageType === "news" && <NewsForm />}
      {pageType === "inquiries" && (
        <div className={classes.gridLayout}>
          {inquiries?.map((item, index) => (
            <div key={index} className={classes.item}>
              <div
                className={classes.message}
                style={{
                  fontFamily: "TitilliumLight",
                }}
              >
                <p>{item.subject}</p>
                <p>{item.message}</p>
              </div>
              <div className={classes.row}>
                <p className={classes.title}>Name</p>
                <p
                  style={{
                    fontFamily: "TitilliumLight",
                  }}
                >
                  {item.name}
                </p>
              </div>
              <div className={classes.row}>
                <p className={classes.title}>Email</p>
                <p
                  style={{
                    fontFamily: "TitilliumLight",
                  }}
                >
                  {item.email}
                </p>
              </div>
              <div className={classes.row}>
                <p className={classes.title}>Phone</p>
                <p
                  style={{
                    fontFamily: "TitilliumLight",
                  }}
                >
                  {item.phone}
                </p>
              </div>
              <div className={classes.row}>
                <Tooltip title="Delete">
                  <DeleteOutlineIcon
                    className="icon"
                    sx={{ fontSize: 18 }}
                    onClick={() => handleDelete(item.id)}
                  />
                </Tooltip>
                <p className={classes.title}>{convertDate(item.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
