import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_PUBLICK_URL,
    withCredentials: true,
    headers: {'x-auth-skip': true},
  });