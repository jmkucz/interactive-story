import axios from "axios";

const Client = axios.create({
    baseURL: "https://localhost:5001/Trapped/",
    credentials: 'same-origin',
    origin: "http://localhost:3000"
})

export default Client