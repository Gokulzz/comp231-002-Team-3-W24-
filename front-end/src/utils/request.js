import axios from "axios";

const getToken = () => localStorage.getItem("token");

export const get = axios.get;
export const put = axios.put;
