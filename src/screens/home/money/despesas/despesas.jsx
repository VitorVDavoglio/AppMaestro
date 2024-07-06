import {styles} from "./despesas.style.js";
import icons from "../../../../constants/icons.js"
import { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity, Alert} from "react-native";

import Despesa from "../../../../components/despesa/despesa.jsx";
import api from "../../../../services/api.js";
import apiLocal from "../../../../services/apiLocal.js";

function Despesas(props){
    
    const [dados, setDados] = useState([]);
    const [total, setTotal] = useState(0);
    const [despesas, setDespesas] = useState([]);
    
    
    function OpenDespesa(id){
        props.navigation.navigate("EditDespesas", {detail: {
            operacao: "novaDespesa",
            iddespesa: id
        }});
    }

    function EditarDespesa(id){
        props.navigation.navigate("EditDespesas", {detail: {
            operacao: "EditarDespesa"
        }});
        Alert.alert(id)
    }
    
    async function ListarDespesas(){
        setTotal(0);
        //Simulando o acesso a API
        await api.get("listar/despesas")
        .then((resp) => {
            setDespesas(resp.data);
            resp.data.map(dado => {
                setTotal(total => total + dado.valor)
            })
        })
        .catch((err) => {
            alert("Erro ao carregar os dados" + err);
        })
    }

    async function ListarGanhos(){
        setTotal(0);
        //Simulando o acesso a API
        await apiLocal.get("despesas/listar/ganhos")
        .then((resp) => {
            setDespesas(resp.data);
            resp.data.map(dado => {
                setTotal(total => total + dado.valor)
            })
        })
        .catch((err) => {
            alert("Erro ao carregar os dados" + err);
        })
    }

    useEffect(()=> {
        ListarDespesas();
    }, [])

    return <View style={styles.container}>
        <View style={styles.secaoCima}>
            <View style={styles.textTitulo}>
                <Text style={styles.textTitulo}>Valor gasto em: Julho</Text>
                <Text style={styles.valorTitulo}>R$ {total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</Text>
            </View>

            <View style={styles.divBotoEscolha}>
                <TouchableOpacity style={styles.divBotaoEscolha} onPress={ListarDespesas}>
                    <View style={styles.imgTitulo}>
                        <Image source={icons.moneySaida}/>
                    </View>
                    <Text style={styles.textTitulo}>Saída</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.divBotaoEscolha} onPress={ListarGanhos}>
                    <View style={styles.imgTitulo}>
                        <Image source={icons.moneyEntrada}/>
                    </View>
                    <Text style={styles.textTitulo}>Entrada</Text>
                </TouchableOpacity>

                <View style={styles.divBotaoEscolha}>
                    <View style={styles.imgTitulo}>
                        <Image source={icons.moneyDetalhe}/>
                    </View>
                    <Text style={styles.textTitulo}>Detalhe</Text>
                </View>
                
                <TouchableOpacity style={styles.divBotaoEscolha} onPress={() => OpenDespesa(0)}>
                    <View style={styles.imgTitulo}>
                        <Image source={icons.moneyAdd}/>
                    </View>
                    <Text style={styles.textTitulo}>Add</Text>
                </TouchableOpacity>
                
            </View>
        </View>

        <View style={styles.divBaixaArredon}>
            
            <ScrollView style={styles.scrollDiv}>
                {
                    despesas.map((desp) =>{
                        return <Despesa 
                            key={desp.iddespesa}
                            id={desp.iddespesa}
                            icon={desp.icone}
                            categoria={desp.categoria}
                            descricao={desp.descricao}
                            valor={desp.valor}
                            onClick={EditarDespesa}
                        />
                        
                    })
                }
            </ScrollView>
            
        </View>
    </View>
}

export default Despesas;