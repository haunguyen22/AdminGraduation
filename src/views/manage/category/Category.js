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
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

const Category = () => {
  const columns = ["Name", "Image", "Role", "Tag", "Action"];
  const [typeActon, setTypeAcction] = useState("add");
  const [showForm, setShowForm] = useState(false);
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
      await updateDoc(DocRef, dataForm);
      toast("Update category success!");
    } catch (err) {
      alert(err);
    }
  };
  const addCategory = async () => {
    try {
      await addDoc(collection(db, "category"), dataForm);
      toast("Add category success!");
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
    setShowForm(false);
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
      toast("Delete category success!");
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
                setShowForm(true);
              }}
            >
              Update
            </Button>
          </div>,
        ];
      })
    : [];
  const options = {
    filterType: "checkbox",
  };
  return (
    <>
      {showForm && (
        <Form style={{ marginBottom: "20px" }} onSubmit={handleSubmit}>
          <FormGroup >
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              style={{width:"40%"}}
              value={dataForm.name}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="photoURL">Image</Label>
            <Input
              onChange={handleChange}
              style={{width:"40%"}}
              type="text"
              name="photoURL"
              id="photoURL"
              value={dataForm.photoURL}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="role">Role</Label>
            <Input
              type="text"
              onChange={handleChange}
              name="role"
              style={{width:"40%"}}
              id="role"
              value={dataForm.role}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="tag">Tag</Label>
            <Input
              type="text"
              onChange={handleChange}
              style={{width:"40%"}}
              name="tag"
              id="tag"
              value={dataForm.tag}
              required
            />
          </FormGroup>
          <div style={{ display: "flex" }}>
            <Button type="submit">Submit</Button>
            <Button
              style={{ backgroundColor: "red", marginLeft: "10px" }}
              color="#3300FF"
              onClick={() => {
                setShowForm(false);
                setTypeAcction("add");
                removeDataForm();
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
      <Button
        style={{ backgroundColor: "#3300FF" }}
        color="#3300FF"
        onClick={() => {
          setShowForm(true);
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
    </>
  );
};

export default Category;
