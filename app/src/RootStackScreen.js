import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SignUp from '../src/SignUp'
import Login from '../src/Login'
import Home from '../src/Home'
import Camera from '../src/Camera'
import crops from '../src/crops'
import ex from '../src/ex'
const Stack = createStackNavigator();


const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  headerMode='none'>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ex" component={ex} />
        <Stack.Screen name="Camera" component={Camera} />
        
        <Stack.Screen name="crops" component={crops} />
       
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStackScreen