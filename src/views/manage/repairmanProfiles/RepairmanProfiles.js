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

const RepairmanProfiles = () => {
  const columns = ["Name", "Phone", "Image", "Role", "Age", "Gender", "Status", "Address", "Distance", "List Work", "Tag", "Total Score AVG", "Total Score Feedback", "Total User Feedback"];
  const [dataUser, setDataUser] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    try {
      onSnapshot(collection(db, "repairmen"),
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
    const DocRef = doc(db, "repairmen", id);
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
          e.name,
          e.phoneNumber,
          <CAvatar size="lg" src={e.photoURL} status="" />,
          e.role,
          e.age,
          e.sex,
          <Switch
            onChange={() => {updateProfile(e.id, e.status)}}
            checked={e.status == "active" ? true : false}
          />,
          e.address,
          e.distance,
          e.listWork, 
          e.tag, 
          e.totalScoreAVG, 
          e.totalScoreFeedBack,
          e.totalUserFeedBack
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
          Repairman Profiles
        </CCardHeader>
        <MUIDataTable
          title={"Repairman Profiles List"}
          data={dataTable}
          columns={columns}
          options={options}
        />
      </CCard>
    </>
  );
};

export default RepairmanProfiles;
