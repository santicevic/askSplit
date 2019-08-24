import React from "react";
import "./styles/Common.css";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
