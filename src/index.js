import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { CourseProvider } from "./context";

ReactDOM.render(
  <BrowserRouter>
    <CourseProvider>
      <App />
    </CourseProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
