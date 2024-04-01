import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: undefined,
  role: "normal",
};

const UserSlice = createSlice({
  name: "User",
  initialState: { value: initialState },
  reducers: {
    login: (state, action) => {
      const user = action.payload;
      axios.defaults.headers.authorization = `Bearer ${user.token}`;
      localStorage.setItem("user", JSON.stringify(user));
      state.value = user;
    },
    register: (state, action) => {
      console.log(state);
    },
    fetchInfo: (state) => {},
    fetchUserFromDB: (state) => {
      const user = JSON.parse(localStorage.getItem("user"));
      axios.defaults.headers.authorization = `Bearer ${user?.token}`;
      state.value = user;
    },
  },
});

export const { login, register, fetchInfo, fetchUserFromDB } =
  UserSlice.actions;
export default UserSlice.reducer;
