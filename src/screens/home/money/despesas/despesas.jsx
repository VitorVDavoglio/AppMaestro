import {styles} from "./despesas.style.js";
import icons from "../../../../constants/icons.js"
import { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";

import Despesa from "../../../../components/despesa/despesa.jsx";

function Despesas(props){
    function OpenDespesa(id){
        props.navigation.navigate("EditDespesas");
    }

    const [total, setTotal] = useState(0);
    const [despesas, setDespesas] = useState([]);

    
    function ListarDespesas(){
        //Simulando o acesso a API
        const dados = [
            {id: 1, icon: icons.moneyCarro, categoria:"Carro", descricao:"Pagamento IPVA", valor:2500},
            {id: 2, icon: icons.moneyCasa, categoria:"Casa", descricao:"Condomínio", valor:620},
            {id: 3, icon: icons.moneyLazer, categoria:"Lazer", descricao:"Sorvete no parque", valor:17.50},
            {id: 4, icon: icons.moneyMercado, categoria:"Mercado", descricao:"Compras Walmart", valor:375},
            {id: 5, icon: icons.moneyTreinamento, categoria:"Educação", descricao:"Faculdade", valor:490},
            {id: 6, icon: icons.moneyLazer, categoria:"Viagem", descricao:"Passagem Aérea", valor:610},
            {id: 7, icon: icons.moneyMercado, categoria:"Mercado", descricao:"Compras Churrasco", valor:144.25},
            {id: 8, icon: icons.moneyLazer, categoria:"Viagem", descricao:"Hotel", valor:330},
        ]

        let soma = 0;
        for (var i=0; i <dados.length; i++){
            soma = soma + dados[i].valor;
        }
        setTotal(soma);
        setDespesas(dados);
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
                            key={desp.id}
                            id={desp.id}
                            icon={desp.icon}
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