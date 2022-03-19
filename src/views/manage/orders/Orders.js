import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import MUIDataTable from "mui-datatables";


const Orders = () => {
  const columns = ["Name", "Company", "City", "State"];

const data = [
 ["Joe James", "Test Corp", "Yonkers", <button>df</button>],
 ["John Walsh", "Test Corp", "Hartford", "CT"],
 ["Bob Herm", "Test Corp", "Tampa", "FL"],
 ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
  filterType: 'checkbox',
};
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
        Orders
        </CCardHeader>
        <MUIDataTable
          title={"Orders List"}
          data={data}
          columns={columns}
          options={options}
        />
      </CCard>
    </>
  )
}

export default Orders
