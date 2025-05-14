import { API_URL } from "@/constants/api";
import axios from "axios";

const customAxios = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json, text/plain, */*, multipart/form-data",
  },
  withCredentials: true,
})

export default customAxios;