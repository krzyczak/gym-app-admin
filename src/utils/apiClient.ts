import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

client.defaults.headers.common.Authorization = "";

export default client;
