import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://hobom-hb-image-server.koyeb.app",
  timeout: 3000,
  headers: { "Content-Type": "multipart/form-data" },
});

export default axiosInstance;
