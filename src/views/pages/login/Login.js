import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useCookies } from "react-cookie";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { useHistory } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import db from "src/firebase.config";

const Login = () => {
  const history = useHistory();
  const [cookies, setCookie] = useCookies(["user"]);
  const [form, setForm] = useState(null);
  const [err, setErr]=useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = cookies.user;
      onSnapshot(
        query(
          collection(db, "admin"),
          where("name", "==", form.username),
          where("pass", "==", form.password)
        ),
        async (snapshot) => {
          let arr = [];
          snapshot.docs.map((e) => {
            arr.push(e.data());
          });
          if (arr.length > 0) {
            await setCookie("user", {
              username: form.username,
              password: form.password,
            });
            history.push("/");
            history.go(0);
          } else {
            setErr("Admin account is incorrect!")
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        name="username"
                        onChange={handleChange}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        required
                      />
                    </CInputGroup>
                    
                      {
                        err&&(
                          <div style={{marginBottom:"20px", color:"red"}}>{err}</div>
                        )
                      }
                    
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
