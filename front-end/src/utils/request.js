import axios from "axios";

const getToken = () => localStorage.getItem("token");

axios.defaults.headers.authorization = `Bearer ${getToken()}`;

export const get = axios.get;
export const put = axios.put;
export const post = axios.post;
