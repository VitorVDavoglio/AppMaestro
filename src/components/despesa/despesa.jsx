import {styles} from "./despesa.style.js"
import icons from "../../constants/icons.js";
import { View, Text, Image, TouchableOpacity } from "react-native"





function Despesa(props){
    return <TouchableOpacity onPress={() => props.onClick(0)}>
        <View style={styles.despesa}>
            <View style={styles.containerIcon}>
                <Image style={styles.despesaIcon} source={props.icon}/>
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