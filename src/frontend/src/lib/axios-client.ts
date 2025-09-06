import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEST_API_URL!,
  headers: { "Content-Type": "application/json" },
  allowAbsoluteUrls: false,
  method: "GET",
});

export default axiosClient;
