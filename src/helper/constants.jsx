import axios from "axios";

export const process = import.meta;
export const ENV = process.env.VITE_ENV || 'dev';
export const STRIPE_PUBLISHABLE_KEY = process.VITE_STRIPE_PUBLISHABLE_KEY

export const PAGE_URL = axios.create({
    baseURL: process.env.VITE_PAGE_URL
})

export const SERVER_URL = axios.create({
    baseURL: ENV === 'dev' ? process.env.VITE_DEV_SERVER_URL : process.env.VITE_PROD_SERVER_URL
})
