import React, { lazy, useState } from 'react'
import { useEffect } from 'react'
import db from "../../firebase.config"
import { onSnapshot, collection } from 'firebase/firestore'
import Orders from '../manage/orders/Orders'
const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown />
      <Orders/>
    </>
  )
}

export default Dashboard
