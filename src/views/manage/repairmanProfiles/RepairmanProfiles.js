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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


const RepairmanProfiles = () => {
  const columns = ["Name", "Phone", "Image", "Age", "Gender", "Email", "Status", "Job", "Average score", "Action"];
  const [dataUser, setDataUser] = useState([]);
  const [repairmenDetail, setRepairmenDetail] = useState(-1);
  const [modal, setModal] = useState(false);
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
  const toggle = () => {
    setModal(!modal);
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
    ? dataUser.map((e, index) => {
        return [
          e.name,
          e.phoneNumber,
          <CAvatar size="lg" src={e.photoURL} status="" />,
          <div style={{textAlign:"center"}}>{e.age}</div>,
          <div style={{textAlign:"center"}}>{e.sex}</div>,
          e.email,
          <Switch
            onChange={() => {updateProfile(e.id, e.status)}}
            checked={e.status == "active" ? true : false}
          />,
          <div style={{textAlign:"center"}}>{e.job}</div>,
          <div style={{textAlign:"center"}}>{e.totalAVG}</div>,
          <div>
          <button
            onClick={()=>{
              setRepairmenDetail(index)
              setModal(true)
            }}
            style={{
              backgroundColor: "green",
              marginLeft: "10px",
              color: "white",
              padding: 10,
              border: "none",
            }}
            color="#3300FF"
          >
            Detail
          </button>
        </div>,
        ];
      })
    : [];
  const options = {
      filter: false,
      print: false
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
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Repairman  #{ repairmenDetail!==-1 && dataUser[repairmenDetail].id}</ModalHeader>
        <ModalBody>
          {dataUser!==null&&repairmenDetail!==-1 &&(
            <div style={{margin:"50px" }}>
              <div>
                  <div style={{display: "flex"}}>
                    <div style={{width:"25%"}}>
                      <img style={{width:"100%", borderRadius:"30%"}} src={dataUser[repairmenDetail].photoURL} status="" />
                    </div>
                    <div style={{ paddingLeft:"10px"}}>
                      <b>Name:</b> { dataUser[repairmenDetail].name } <br></br>
                      <b>Age:</b> { dataUser[repairmenDetail].age }<br></br>
                      <b>Phone:</b> { dataUser[repairmenDetail].phoneNumber }<br></br>
                      <b>Email:</b> { dataUser[repairmenDetail].email }<br></br>
                      <b>Gender:</b> { dataUser[repairmenDetail].sex }<br></br>
                      <b>Job:</b> { dataUser[repairmenDetail].job }<br></br>
                      <b>Status:</b><b style={{color:"blue"}}> { dataUser[repairmenDetail].status }</b><br></br>
                      <b>Total AVG:</b> { dataUser[repairmenDetail].totalAVG }<br></br>
                      <b>Total Count:</b> { dataUser[repairmenDetail].totalCount }<br></br>
                      <b>Total Score:</b> { dataUser[repairmenDetail].totalScore }<br></br>
                    </div>
                  </div>

                  </div>
                </div>
          )
              }
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default RepairmanProfiles;
