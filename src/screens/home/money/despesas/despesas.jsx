import {styles} from "./despesas.style.js";
import icons from "../../../../constants/icons.js"
import { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";

import Despesa from "../../../../components/despesa/despesa.jsx";
import api from "../../../../services/api.js";

function Despesas(props){
    function OpenDespesa(id){
        props.navigation.navigate("EditDespesas");
    }

    const [dados, setDados] = useState([]);
    const [total, setTotal] = useState(0);
    const [despesas, setDespesas] = useState([]);
    

    
    function ListarDespesas(){
        //Simulando o acesso a API
        api.get("listar/despesas")
        .then((resp) => {
            setDespesas(resp.data);
        })
        .catch((err) => {
            alert("Erro ao carregar os dados" + err);
        })

        let soma = 0;
        for (var i=0; i <dados.length; i++){
            soma = soma + dados[i].valor;
        }
        setTotal(soma);
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
                <View style={styles.divBotaoEscolha}>
                    <View style={styles.imgTitulo}>
                        <Image source={icons.moneyEntrada}/>
                    </View>
                    <Text style={styles.textTitulo}>Entrada</Text>
                </View>

                <View style={styles.divBotaoEscolha}>
                    <View style={styles.imgTitulo}>
                        <Image source={icons.moneySaida}/>
                    </View>
                    <Text style={styles.textTitulo}>Saída</Text>
                </View>

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
                            onClick={OpenDespesa}
                        />
                        
                    })
                }
            </ScrollView>
            
        </View>
    </View>
}

export default Despesas;