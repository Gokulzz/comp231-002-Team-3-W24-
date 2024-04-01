import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./@redux/UserSlice/UserSlice";
import { Provider, useDispatch, useSelector } from "react-redux";

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
