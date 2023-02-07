// Imports needed for IE11 support
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "promise-polyfill/src/polyfill";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
