import axios from "axios";
const PORT = 3333;

export const api = axios.create({
    baseURL: `http://localhost:${PORT}/`
});