import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../userScreens/LoginScreen'

const Stack = createStackNavigator()
const UserScreenNavigation = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}
export default UserScreenNavigation