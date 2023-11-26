import axios from "axios";

export default class HttpService {

    constructor() {
        this.client = axios.create({
            baseURL: "http://localhost:8000/api",
        });
        
        this.client.interceptors.request.use((config) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });
    }  
}