import axios from "axios";

export const ENV = import.meta.env.VITE_ENV;
export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
export const VITE_DOMAIN = import.meta.env.VITE_DOMAIN;
export const VITE_ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export const PAGE_URL = axios.create({
    baseURL: import.meta.env.VITE_PAGE_URL
})

export const SERVER_URL = axios.create({
    baseURL: ENV === 'dev' ? import.meta.env.VITE_DEV_SERVER_URL : import.meta.env.VITE_PROD_SERVER_URL
})
