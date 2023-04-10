import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Discover from './screens/Discover';
import Item from './screens/Item';
import HotelScreen from './screens/HotelScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name='Discover' component={Discover}/>
          <Stack.Screen name='Item' component={Item}/>
          <Stack.Screen name='HotelScreen' component={HotelScreen}/>
          
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}


