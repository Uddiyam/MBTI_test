import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Router />
  </BrowserRouter>
);
