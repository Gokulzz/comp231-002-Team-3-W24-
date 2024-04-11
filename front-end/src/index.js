import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./@redux/UserSlice/UserSlice";
import { Provider, useDispatch, useSelector } from "react-redux";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./table.css";
import "./global.css";
import 'react-pure-modal/dist/react-pure-modal.min.css';

const store = configureStore({
  reducer: {
    user: UserSlice,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
