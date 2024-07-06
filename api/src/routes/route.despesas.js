import { Router } from "express";
import controllerDespessas from "../controllers/controller.despessas.js";

const routeDespesas = Router();

routeDespesas.get("/despesas/listar", controllerDespessas.Listar);
routeDespesas.get("/despesas/listar/ganhos", controllerDespessas.ListarGanhos);
routeDespesas.get("/despesas/listar/categorias", controllerDespessas.ListarDespesas);
routeDespesas.post("/despesas/Inserir", controllerDespessas.Inserir);
routeDespesas.put("/despesas/Editar/:iddespesa", controllerDespessas.Editar);
routeDespesas.delete("/despesas/Deletar/:iddespesa", controllerDespessas.Excluir);


export default routeDespesas;