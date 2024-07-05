import axios from "axios";
// import 'dotenv/config';

// const dburla = process.env.DBURLAPI;
// const authusuario = process.env.USUARIO;
// const authsenha = process.env.SENHA;

const URL = "http://192.168.15.9:3004/";

const apiLocal = axios.create({
    baseURL: URL,
    auth: {
        username: "admin",
        password: "admin"
    }
})

export default apiLocal;