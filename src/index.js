import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./components/redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <Provider store={store}>
          <ConfigProvider theme={{ token: { colorPrimary: "#000" } }}>
            <App />
          </ConfigProvider>
        </Provider>
      </Router>
    </HelmetProvider>
  </React.StrictMode>
);
