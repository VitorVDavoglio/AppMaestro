import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/home/home.jsx';
//MONEY
import Despesas from './src/screens/home/money/despesas/despesas.jsx';
import CadDespesa from './src/screens/home/money/cad-despesa/cad-despesa.jsx';

const Stack = createNativeStackNavigator();

export default function App() {
  return (<NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={Home} options={{
        headerShown: false,
      }}/>

      <Stack.Screen name="HomeDespesas" component={Despesas} options={{
        headerShown: false,
      }}/>

      <Stack.Screen name="EditDespesas" component={CadDespesa} options={{
        title: "Despesa",
        headerTitleAlign: "center",
        headerShadowVisible: false,
      }}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

