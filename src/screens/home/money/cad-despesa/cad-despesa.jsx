import {styles} from "./cad-despesa.style.js";
import icons from "../../../../constants/icons.js";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native"
import {Picker} from '@react-native-picker/picker';
import { useState, useEffect } from "react";

import apiLocal from "../../../../services/apiLocal.js";

function CadDespesa(props){

    const [id, setId] = useState("");
    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [categoriaBanco, setCategoriaBanco] = useState([]);

    function ListarCategorias(){
        //Simulando o acesso a API
        apiLocal.get("listar/categorias/despesas")
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
        // TODO salvar despesas pela api no banco de dados

        props.navigation.navigate("HomeDespesas");
    }

    function handleExcluir(){
        // TODO apagar despesas pela api no banco de dados

        props.navigation.navigate("HomeDespesas");
    }

    return<View style={styles.container}>

        <View style={styles.containerField}>
            <Text style={styles.inputLabel}>Valor</Text>
            <TextInput placeholder="0,00" style={styles.inputValor} defaultValue="0" keyboardType="decimal-pad" />
        </View>

        <View style={styles.containerField}>
            <Text style={styles.inputLabel}>Descrição</Text>
            <TextInput placeholder="Ex: Aluguel" style={styles.inputText} defaultValue=""/>
        </View>       

        <View style={styles.containerField}>
            <Text style={styles.inputLabel}>Categoria</Text>
            <View style={styles.inputPicker}>
                <Picker selectedValue={categoria} onValueChange={(itemValue) => {
                    setCategoria(itemValue);
                }}>
                    {
                        categoriaBanco.map((dados) => {
                            return <Picker.Item label={dados.categoria} value={dados.id} />
                        })
                    }
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