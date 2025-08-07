import axios from "axios";

const axiosbase = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api", // Use the environment variable for the base URL for deployment purpose
  // baseURL: "http://localhost:5500/api", this one for localhost
});

export default axiosbase;
