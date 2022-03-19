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
  const [dataOrder, setDataOrder] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
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
          console.log(arr);
          setDataUser(arr);
        }
      );
      onSnapshot(query(collection(db, "repairmen"), where("status", "==", "active"),),
      (snapshot) => {
        let arr = [];
        snapshot.docs.map((e) => {
          let data = e.data();
          data.id = e.id;
          arr.push(data);
        });
        setDataOrder(arr);
      }
    );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          // "primary"
          value={<>{dataUser ? dataUser.length : 0}</>}
          title="Users"
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
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={
            <>
              {dataOrder?dataOrder.length:0}
            </>
          }
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
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            <>
              2.49{" "}
              <span className="fs-6 fw-normal">
                (84.7% <CIcon icon={cilArrowTop} />)
              </span>
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
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={
            <>
              44K{" "}
              <span className="fs-6 fw-normal">
                (-23.6% <CIcon icon={cilArrowBottom} />)
              </span>
            </>
          }
          title="Sessions"
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
              {/* <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu> */}
            </CDropdown>
          }
          // chart={
          //   <CChartBar
          //     className="mt-3 mx-3"
          //     style={{ height: "70px" }}
          //     data={{
          //       labels: [
          //         "January",
          //         "February",
          //         "March",
          //         "April",
          //         "May",
          //         "June",
          //         "July",
          //         "August",
          //         "September",
          //         "October",
          //         "November",
          //         "December",
          //         "January",
          //         "February",
          //         "March",
          //         "April",
          //       ],
          //       datasets: [
          //         {
          //           label: "My First dataset",
          //           backgroundColor: "rgba(255,255,255,.2)",
          //           borderColor: "rgba(255,255,255,.55)",
          //           data: [
          //             78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84,
          //             67, 82,
          //           ],
          //           barPercentage: 0.6,
          //         },
          //       ],
          //     }}
          //     options={{
          //       maintainAspectRatio: false,
          //       plugins: {
          //         legend: {
          //           display: false,
          //         },
          //       },
          //       scales: {
          //         x: {
          //           grid: {
          //             display: false,
          //             drawTicks: false,
          //           },
          //           ticks: {
          //             display: false,
          //           },
          //         },
          //         y: {
          //           grid: {
          //             display: false,
          //             drawBorder: false,
          //             drawTicks: false,
          //           },
          //           ticks: {
          //             display: false,
          //           },
          //         },
          //       },
          //     }}
          //   />
          // }
        />
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
