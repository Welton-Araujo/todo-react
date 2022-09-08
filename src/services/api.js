import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.112:8080/api/todos",
});

export default api;