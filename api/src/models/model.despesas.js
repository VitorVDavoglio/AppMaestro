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
};

function ListarGanhos(callback){

    let ssql = `SELECT finandespesas.iddespesa,financategoria.categoria,finandespesas.valor,finandespesas.dia,finandespesas.mes,finandespesas.ano,finandespesas.descricao,financategoria.icone  FROM finandespesas 
                INNER JOIN financategoria ON finandespesas.idcategoria=financategoria.id
                WHERE finandespesas.tipo = 'E'`;

    db.query(ssql, function(err, result){
        if(err){
            callback(err, []);
        } else {
            callback(undefined, result);
        }
    });
};

function ListarId(iddespesa, callback){

    let ssql = `SELECT finandespesas.iddespesa,financategoria.categoria,finandespesas.idcategoria,finandespesas.valor,finandespesas.dia,finandespesas.mes,finandespesas.ano,finandespesas.descricao,finandespesas.tipo FROM finandespesas 
                INNER JOIN financategoria ON finandespesas.idcategoria=financategoria.id 
                WHERE iddespesa = ? `;
    
    db.query(ssql, [iddespesa], function(err, result){
        if (err){
            callback(err, []);
        } else {
            callback(undefined, result[0]);
        }
    });
}

function ListarDespesas(callback){

    let ssql = `SELECT id, categoria FROM financategoria;`;

    db.query(ssql, function(err, result){
        if(err){
            callback(err, []);
        } else {
            callback(undefined, result);
        }
    });
}

function Inserir(json_desp, callback){

    let ssql = "insert into finandespesas(idcategoria, valor, tipo, dia, mes, ano, descricao)";
    ssql += "values(?, ?, ?, ?, ?, ?, ?)";
    
    db.query(ssql, [json_desp.idcategoria, json_desp.valor, json_desp.tipo, json_desp.dia,
        json_desp.mes, json_desp.ano, json_desp.descricao], function(err, result){
        if (err){
            callback(err, []);
        } else {
            callback(undefined, {id_negocio: result.insertId});
        }
    });
}

function Editar(iddespesa, json_desp, callback){

    let ssql = "update finandespesas set idcategoria=?, valor=?, tipo=?, dia=?, mes=?, ano=?, descricao=? ";
    ssql += "where iddespesa=? ";
    
    db.query(ssql, [json_desp.idcategoria, json_desp.valor, json_desp.tipo,
        json_desp.dia, json_desp.mes, json_desp.ano, json_desp.descricao, iddespesa
    ], function(err, result){
        if (err){
            callback(err, []);
        } else {
            callback(undefined, {iddespesa: iddespesa});
        }
    });
}

function Excluir(iddespesa, json_desp,callback){

    let ssql = "delete from finandespesas ";
    ssql += "where iddespesa=? ";
    
    db.query(ssql, [iddespesa], function(err, result){
        if (err){
            callback(err, []);
        } else {
            callback(undefined, {iddespesa: iddespesa});
        }
    });
}





export default { Listar, ListarGanhos, ListarDespesas, ListarId, Inserir, Editar, Excluir, };