import axios from "axios";
import Cookies from "js-cookie";
let baseURL;

try {
  baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  if (!baseURL) {
    throw new Error("NEXT_PUBLIC_BACKEND_API_URL is not defined");
  }
  // console.log('NEXT_PUBLIC_BACKEND_API_URL: ', baseURL);
} catch {
  throw new Error(
    "Base URL is not set. Please define NEXT_PUBLIC_BACKEND_API_URL in your environment variables.",
  );
}
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
