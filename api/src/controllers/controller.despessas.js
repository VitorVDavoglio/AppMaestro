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

function ListarGanhos(request, response){

    modelDespesas.ListarGanhos(function(err, result){
        if(err){
            response.status(500).send(err);
        } else {
            response.status(200).send(result);
        }
    });
}

function ListarDespesas(request, response){

    modelDespesas.ListarDespesas(function(err, result){
        if(err){
            response.status(500).send(err);
        } else {
            response.status(200).send(result);
        }
    });
}

function ListarId(request, response){

    modelDespesas.ListarId(request.params.iddespesa, function(err, result){
        if(err){
            response.status(500).send(err);
        } else{
            response.status(200).send(result);
        }
    });

}

function Inserir(request, response){

    modelDespesas.Inserir(request.body, function(err, result){
        if(err){
            response.status(500).send(err);
        } else{
            response.status(201).send(result);
        }
    });
}

function Editar(request, response){

    modelDespesas.Editar(request.params.iddespesa, request.body, function(err, result){
        if(err){
            response.status(500).send(err);
        } else{
            response.status(200).send(result);
        }
    });

}

function Excluir(request, response){

    modelDespesas.Excluir(request.params.iddespesa, request.body, function(err, result){
        if(err){
            response.status(500).send(err);
        } else{
            response.status(200).send(result);
        }
    });

}

export default { Listar, ListarGanhos, ListarDespesas, ListarId, Inserir, Editar, Excluir, };