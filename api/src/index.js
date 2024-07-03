import 'dotenv/config';
import express, { request } from "express";
import cors from "cors";
import basicAuth from "express-basic-auth";

import routeDespesas from './routes/route.despesas.js';

const app = express();
const authusuario = process.env.USUARIO;
const authsenha = process.env.SENHA;

app.use(express.json());

app.use(cors());

app.use(basicAuth({
    authorizer: function(usuario,senha){
        return basicAuth.safeCompare(usuario, authusuario) && basicAuth.safeCompare(senha, authsenha);
    }
}));

app.use(routeDespesas);


const port = 3004;

app.listen(port, () => {
    console.log("Servidor rodando na porta: " + port);
});