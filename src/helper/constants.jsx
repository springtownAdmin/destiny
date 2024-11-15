import axios from "axios";

export const PAGE_URL = axios.create({
    baseURL: import.meta.env.VITE_PAGE_URL
})