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
import Switch from "react-switch";
import MUIDataTable from "mui-datatables";
import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import db from "src/firebase.config";

const UserProfiles = () => {
  const columns = ["Email", "Name", "Phone", "Image", "Gender", "Status"];
  const [dataUser, setDataUser] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    try {
      onSnapshot(
        query(collection(db, "client"), where("role", "==", "client")),
        (snapshot) => {
          let arr = [];
          snapshot.docs.map((e) => {
            let data = e.data();
            data.id = e.id;
            arr.push(data);
          });
          setDataUser(arr);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const updateProfile =async (id, status) => {
    const DocRef = doc(db, "client", id);
    try {
      await updateDoc(DocRef, {
        status: status=="active"?"unActive":"active",
      });
      getData()
    } catch (err) {
      alert(err);
    }
  };
  const dataTable = dataUser
    ? dataUser.map((e) => {
        return [
          e.email,
          e.name,
          e.phoneNumber,
          <CAvatar size="lg" src={e.photoURL} status="" />,
          e.sex,
          <Switch
            onChange={() => {updateProfile(e.id, e.status)}}
            checked={e.status == "active" ? true : false}
          />,
        ];
      })
    : [];
  const options = {
    filterType: "checkbox",
  };
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          User Profiles
        </CCardHeader>
        <MUIDataTable
          title={"User Profiles List"}
          data={dataTable}
          columns={columns}
          options={options}
        />
      </CCard>
    </>
  );
};

export default UserProfiles;
