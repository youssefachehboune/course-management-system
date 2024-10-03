import axios from "axios";
import Cookies from "js-cookie";

let baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Function to set the Authorization token
export const setAuthorizationHeader = () => {
  const token = Cookies.get("accessToken");
  if (token) {
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.Authorization;
  }
};


export default axiosInstance;