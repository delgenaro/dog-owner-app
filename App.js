import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import DogRegistrationScreen from './src/screens/DogRegistrationScreen'

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
      </Stack.Navigator>
    </NavigationContainer>
  )
}
