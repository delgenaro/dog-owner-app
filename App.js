import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import DogRegistrationScreen from './src/screens/DogRegistrationScreen'
import DietResultScreen from './src/screens/DietResultScreen'
import PremiumMealPlanScreen from './src/screens/PremiumMealPlanScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#4A90D9' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' }
        }}
      >
        <Stack.Screen
          name="DogRegistration"
          component={DogRegistrationScreen}
          options={{ title: 'Cadastro do CÃ£o' }}
        />
        <Stack.Screen
          name="DietResult"
          component={DietResultScreen}
          options={{ title: 'Plano Alimentar' }}
        />
        <Stack.Screen
          name="PremiumMealPlan"
          component={PremiumMealPlanScreen}
          options={{ title: 'Lista de Compras Premium' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
