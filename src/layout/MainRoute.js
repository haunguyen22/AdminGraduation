import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { Component, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { HashRouter, Route, Switch } from "react-router-dom";
import db from "src/firebase.config";
import ReactLoading from "react-loading";
import LoadingScreen from 'react-loading-screen'
const loading = (
  <LoadingScreen
    loading={true}
    bgColor='#f1f1f1'
    // spinnerColor='#6610f2'
    textColor='#676767'
    text={<ReactLoading className="text-center" type="bars" color="#6610f2" />}
  > 
    
  </LoadingScreen>
);

// Containers
const DefaultLayout = React.lazy(() => import("./DefaultLayout"));
const AuthLayout = React.lazy(() => import("./AuthLayout"));

const MainRoute = (props) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [cookies, setCookie] = useCookies(['user']);
  useEffect(() => {
    CheckLogin()
  }, []);
  const CheckLogin = () => {
    if (cookies.user=="null") {
      setLoginStatus(false);
    }
    else{
      setLoginStatus("loading");
      try {
        const user=cookies.user;
        onSnapshot(query(collection(db, "admin"), where("name", "==", user.username), where("pass", "==", user.password)),(snapshot)=>{
          let arr=[];
        snapshot.docs.map(e=>{
          arr.push(e.data())
        })
        if(arr.length>0){
          setLoginStatus(true);
        }
        else{
          setCookie("user", null);
          setLoginStatus(false);
        }
        });
      } catch (error) {
        console.log(error);
      }
    }
    
  };
  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        {
          loginStatus=="loading"?loading:(
            loginStatus ? (
              <Switch>
                <Route
                  path="/"
                  name="Home"
                  render={(props) => <DefaultLayout {...props} />}
                />
              </Switch>
            ) : (
              <Switch>
                <Route
                  path="/"
                  name="Auth"
                  render={(props) => <AuthLayout {...props} />}
                />
              </Switch>
            )
          )
        }
        {" "}
      </React.Suspense>{" "}
    </HashRouter>
  );
};

export default MainRoute;
