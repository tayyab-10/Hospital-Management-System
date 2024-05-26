import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { hmsApi } from "./redux/services/hmsApi.js";
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ApiProvider api={hmsApi}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApiProvider>
  </Router>
);
