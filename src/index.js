import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ConfigProvider theme={{ token: { colorPrimary: "#000" } }}>
        <App />
      </ConfigProvider>
    </Router>
  </React.StrictMode>
);
