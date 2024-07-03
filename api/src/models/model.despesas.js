import { db } from "../config/database.js";

function Listar(callback){

    let ssql = `SELECT finandespesas.iddespesa,financategoria.categoria,finandespesas.valor,finandespesas.dia,finandespesas.mes,finandespesas.ano,finandespesas.descricao,financategoria.icone  FROM finandespesas 
                INNER JOIN financategoria ON finandespesas.idcategoria=financategoria.id
                WHERE finandespesas.tipo = 'S'`;

    db.query(ssql, function(err, result){
        if(err){
            callback(err, []);
        } else {
            callback(undefined, result);
        }
    });
}

export default { Listar };