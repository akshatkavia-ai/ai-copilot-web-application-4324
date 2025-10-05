import axios from "axios";

/**
 * PUBLIC_INTERFACE
 * Axios API client configured with base URL from environment or default.
 *
 * Vite env var: VITE_API_BASE
 * Defaults to http://localhost:3001/api
 */
const BASE =
  import.meta?.env?.VITE_API_BASE?.replace(/\/+$/, "") ||
  "http://localhost:3001/api";

export const api = axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});
