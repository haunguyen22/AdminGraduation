import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const history=useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const logout=()=>{
    removeCookie("user", {path:'/'})
    history.go(0)
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src="https://lh3.googleusercontent.com/hangouts/AMSf6AGsPkl7UmlWt_f1k5PecfGBP6NQtcgbe-nfqDbjzA89fTXE7-7b3swRFXNk9V8jIfmvcsbvnxa6IU-2GmRYsXv8oFj5uSsTy7G7aVWDAXLbEloWPVN9IXDoiqyRB2HATd3iWlNTCZyZQngLLEOPIxjApljGokI94jfiAxhhHW4Y4NCEeD4pLca0jWbirr6Vf0FDMhSQVcfOIrWzg3RlGx2NdkW_lcbDEeZ0mxqsJzJn0VG2sp-y2_YrJXE6RUmHxbjiSmKNassBlOTnHOAV83igKGPUifq8cc0n21O9rKjPriLe7uAC17-9MfK5t5N81tcFT4RlTn62Fcua8_7fcdnsJRMCNnw9B_23U20pqfm_KjSjdz9VH-OqOK7FbnylY6WBMPS6eR5q89OOBqauY-oV3InfPsVNTapCo_UaJskTlChETIuXszdLQzWybkysO4PhEPxlFfPVpS2FT9G4UUL-DZmPfnjdsDPYpV6rLQi69d-KBJLvjLWoag0p3uZaXjufesrn_uYGJHM1XREd_Gpj4TurIXEVNBIExCaJnFpKvxqmO3pg15zFo3GkZGOL_2v5YBnXNrjX1feDoYWXKOePdXscnIvflm82ymsGoSYlvH0cRWEfbvTYUnyaPtzIXtlC0NlFqiNNmPKSKlM3lwIi1kJ6ii98ugjDnI7rDxvH1WksacehbwsuP3WWL4_AnZem6V-Z65NbIVfPTh0QyNwHLJjJI7WBscQMRyAn49xslUJuLnr2WmG5Hyii_GdtqUPZb71wT1YPnKbg1d8I8iZbJ9WjsSaOmSG5VibDSoHTLrnayS45xzX0L9SPvjELeZXDHJXOgQ9zZo5dfiNv6ouRGOjazpX_ei4n2SjCQBT26sHzjsSuYekd7tgVNTxO4biovNfqK2M49RAvYsE0lsYkqYDhxaIqr4kAzKoFLDQybyM-e5AyTNg08KDQL24ieQPj=w1864-h2298?authuser=0" size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownDivider />
        <CDropdownItem onClick={logout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
