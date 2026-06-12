import axios from "axios";

// For fake store products
const API = axios.create({
  baseURL: "https://fakestoreapi.com",
});

// For your local backend
export const BACKEND_API = axios.create({
  baseURL: "http://localhost:5000",
});

export default API;