import {styles} from "./cad-despesa.style.js";
import icons from "../../../../constants/icons.js";
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native"
import {Picker} from '@react-native-picker/picker';
import { useState, useEffect } from "react";
import MaskInput, {Masks} from "react-native-mask-input";

import api from "../../../../services/api.js";

import apiLocal from "../../../../services/apiLocal.js";

function CadDespesa(props){

    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [categoriaBanco, setCategoriaBanco] = useState([{id:"N/A", categoria:"N/A"}]);
    const [tipo, setTipo] = useState("");
    const [tipoValor, setTipoValor] = useState([{id:"N/A", categoria:"N/A"},{id:"S", categoria:"Saída"}, {id:"E", categoria:"Entrada"} ]);
    const [dataInserir, setDataInserir] = useState("");

    const [buscarDadosProntos,setBuscarDadosProntos] = useState("");

    const username = 'admin';
    const password = 'admin';
    const credentials = btoa(`${username}:${password}`);

    useEffect(()=> {
        props.navigation.setOptions({
            title: props.route.params.operacao === "Nova" ? "Nova Despesa" : "Editar Despesa"
        });

        if(props.route.params.operacao === "Nova"){
            ListarCategorias();
        }else{
            // TODO ao inves de zerar posso puxar do banco de dados as categorias que tem e eliminar a que eu ja tenho cadastrado na despesa
            setCategoriaBanco([]);
            setTipoValor([]);
            BuscarDadoDespesa(props.route.params.iddespesa);
        }

        
    }, [])

    function ListarCategorias(){
        api.get("despesas/listar/categorias")
        .then((resp) => {
            resp.data.map(dados => {
                setCategoriaBanco(categoriaBanco => [...categoriaBanco, dados]);
            })
        })
        .catch((err) => {
            alert("Erro ao carregar os dados" + err);
        })

        var data = new Date().toISOString().slice(0, 10);
        var dataSeparada = data.split('-');

        var dia = dataSeparada[2];
        var mes = dataSeparada[1];
        var ano = dataSeparada[0];

        setDataInserir(dia + "/" + mes + "/" + ano);
    }

    async function BuscarDadoDespesa(id){
        await api.get("despesas/listar/" + id)
        .then((resp) => {
            var valorBanco = (resp.data.valor).toLocaleString('pt-BR', {minimumFractionDigits: 2});

            setValor(valorBanco)
            setDescricao(resp.data.descricao);
            setDataInserir(resp.data.dia + "/" + resp.data.mes + "/" + resp.data.ano);
            const categoriaEditar= {
                id:resp.data.idcategoria, 
                categoria: resp.data.categoria
            };
            setCategoriaBanco(categoriaBanco => [...categoriaBanco, categoriaEditar]);
            setCategoria(resp.data.idcategoria);
            
            if(resp.data.tipo === "S"){
                const tipoEditar= {
                    id: resp.data.tipo,
                    categoria: "Saída"
                }
                setTipoValor(tipoValor => [...tipoValor, tipoEditar])
                setTipo("S")
            }else{
                const tipoEditar= {
                    id: resp.data.tipo,
                    categoria: "Entrada"
                }
                setTipoValor(tipoValor => [...tipoValor, tipoEditar])
                setTipo("E")
            }
        })
        .catch((err) => {
            alert("Erro ao carregar os dados" + err);
        })
    }

    function verificarCampos(){
        if(valor !== ""){
            if(descricao !== ""){
                if(categoria !== "N/A"){

                    if(props.route.params.operacao === "Nova"){
                        handleSalvar();
                    }else{
                        handleEditar();
                    }

                }else{ Alert.alert("Preencha a CATEGORIA")}
            }else{Alert.alert("Preencha a DESCRIÇÃO") }
        } else { Alert.alert("Preencha o VALOR") }
    }

    function handleSalvar(){
        var valorVirgula = valor.replace(/\./g, '');
        var valorR = valorVirgula.replace(/\R/g, '');
        var valorCifrao = valorR.replace(/\$/g, '');
        var valorEspaco = valorCifrao.replace(/\ /g, '');
        var valorPadronizado = valorEspaco.replace(',', '.');
        
        var dataSeparadaFim = dataInserir.split('/');

        var dia = dataSeparadaFim[0];
        var mes = dataSeparadaFim[1];
        var ano = dataSeparadaFim[2];
        

        const jsonBody = {
            idcategoria: String(categoria),
            valor: String(valorPadronizado),
            tipo: String(tipo),
            dia: String(dia),
            mes: String(mes),
            ano: String(ano),
            descricao: String(descricao)
        }
        try {
            fetch("http://54.233.6.56:3001/despesas/Inserir", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Basic ${credentials}`,
                },
                body: JSON.stringify(jsonBody)
            });
            Alert.alert("Dados salvo com sucesso");
            props.navigation.navigate("HomeDespesas");
        } catch (error) {
            console.log(error);
            Alert.alert(error.message);
        }
    }

    function handleEditar(){
        var valorVirgula = valor.replace(/\./g, '');
        var valorR = valorVirgula.replace(/\R/g, '');
        var valorCifrao = valorR.replace(/\$/g, '');
        var valorEspaco = valorCifrao.replace(/\ /g, '');
        var valorPadronizado = valorEspaco.replace(',', '.');
        
        var dataSeparadaFim = dataInserir.split('/');

        var dia = dataSeparadaFim[0];
        var mes = dataSeparadaFim[1];
        var ano = dataSeparadaFim[2];
        

        const jsonBody = {
            idcategoria: String(categoria),
            valor: String(valorPadronizado),
            tipo: String(tipo),
            dia: String(dia),
            mes: String(mes),
            ano: String(ano),
            descricao: String(descricao)
        }
        console.log(jsonBody);
        try {
            fetch("http://54.233.6.56:3001/despesas/Editar/" + props.route.params.iddespesa, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Basic ${credentials}`,
                },
                body: JSON.stringify(jsonBody)
            });
            Alert.alert("Dados salvo com sucesso");
            props.navigation.navigate("HomeDespesas");
        } catch (error) {
            console.log(error);
            Alert.alert(error.message);
        }
    }

    function handleExcluir(){
        api.delete("despesas/Deletar/" + props.route.params.iddespesa)
        .then((resp) => {
            console.log(resp.data);
            Alert.alert("Dado exluído com sucesso");
            props.navigation.navigate("HomeDespesas");
        })
        .catch((err) => {
            alert("Erro ao carregar os dados" + err);
        })

    }

    return<View style={styles.container}>

        <View style={styles.containerField}>
            <Text style={styles.inputLabel}>Valor</Text>
            <MaskInput
                style={styles.inputValor} 
                keyboardType="decimal-pad"
                value={valor}
                onChangeText={setValor}
                mask={Masks.BRL_CURRENCY}
            />                
        </View>

        <View style={styles.containerField}>
            <Text style={styles.inputLabel}>Descrição</Text>
            <TextInput placeholder="Ex: Aluguel" style={styles.inputText} onChangeText={setDescricao} value={descricao}/>
        </View>   

        <View style={styles.containerField}>
            <Text style={styles.inputLabel}>Data</Text>
            <MaskInput
                style={styles.inputText}
                keyboardType="decimal-pad"
                value={dataInserir}
                onChangeText={setDataInserir}
                mask={Masks.DATE_DDMMYYYY}
            />
        </View>     

        <View style={styles.containerField}>
            <Text style={styles.inputLabel}>Categoria</Text>
            <View style={styles.inputPicker}>
                <Picker selectedValue={categoria} onValueChange={(itemValue) => {
                    setCategoria(itemValue);
                }}>
                    {
                        categoriaBanco.map((dados) => {
                            return <Picker.Item key={dados.id} label={dados.categoria} value={dados.id} />
                        })
                    }
                </Picker>
            </View>
        </View>   

        <View style={styles.containerField}>
            <Text style={styles.inputLabel}>Tipo de valor</Text>
            <View style={styles.inputPicker}>
                <Picker selectedValue={tipo} onValueChange={(itemValue) => {
                    setTipo(itemValue);
                }}>
                    {
                        tipoValor.map((dados) => {
                            return <Picker.Item key={dados.id} label={dados.categoria} value={dados.id} />
                        })
                    }
                </Picker>
            </View>
        </View>   

        <View style={styles.containerBtn}>
            <TouchableOpacity style={styles.btn} onPress={verificarCampos}>
                <Text style={styles.btnText}>Salvar</Text>
            </TouchableOpacity>
        </View>

        {
            props.route.params.operacao !== "Nova" ? <>
                <View style={styles.containerDelete}>
                    <TouchableOpacity onPress={handleExcluir}>
                        <Image source={icons.moneyDelete} style={styles.btnDelete}/>
                    </TouchableOpacity>
                </View>
            
            </> : null
        }

    </View>
}

export default CadDespesa;