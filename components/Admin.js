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
  const { editProject, setEditProject } = useContext(StateContext);
  const { editNews, setEditNews } = useContext(StateContext);
  const [pageType, setPageType] = useState("projects" || "news" || "inquiries");
  const navigation = ["projects", "news", "inquiries"];
  const [inquiries, setInquiries] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (editProject) {
      setPageType("projects");
    }
    if (editNews) {
      setPageType("news");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  }, [refresh]);

  const handleDelete = async (id) => {
    let confirmationMessage = "Delete inquiry - Are you sure?";
    let confirm = window.confirm(confirmationMessage);
    if (confirm) {
      const docRef = doc(db, "Inquiries", id);
      await deleteDoc(docRef);
      setRefresh((prev) => prev + 1);
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
        <>
          {inquiries.length === 0 && (
            <h4
              style={{
                marginTop: "50px",
              }}
            >
              Empty inquiries list
            </h4>
          )}
          <div className={classes.gridLayout}>
            {inquiries?.map((item, index) => (
              <div key={index} className={classes.item}>
                <div className={classes.message}>
                  <p>{item.subject}</p>
                  <p>{item.message}</p>
                </div>
                <div className={classes.row}>
                  <p className={classes.title}>Name</p>
                  <p>{item.name}</p>
                </div>
                <div className={classes.row}>
                  <p className={classes.title}>Email</p>
                  <p>{item.email}</p>
                </div>
                <div className={classes.row}>
                  <p className={classes.title}>Phone</p>
                  <p>{item.phone}</p>
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
        </>
      )}
    </div>
  );
}
