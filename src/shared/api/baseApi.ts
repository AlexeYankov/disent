import axios from "axios";

export const instance = axios.create({
    // baseURL: 'https://restcountries.com/v3.1/',
    baseURL: process.env.NEXT_PUBLIC_BASE_PUBLICK_URL,
    withCredentials: true,
    headers: {'x-auth-skip': true},
  });