import axios from "axios";

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_HOST, // Use the VITE_API_BASE_URL variable
});

export default axiosApi;
