import {styles} from "./home.style.js";
import icons from "../../constants/icons.js";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";

import { useFonts } from "expo-font";


function Home(props){

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
                <Text style={{fontSize: 22}}>Resumo do Dia</Text>
                {/* <Text style={{fontSize: 22, fontFamily:'JacquesFrancois'}}>Resumo do Dia</Text> */}
            </TouchableOpacity>
        
            <View>
                <TouchableOpacity style={{...styles.div, width: "50%"}} onPress={OpenTarefas}>
                    <Text style={{fontSize: 22}}>Tarefas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.div, width: "70%",marginLeft: "10%"}} onPress={OpenCompromissos}>
                    <Text style={{fontSize: 22}}>Compromissos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.div, width: "50%",marginLeft: "30%"}} onPress={OpenProjetos}>
                    <Text style={{fontSize: 22}}>Projetos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.div, width: "50%",marginLeft: "50%"}} onPress={OpenEstudos}>
                    <Text style={{fontSize: 22}}>Estudos</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.imgLogo}>
                <Image source={icons.logo}/>
            </View>

            <View>
                <TouchableOpacity style={{...styles.div, width: "60%",marginLeft: "40%"}} onPress={OpenAcademia}>
                    <Text style={{fontSize: 22}}>Academia</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.div, width: "60%",marginLeft: "30%"}} onPress={OpenNutricao}>
                    <Text style={{fontSize: 22}}>Nutrição</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.div, width: "70%",marginLeft: "15%"}} onPress={OpenDespesa}>
                    <Text style={{fontSize: 22}}>Finanças</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.div, width: "70%"}} onPress={OpenInvestimentos}>
                    <Text style={{fontSize: 22}}>Investimentos</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>


    </View>
}

export default Home;