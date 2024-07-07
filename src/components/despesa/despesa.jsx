import {styles} from "./despesa.style.js"
import icons from "../../constants/icons.js";
import { View, Text, Image, TouchableOpacity } from "react-native"
import { useEffect, useState } from "react";





function Despesa(props){

    const [iconeEscolhido, setIconeEscolhido] = useState();

    useEffect(() => {
        mostrarIcones();
    }, [])

    function mostrarIcones(){

        switch (props.categoria) {
            case 'Carro':
                setIconeEscolhido(icons.moneyCarro);
                break;
            case 'Casa':
                setIconeEscolhido(icons.moneyCasa);
                break;
            case 'Educação':
                setIconeEscolhido(icons.moneyTreinamento);
                break;
            case 'Lazer':
                setIconeEscolhido(icons.moneyLazer);
                break;
            case 'Mercado':
                setIconeEscolhido(icons.moneyMercado);
                break;
            case 'Viagem':
                setIconeEscolhido(icons.moneyViagem);
                break;
            case 'Academia':
                setIconeEscolhido(icons.moneyAcademia);
                break;
            case 'Salário':
                setIconeEscolhido(icons.moneySalario);
                break;
            case 'Mesada':
                setIconeEscolhido(icons.moneyMesada);
                break;
            case 'Repasse':
                setIconeEscolhido(icons.moneyRepasse);
                break;
            default:
                break;
        }
    }





    return <TouchableOpacity onPress={() => props.onClick(String(props.id))}>
        <View style={styles.despesa}>
            <View style={styles.containerIcon}>
                <Image style={styles.despesaIcon} source={iconeEscolhido}/>
            </View>

            <View style={styles.containerCategoria}>
                <Text style={styles.despesaCategoria}>{props.categoria}</Text>
                <Text style={styles.despesaDescricao}>{props.descricao}</Text>
            </View>

            <View style={styles.containerValor}>
                <Text style={styles.despesaValor}>{props.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</Text>
            </View>
        </View>
    </TouchableOpacity> 
}

export default Despesa;