import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { height } from '@mui/system'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand style={{backgroundColor:"white", borderRight:"0.1px solid gainsboro"}} className="d-md-flex" to="/">
        <img style={{width:"37%"}} width="200px" src='https://scontent.fdad1-1.fna.fbcdn.net/v/t1.15752-9/276036240_1085031082080946_1051537627686133592_n.png?_nc_cat=109&ccb=1-5&_nc_sid=ae9488&_nc_ohc=GKUYtZ2scv0AX-KQzW0&tn=I-_9vYFzLqWq7bGs&_nc_ht=scontent.fdad1-1.fna&oh=03_AVK_sTDv79ZqlQ37ApJCe8rYa7NR5EySl6grv8Jma0eCnw&oe=625F82E2'/>
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
