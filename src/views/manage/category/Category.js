import PropTypes from "prop-types";
import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CAvatar,
} from "@coreui/react";
import { DocsLink } from "src/components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Switch from "react-switch";
import MUIDataTable from "mui-datatables";
import {
  ref as refStorage,
  getStorage,
  uploadBytes,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "src/firebase.config";
// import { Button } from "@coreui/coreui";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const Category = () => {
  const columns = ["Name", "Image", "Role", "Tag", "Action"];
  const [typeActon, setTypeAcction] = useState("add");
  const [showForm, setShowForm] = useState(false);
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  const [dataForm, setDataForm] = useState({
    name: "",
    photoURL: "",
    role: "",
    tag: "",
  });
  const [dataUser, setDataUser] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    try {
      onSnapshot(collection(db, "category"), (snapshot) => {
        let arr = [];
        snapshot.docs.map((e) => {
          let data = e.data();
          data.id = e.id;
          arr.push(data);
        });
        setDataUser(arr);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateCategory = async () => {
    
    const DocRef = doc(db, "category", dataForm.id);
    try {
      const data = {
        name: dataForm.name,
        photoURL: dataForm.photoURL,
        role: dataForm.role,
        tag: dataForm.tag,
      };
      if(file!==null){
        let urlImage = "";
        const storage = getStorage();
        const storageRef = refStorage(storage, `category/${file.name}`);
        await uploadBytes(storageRef, file).then(async (snapshot) => {
          urlImage = await getDownloadURL(storageRef);
        });
        data.photoURL=urlImage;
      }
      await updateDoc(DocRef, data);
      toast("Update category successfully!");
    } catch (err) {
      alert(err);
    }
  };
  const addCategory = async () => {
    try {
      let urlImage = "";
      const storage = getStorage();
      const storageRef = refStorage(storage, `category/${file.name}`);
      await uploadBytes(storageRef, file).then(async (snapshot) => {
        urlImage = await getDownloadURL(storageRef);
      });
      const data = {
        name: dataForm.name,
        photoURL: urlImage,
        role: dataForm.role,
        tag: dataForm.tag,
      };
      await addDoc(collection(db, "category"), data);
      toast("Add category successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeActon == "add") {
      addCategory();
    } else {
      updateCategory();
    }
    getData();
    removeDataForm();
    setModal(false);
    setFile(null)
  };
  const removeDataForm = () => {
    setDataForm({
      name: "",
      photoURL: "",
      role: "",
      tag: "",
    });
  };
  const deleteCategory = async (id) => {
    var result = confirm("Do you want to continue?");

    if (result) {
      await deleteDoc(doc(db, "category", id));
      toast("Delete category successfully!");
    } else {
    }
  };
  const dataTable = dataUser
    ? dataUser.map((e) => {
        return [
          //   e.id,
          e.name,
          <CAvatar size="lg" src={e.photoURL} status="" />,
          e.role,
          e.tag,
          <div style={{ display: "flex" }}>
            <Button
              style={{ backgroundColor: "red", marginLeft: "10px" }}
              color="#3300FF"
              onClick={() => deleteCategory(e.id)}
            >
              Delete
            </Button>
            <Button
              style={{ backgroundColor: "#FFFF66", marginLeft: "10px" }}
              color="#3300FF"
              onClick={() => {
                setTypeAcction("update");
                setDataForm(e);
                setModal(true);
              }}
            >
              Update
            </Button>
          </div>,
        ];
      })
    : [];
  const options = {
    filter: false,
    print: false,
  };
  const toggle = () => {
    setModal(!modal);
  };
  const handleChangeImage = (e) => {
    setFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setDataForm((prevState) => {
          return { ...prevState, photoURL: reader.result };
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <>
      <Button
        style={{ backgroundColor: "#3300FF" }}
        color="#3300FF"
        onClick={() => {
          setModal(true);
          setTypeAcction("add");
          removeDataForm();
        }}
      >
        Add New Category
      </Button>
      <ToastContainer />
      <CCard className="mb-4">
        <CCardHeader>Category</CCardHeader>
        <MUIDataTable
          title={"Category List"}
          data={dataTable}
          columns={columns}
          options={options}
        />
      </CCard>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {typeActon == "add" ? "Add New Category" : "Update Category"}{" "}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <table style={{ width: "80%", marginBottom: "10px" }}>
              <tr>
                <td>
                  <Label for="name">Name: </Label>
                </td>
                <td>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    value={dataForm.name}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <Label for="photoURL">Image: </Label>
                </td>
                <td>
                  <Input
                    onChange={handleChangeImage}
                    style={{ width: "100%" }}
                    type="file"
                    id="photoURL"
                    required={typeActon=="add"?true:false}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <img
                    src={dataForm.photoURL}
                    alt=""
                    style={{ width: "70%", height: "auto" }}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <Label for="role">Role: </Label>
                </td>
                <td>
                  <Input
                    type="text"
                    onChange={handleChange}
                    name="role"
                    style={{ width: "100%" }}
                    id="role"
                    value={dataForm.role}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Label for="tag">Tag: </Label>
                </td>
                <td>
                  <Input
                    type="text"
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    name="tag"
                    id="tag"
                    value={dataForm.tag}
                    required
                  />
                </td>
              </tr>
            </table>

            <ModalFooter>
              <div style={{ display: "flex" }}>
                <Button type="submit" style={{ backgroundColor: "green" }}>
                  Submit
                </Button>
                <Button
                  style={{ backgroundColor: "red", marginLeft: "10px" }}
                  color="#3300FF"
                  onClick={() => {
                    setModal(false);
                    setTypeAcction("add");
                    removeDataForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Category;
