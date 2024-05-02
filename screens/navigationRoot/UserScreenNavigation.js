import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../userScreens/LoginScreen'
import WelcomeScreen from '../common/WelcomeScreen'
import SplashScreen from '../common/SplashScreen'

const Stack = createStackNavigator()
const UserScreenNavigation = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="welcome" component={WelcomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="splash" component={SplashScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}
export default UserScreenNavigation