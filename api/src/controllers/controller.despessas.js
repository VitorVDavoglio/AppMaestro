import modelDespesas from "../models/model.despesas.js";

function Listar(request, response){

    modelDespesas.Listar(function(err, result){
        if(err){
            response.status(500).send(err);
        } else {
            response.status(200).send(result);
        }
    });
}

export default { Listar };