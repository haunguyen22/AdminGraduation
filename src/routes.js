import React from 'react'



const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const UserProfiles = React.lazy(() => import('./views/manage/userProfiles/UserProfiles'))
const Orders= React.lazy(() => import( './views/manage/orders/Orders'))
const RepairmanProfiles = React.lazy(() => import( './views/manage/repairmanProfiles/RepairmanProfiles'))
const Category = React.lazy(() => import( './views/manage/category/Category'))
const Charts = React.lazy(() => import('./views/charts/Charts'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/manage/userProfiles', name: "User Profiles", component: UserProfiles},
  { path: '/manage/orders', name: "Orders", component: Orders},
  { path: '/manage/repairmanProfiles', name: "Repairman Profiles", component: RepairmanProfiles},
  { path: '/manage/category', name: "Category", component: Category},
  { path: '/charts', name: 'Charts', component: Charts },
  
]

export default routes
