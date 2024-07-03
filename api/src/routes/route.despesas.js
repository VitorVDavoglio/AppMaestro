import { Router } from "express";
import controllerDespessas from "../controllers/controller.despessas.js";

const routeDespesas = Router();

routeDespesas.get("/listar/despesas", controllerDespessas.Listar);

export default routeDespesas;