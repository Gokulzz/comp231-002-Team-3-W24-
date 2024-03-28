import axios from "axios";

const getToken = () => JSON.parse(localStorage?.getItem("token"));

console.log(getToken());

axios.defaults.headers.authorization = `Bearer ${getToken()?.token}`;

export const get = axios.get;
export const put = axios.put;
export const post = axios.post;
