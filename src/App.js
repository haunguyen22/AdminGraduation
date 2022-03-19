import React, { Component } from "react";
import { LoginContextProvider } from "./global/LoginContext";
import { CookiesProvider } from "react-cookie";
import MainRoute from "./layout/MainRoute";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  render() {
    return (
      <CookiesProvider>
        <MainRoute />
      </CookiesProvider>
    );
  }
}

export default App;
