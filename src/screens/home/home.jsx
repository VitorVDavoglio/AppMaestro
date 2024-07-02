import {styles} from "./home.style.js";
import icons from "../../constants/icons.js";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";

import {useFonts} from 'expo-font';


function Home(props){

    const [fontsLoaded] = useFonts({
        'JacquesFrancois': require('../../constants/fonts/JacquesFrancoisShadow-Regular.ttf'),
    })

    function OpenResumo(){

    }

    function OpenTarefas(){
        
    }

    function OpenCompromissos(){
        
    }

    function OpenProjetos(){
        
    }

    function OpenEstudos(){
        
    }

    function OpenAcademia(){
        
    }

    function OpenNutricao(){
        
    }

    function OpenDespesa(){
        props.navigation.navigate("HomeDespesas");
    }

    function OpenInvestimentos(){
        
    }

    return <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={{...styles.div, width: "100%"}} onPress={OpenResumo}>
                <Text style={{fontSize: 22, fontFamily:'JacquesFrancois'}}>Resumo do Dia</Text>
            </TouchableOpacity>
        
            <View>
                <TouchableOpacity style={{...styles.div, width: "50%"}} onPress={OpenTarefas}>
                    <Text style={{fontSize: 22, fontFamily:'JacquesFrancois'}}>Tarefas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.div, width: "60%",marginLeft: "10%"}} onPress={OpenCompromissos}>
                    <Text style={{fontSize: 22, fontFamily:'JacquesFrancois'}}>Compromissos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.div, width: "50%",marginLeft: "30%"}} onPress={OpenProjetos}>
                    <Text style={{fontSize: 22, fontFamily:'JacquesFrancois'}}>Projetos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.div, width: "50%",marginLeft: "50%"}} onPress={OpenEstudos}>
                    <Text style={{fontSize: 22, fontFamily:'JacquesFrancois'}}>Estudos</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.imgLogo}>
                <Image source={icons.logo}/>
            </View>

            <View>
                <TouchableOpacity style={{...styles.div, width: "50%",marginLeft: "50%"}} onPress={OpenAcademia}>
                    <Text style={{fontSize: 22, fontFamily:'JacquesFrancois'}}>Academia</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.div, width: "50%",marginLeft: "30%"}} onPress={OpenNutricao}>
                    <Text style={{fontSize: 22, fontFamily:'JacquesFrancois'}}>Nutrição</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.div, width: "60%",marginLeft: "15%"}} onPress={OpenDespesa}>
                    <Text style={{fontSize: 22, fontFamily:'JacquesFrancois'}}>Finanças</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.div, width: "60%"}} onPress={OpenInvestimentos}>
                    <Text style={{fontSize: 22, fontFamily:'JacquesFrancois'}}>Investimentos</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>


    </View>
}

export default Home;