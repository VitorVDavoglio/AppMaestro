import {styles} from "./cad-despesa.style.js";
import icons from "../../../../constants/icons.js";
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native"
import {Picker} from '@react-native-picker/picker';
import { useState, useEffect } from "react";
import MaskInput, {Masks} from "react-native-mask-input";

import apiLocal from "../../../../services/apiLocal.js";

function CadDespesa(props){

    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [categoriaBanco, setCategoriaBanco] = useState([]);
    const [tipoValor, setTipoValor] = useState("");

    const username = 'admin';
    const password = 'admin';
    const credentials = btoa(`${username}:${password}`);


    function ListarCategorias(){
        //Simulando o acesso a API
        apiLocal.get("despesas/listar/categorias")
        .then((resp) => {
            setCategoriaBanco(resp.data);
        })
        .catch((err) => {
            alert("Erro ao carregar os dados" + err);
        })

    }

    useEffect(()=> {
        ListarCategorias();
    }, [])



    function handleSalvar(){
        var data = new Date().toISOString().slice(0, 10);
        var dataSeparada = data.split('-');

        var valorVirgula = valor.replace(/\./g, '');
        var valorR = valorVirgula.replace(/\R/g, '');
        var valorCifrao = valorR.replace(/\$/g, '');
        var valorEspaco = valorCifrao.replace(/\ /g, '');
        var valorPadronizado = valorEspaco.replace(',', '.');

        var dia = dataSeparada[2];
        var mes = dataSeparada[1];
        var ano = dataSeparada[0];

        const jsonBody = {
            idcategoria: String(categoria),
            valor: String(valorPadronizado),
            tipo: String(tipoValor),
            dia: String(dia),
            mes: String(mes),
            ano: String(ano),
            descricao: String(descricao)
        }

        try {
            fetch("http://192.168.15.9:3004/despesas/Inserir", {
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

    function handleExcluir(){
        // TODO apagar despesas pela api no banco de dados

        props.navigation.navigate("HomeDespesas");
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
                <Picker selectedValue={tipoValor} onValueChange={(itemValue) => {
                    setTipoValor(itemValue);
                }}>
                    <Picker.Item key="Saída" label="Saída" value="S" />
                    <Picker.Item key="Entrada" label="Entrada" value="E" />
                </Picker>
            </View>
        </View>   

        <View style={styles.containerBtn}>
            <TouchableOpacity style={styles.btn} onPress={handleSalvar}>
                <Text style={styles.btnText}>Salvar</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.containerDelete}>
            <TouchableOpacity onPress={handleExcluir}>
                <Image source={icons.moneyDelete} style={styles.btnDelete}/>
            </TouchableOpacity>
        </View>
    </View>
}

export default CadDespesa;