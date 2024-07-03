import axios from "axios";
import 'dotenv/config';

const dburla = process.env.DBURLAPI;
const authusuario = process.env.USUARIO;
const authsenha = process.env.SENHA;

const URL = "";

const api = axios.create({
    baseURL: URL,
    auth: {
        username: "",
        password: ""
    }
})

export default api;