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
import { rgbToHex } from "@coreui/utils";
import { DocsLink } from "src/components";
import MUIDataTable from "mui-datatables";
import { collection, onSnapshot } from "firebase/firestore";
import db from "src/firebase.config";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Orders = () => {
  
  const columns = [
    "Information Client",
    "Information Repairmen",
    "Book Service",
    "Create Day",
    "Date",
    "Distance",
    "Ship Price",
    "Status",
    "Time",
    "Total Prices",
    "Action",
  ];
  const [dataOrder, setdataOrder] = useState([]);
  const [orderDetail, setOrderDetail] = useState(-1);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    try {
      onSnapshot(collection(db, "order"), (snapshot) => {
        let arr = [];
        snapshot.docs.map((e) => {
          let data = e.data();
          data.id = e.id;
          arr.push(data);
        });
        console.log(arr);
        setdataOrder(arr);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const toggle = () => {
    setModal(!modal);
  };
  const dataTable = dataOrder
    ? dataOrder.map((e, index) => {
        return [
          e.informationClient.name,
          e.informationRepairmen.name,
          <div>
            {e.bookService.map((b) => (
              <div>{b.nameService}</div>
            ))}
          </div>,
          e.createDay,
          e.date,
          <div style={{textAlign:"center"}}>{e.distance}</div>,
          <div style={{textAlign:"center"}}>{e.shipPrice}</div>,
          <b style={{color:"blue"}}>{e.status}</b>,

          e.time,
          e.totalPrice,
          <div>
            <button
              onClick={()=>{
                setOrderDetail(index)
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
        <CCardHeader>Orders</CCardHeader>
        <MUIDataTable
          title={"Orders List"}
          data={dataTable}
          columns={columns}
          options={options}
        />
      </CCard>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Order  #{ orderDetail!==-1 && dataOrder[orderDetail].id}</ModalHeader>
        <ModalBody>
          {dataOrder!==null&&orderDetail!==-1 &&(
            <div style={{margin:"50px" }}>
              <div>
                  <b>Information Client </b>
                  <div style={{display: "flex"}}>
                    <div style={{width:"25%"}}>
                      <img style={{width:"100%", borderRadius:"30%", padding:"10px", margin:"5px"}} src={dataOrder[orderDetail].informationClient.photoURL} status="" />
                    </div>
                    <div style={{ paddingLeft:"10px"}}>
                      Name: { dataOrder[orderDetail].informationClient.name } <br></br>
                      Age: { dataOrder[orderDetail].informationClient.age }<br></br>
                      Phone: { dataOrder[orderDetail].informationClient.sdt }<br></br>
                      Gender: { dataOrder[orderDetail].informationClient.sex }<br></br>
                    </div>
                  </div>

                  <b>Information Repairmen </b>
                  <div style={{display: "flex"}}>
                    <div style={{width:"25%"}}>
                      <img style={{width:"100%", borderRadius:"30%", padding:"10px", margin:"5px"}} src={dataOrder[orderDetail].informationRepairmen.photoURL} status="" />
                    </div>
                    <div>
                      Name: { dataOrder[orderDetail].informationRepairmen.name } <br></br>
                      Job: { dataOrder[orderDetail].informationRepairmen.job } <br></br>
                      Age: { dataOrder[orderDetail].informationRepairmen.age }<br></br>
                      Phone: { dataOrder[orderDetail].informationRepairmen.sdt }<br></br>
                      Gender: { dataOrder[orderDetail].informationRepairmen.sex }<br></br>
                    </div>
                  </div>
                  <b>Book Service</b>
                  <div style={{ padding:"10px"}}>
                      {dataOrder[orderDetail].bookService.map(e=><div style={{display: "flex"}}>
                        <div >{e.nameService}</div> 
                        <div style={{paddingLeft:"10px"}}><b> ,Price: </b>{e.price} VNĐ</div>
                      </div>) }
                  </div>
                  <div style={{display: "flex"}}><b>Create Day: </b>
                    <div style={{paddingLeft:"10px"}}> { dataOrder[orderDetail].createDay}</div>
                  </div>
                  <div style={{display: "flex"}}><b>Date: </b>
                    <div style={{paddingLeft:"10px"}}> { dataOrder[orderDetail].date}</div>
                  </div>
                  <div style={{display: "flex"}}><b>Distance: </b>
                    <div style={{paddingLeft:"10px"}}> { dataOrder[orderDetail].distance}</div>
                  </div>
                  <div style={{display: "flex"}}><b>Ship Price: </b>
                   <b><div style={{color:"black", paddingLeft:"10px"}}> { dataOrder[orderDetail].shipPrice}VNĐ</div></b> 
                  </div>
                  <div style={{display: "flex"}}><b>Status: </b>
                    <b><div style={{color:"blue", paddingLeft:"10px"}}> { dataOrder[orderDetail].status}</div></b>
                  </div>
                  <div style={{display: "flex"}}><b>Time: </b>
                    <div style={{paddingLeft:"10px"}}> { dataOrder[orderDetail].time}</div>
                  </div>
                  <div style={{display: "flex"}}><b>Total Price: </b>
                    <b><div style={{color:"red", fontSize:"20px", paddingLeft:"10px"}}> { dataOrder[orderDetail].totalPrice} VNĐ</div></b>
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

export default Orders;
