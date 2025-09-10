import axios from "axios";
import qs from "qs";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEST_API_URL || process.env.NEST_API_URL,
  headers: { "Content-Type": "application/json" },
  allowAbsoluteUrls: false,
  method: "GET",
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: "comma" }),
  },
});

export default axiosClient;
