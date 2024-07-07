import {styles} from "./despesas.style.js";
import icons from "../../../../constants/icons.js"
import { COLORS } from "../../../../constants/theme.js";
import { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity, Alert} from "react-native";

import Despesa from "../../../../components/despesa/despesa.jsx";
import api from "../../../../services/api.js";
import apiLocal from "../../../../services/apiLocal.js";

function Despesas(props){
    
    const [dados, setDados] = useState([]);
    const [total, setTotal] = useState(0);
    const [despesas, setDespesas] = useState([]);
    const [dataDespesas, setDataDespesas]= useState([]);
    const [select, SetSelect] = useState("");
    const [diaAtual, SetDiaAtual] = useState(0)
    const [mesAtual, SetMesAtual] = useState(0)
    const [anoAtual, SetAnoAtual] = useState(0)
    
    
    function OpenDespesa(){
        props.navigation.navigate("EditDespesas", {
            operacao: "Nova"
        });
    }

    const EditarDespesa = (id) => {
        props.navigation.navigate("EditDespesas", {
            operacao: "Editar",
            iddespesa: id
        });
    }
    
    useEffect(()=> {
        ListarDespesas();

        var data = new Date().toISOString().slice(0, 10);
        var dataSeparada = data.split('-');

        SetDiaAtual(dataSeparada[2]);
        SetMesAtual(dataSeparada[1]);
        SetAnoAtual(dataSeparada[0]);
        
    }, [])

    async function ListarDespesas(){
        setTotal(0);
        SetSelect("D");
        //Simulando o acesso a API
        await api.get("/despesas/listar")
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
        SetSelect("G");
        //Simulando o acesso a API
        await api.get("despesas/listar/ganhos")
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

    async function ListarDetalhes(){
        setTotal(0);
        SetSelect("A");
        setDespesas([]);

        const dados = {
                iddespesa: 999,
                iddespesa: 999,
                icone:"Em falta",
                categoria: "Em falta",
                descricao: "Em falta",
                valor: "Em falta",
        }

        setDespesas(despesas => [...despesas, dados]);

    }


    useEffect(() => {
        organizarDespesas();
    }, [despesas])

    function organizarDespesas() {
        var diasArmazenados = [];
        despesas.map((dados) => {
            var testeDia = dados.dia;
            if(!diasArmazenados.includes(testeDia)){
                diasArmazenados.push(testeDia);
            }
        })
        diasArmazenados.sort((a,b) => b - a);
        setDataDespesas(diasArmazenados);
    }

    return <View style={styles.container}>
        <View style={styles.secaoCima}>
            <View style={styles.textTitulo}>
                <Text style={styles.textTitulo}>Valor gasto em: Julho</Text>
                <Text style={styles.valorTitulo}>R$ {total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</Text>
            </View>

            <View style={styles.divBotoEscolha}>
                <TouchableOpacity style={styles.divBotaoEscolha} onPress={ListarDespesas}>
                    <View style={{backgroundColor: select==="D"? COLORS.green_select : COLORS.white, ...styles.imgTitulo}}>
                        <Image source={icons.moneySaida}/>
                    </View>
                    <Text style={styles.textTitulo}>Saída</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.divBotaoEscolha} onPress={ListarGanhos}>
                    <View style={{backgroundColor: select==="G"? COLORS.green_select  : COLORS.white, ...styles.imgTitulo}}>
                        <Image source={icons.moneyEntrada}/>
                    </View>
                    <Text style={styles.textTitulo}>Entrada</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.divBotaoEscolha} onPress={ListarDetalhes}>
                    <View style={{backgroundColor: select==="A"? COLORS.green_select  : COLORS.white, ...styles.imgTitulo}}>
                        <Image source={icons.moneyDetalhe}/>
                    </View>
                    <Text style={styles.textTitulo}>Detalhe</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.divBotaoEscolha} onPress={() => OpenDespesa(0)}>
                    <View style={{backgroundColor: COLORS.white, ...styles.imgTitulo}}>
                        <Image source={icons.moneyAdd}/>
                    </View>
                    <Text style={styles.textTitulo}>Add</Text>
                </TouchableOpacity>
                
            </View>
        </View>

        <View style={styles.divBaixaArredon}>
            
            <ScrollView style={styles.scrollDiv}>
                {
                    dataDespesas.map((data) => {
                        const despesasDia = despesas.filter(despesa => despesa.dia === data); // Filtra despesas por dia

                        return (
                        <>
                            
                            <Text style={styles.textData} key={data}>{data}/07/2024</Text>
                            {despesasDia.map((despesa) => ( // Mapeamento das despesas do dia
                            <Despesa
                                key={despesa.iddespesa}
                                id={despesa.iddespesa}
                                icon={despesa.icone}
                                categoria={despesa.categoria}
                                descricao={despesa.descricao}
                                valor={despesa.valor}
                                onClick={EditarDespesa}
                            />
                            ))}
                        </>
                        );
                    })
                }
            </ScrollView>
            
        </View>
    </View>
}

export default Despesas;