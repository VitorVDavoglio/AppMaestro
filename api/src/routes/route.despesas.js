import { Router } from "express";
import controllerDespessas from "../controllers/controller.despessas.js";

const routeDespesas = Router();

routeDespesas.get("/listar/despesas", controllerDespessas.Listar);
routeDespesas.get("/listar/categorias/despesas", controllerDespessas.ListarDespesas);

export default routeDespesas;