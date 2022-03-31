import React, { useEffect, useState } from "react";
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from "@coreui/react";
import { getStyle } from "@coreui/utils";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import { cilArrowBottom, cilArrowTop, cilOptions } from "@coreui/icons";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import db from "src/firebase.config";

const WidgetsDropdown = () => {
  const [dataUser, setDataUser] = useState([]);
  const [dataRepairmen, setDataRepairmen] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData =async () => {
    try {
      onSnapshot(
        query(
          collection(db, "client"),
          where("role", "==", "client"),
          where("status", "==", "active")
        ),
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
      onSnapshot(
        query(collection(db, "repairmen"), where("status", "==", "active")),
        (snapshot) => {
          let arr = [];
          snapshot.docs.map((e) => {
            let data = e.data();
            data.id = e.id;
            arr.push(data);
          });
          setDataRepairmen(arr);
        }
      );
      await onSnapshot(
        collection(db, "order"),
        (snapshot) => { 
          let arr = [];
          snapshot.docs.map((e) => {
            let data = e.data();
            data.id = e.id;
            arr.push(data);
          });
          setDataOrder(arr)
        }
      );
      await onSnapshot(
        collection(db, "orderCancel"),
        (snapshot) => { 
          let arr = [];
          snapshot.docs.map((e) => {
            let data = e.data();
            data.id = e.id;
            arr.push(data);
          });
          setDataOrder([...dataOrder, ...arr]);
        }
      );
      await onSnapshot(
        collection(db, "orderSuccess"),
        (snapshot) => { 
          let arr = [];
          snapshot.docs.map((e) => {
            let data = e.data();
            data.id = e.id;
            arr.push(data);
          });
          setDataOrder([...dataOrder, ...arr]);
        }
      );
      await onSnapshot(
        collection(db, "orderDoing"),
        (snapshot) => { 
          let arr = [];
          snapshot.docs.map((e) => {
            let data = e.data();
            data.id = e.id;
            arr.push(data);
          });
          setDataOrder([...dataOrder, ...arr]);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CRow>
      <CCol sm={6} lg={4}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          // "primary"
          value={<>{dataUser ? dataUser.length : 0}</>}
          title="Households"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle
                color="transparent"
                caret={false}
                className="p-0"
              >
                <CIcon
                  icon={cilOptions}
                  className="text-high-emphasis-inverse"
                />
              </CDropdownToggle>
            </CDropdown>
          }
        />
      </CCol>
      <CCol sm={6} lg={4}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={<>{dataRepairmen ? dataRepairmen.length : 0}</>}
          title="Repairmen"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle
                color="transparent"
                caret={false}
                className="p-0"
              >
                <CIcon
                  icon={cilOptions}
                  className="text-high-emphasis-inverse"
                />
              </CDropdownToggle>
            </CDropdown>
          }
        />
      </CCol>
      <CCol sm={6} lg={4}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            <>
                {dataOrder && dataOrder.length}
            </>
          }
          title="Orders"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle
                color="transparent"
                caret={false}
                className="p-0"
              >
                <CIcon
                  icon={cilOptions}
                  className="text-high-emphasis-inverse"
                />
              </CDropdownToggle>
            </CDropdown>
          }
        />
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
