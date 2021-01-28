import React from 'react'
import 'react-native-gesture-handler';
import Login from '../src/Login'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

const RootStackScreen = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          {/* <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Daily" component={Daily} /> */}
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

export default RootStackScreen
