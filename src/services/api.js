import axios from "axios";
// import 'dotenv/config';

// const dburla = process.env.DBURLAPI;
// const authusuario = process.env.USUARIO;
// const authsenha = process.env.SENHA;

const URL = "http://54.233.6.56:3001/";

const api = axios.create({
    baseURL: URL,
    auth: {
        username: "admin",
        password: "admin"
    }
})

export default api;