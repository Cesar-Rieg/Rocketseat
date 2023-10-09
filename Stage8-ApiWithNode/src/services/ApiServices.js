import axios from "axios";
import Environment from '../environment/Environment.js';

export const api = axios.create({
    baseURL: `http://localhost:${Environment.PORT}/`
});