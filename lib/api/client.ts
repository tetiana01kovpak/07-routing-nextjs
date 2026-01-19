import axios from "axios";

export const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

export const getAuthHeaders = () => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (!token) {
    throw new Error("Missing NEXT_PUBLIC_NOTEHUB_TOKEN");
  }
  return { Authorization: `Bearer ${token}` };
};
