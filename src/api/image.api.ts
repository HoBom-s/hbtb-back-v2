import axios from "axios";
import { config } from "dotenv";

config();

const axiosInstance = axios.create({
  // baseURL: process.env.IMAGE_HOST,
  baseURL: "http://localhost:3000",
  timeout: 3000,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
