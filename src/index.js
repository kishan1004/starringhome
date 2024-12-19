import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <Router>
      <ConfigProvider theme={{ token: { colorPrimary: "#000" } }}>
        <App />
      </ConfigProvider>
    </Router>
    </HelmetProvider>
  </React.StrictMode>
);
