import axios from "axios";
import { config } from "dotenv";

config();

const axiosInstance = axios.create({
  baseURL: process.env.IMAGE_HOST,
  timeout: 4000,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
