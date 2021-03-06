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
    "Client Information",
    "Repairmen Information",
    "List Work",
    "Create Day",
    "Date",
    "Distance",
    "Shipping Fee",
    "Status",
    "Time",
    "Total",
    "Action",
  ];
  const [tab, setTab] = useState('Order');
  const [dataOrder, setdataOrder] = useState([]);
  const [orderDetail, setOrderDetail] = useState(-1);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    getData(tab);
  }, []);
  const getData = (tabData) => {
    try {
      onSnapshot(collection(db, tabData=="Order"?"order":tabData=="Cancel order"?"orderCancel":tabData=="Order Success"?"orderSuccess":"orderDoing"), (snapshot) => {
        let arr = [];
        snapshot.docs.map((e) => {
          let data = e.data();
          data.id = e.id;
          arr.push(data);
        });
        // console.log(arr);
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
          <b style={{color:tab=="Order Success"?"green":tab=="Cancel order"?"red":tab=="Order"?"#FFD700": "orange"}}>{e.status}</b>,

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
  const setDataTab=async(tabSet)=>{
    setTab(tabSet);
    await getData(tabSet);
  }
  return (
    <>
    <div style={styles.tabs}>
        <div
          style={{
            ...styles.tab,
            ...(tab == 'Order' ? styles.activeTab : {}),
          }}
        >
          <button
            onClick={() => setDataTab('Order')}
            style={{
              ...styles.btnTab,
              ...(tab == 'Order' ? styles.btnTabActive : {}),
            }}
          >
            Order
          </button>
        </div>
        <div
          style={{
            ...styles.tab,
            ...(tab == 'Order doing' ? styles.activeTab : {}),
          }}
        >
          <button
            onClick={() => setDataTab('Order doing')}
            style={{
              ...styles.btnTab,
              ...(tab == 'Order doing' ? styles.btnTabActive : {}),
            }}
          >
            {' '}
            Order Doing
          </button>
        </div>
        <div
          style={{
            ...styles.tab,
            ...(tab == 'Order Success' ? styles.activeTab : {}),
          }}
        >
          <button
            onClick={() => setDataTab('Order Success')}
            style={{
              ...styles.btnTab,
              ...(tab == 'Order Success' ? styles.btnTabActive : {}),
            }}
          >
            Order Success
          </button>
        </div>
        <div
          style={{
            ...styles.tab,
            ...(tab == 'Cancel order' ? styles.activeTab : {}),
          }}
        >
          <button
            onClick={() => setDataTab('Cancel order')}
            style={{
              ...styles.btnTab,
              ...(tab == 'Cancel order' ? styles.btnTabActive : {}),
            }}
          >
            Order Cancel
          </button>
        </div>
        
      </div>
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
                  <b>Client Information</b>
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

                  <b>Repairmen Information</b>
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
                  <b>List Work</b>
                  <div style={{ padding:"10px"}}>
                      {dataOrder[orderDetail].bookService.map(e=><div style={{display: "flex"}}>
                        <div >{e.nameService}</div> 
                        <div style={{paddingLeft:"10px"}}><b> ,Price: </b>{e.price} VN??</div>
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
                  <div style={{display: "flex"}}><b>Shipping Fee: </b>
                   <b><div style={{color:"black", paddingLeft:"10px"}}> { dataOrder[orderDetail].shipPrice}VN??</div></b> 
                  </div>
                  <div style={{display: "flex"}}><b>Status: </b>
                    <b><div style={{color:"orange", paddingLeft:"10px"}}> { dataOrder[orderDetail].status}</div></b>
                  </div>
                  <div style={{display: "flex"}}><b>Time: </b>
                    <div style={{paddingLeft:"10px"}}> { dataOrder[orderDetail].time}</div>
                  </div>
                  <div style={{display: "flex"}}><b>Total Price: </b>
                    <b><div style={{color:"red", fontSize:"20px", paddingLeft:"10px"}}> { dataOrder[orderDetail].totalPrice} VN??</div></b>
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
const styles = {
  tabs: {
    justifyContent: 'center',
    display: 'flex',
    marginBottom: '20px',
  },
  tab: {
    marginRight: '10px',
    padding: '10px',
  },
  activeTab: {
    borderBottom: 'solid 2px orange',
  },
  btnTab: {
    border: 'none',
    backgroundColor: 'transparent',
  },
  btnTabActive: {
    border: 'none',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    color: 'orange',
  },
};