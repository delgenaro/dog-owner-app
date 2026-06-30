import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import HomeScreen from './src/screens/HomeScreen'
import DogRegistrationScreen from './src/screens/DogRegistrationScreen'
import DietResultScreen from './src/screens/DietResultScreen'
import PremiumMealPlanScreen from './src/screens/PremiumMealPlanScreen'
import BreedCatalogScreen from './src/screens/BreedCatalogScreen'
import BreedDetailScreen from './src/screens/BreedDetailScreen'
import DogProfileScreen from './src/screens/DogProfileScreen'
import NaturalSupplementsScreen from './src/screens/NaturalSupplementsScreen'

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
          name="Home"
          component={HomeScreen}
          options={{ title: 'Dog Owner App', headerStyle: { backgroundColor: '#357ABD' } }}
        />
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
        <Stack.Screen
          name="BreedCatalog"
          component={BreedCatalogScreen}
          options={{ title: 'CatÃ¡logo de RaÃ§as' }}
        />
        <Stack.Screen
          name="BreedDetail"
          component={BreedDetailScreen}
          options={{ title: 'Detalhes da RaÃ§a' }}
        />
        <Stack.Screen
          name="DogProfile"
          component={DogProfileScreen}
          options={{ title: 'Perfil do CÃ£o' }}
        />
        <Stack.Screen
          name="NaturalSupplements"
          component={NaturalSupplementsScreen}
          options={{ title: 'Suplementos Naturais' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
