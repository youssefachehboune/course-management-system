import axios from "axios";
import Cookies from "js-cookie";
let baseURL;


baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3001";
const token = Cookies.get("accessToken");
export const axiosInstance = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }), // Only add Authorization if token exists
  },
  withCredentials: true,
});
