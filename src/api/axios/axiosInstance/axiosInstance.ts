import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:2233/api/",
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
});

export default instance;
