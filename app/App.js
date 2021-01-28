import React, {useState} from 'react';
import * as Font from 'expo-font'
import { AppLoading } from 'expo';
import RootStackScreen from './src/RootStackScreen'

const getFonts = () => Font.loadAsync({
    'nunito-regular' : require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-bold' : require('./assets/fonts/Nunito-Bold.ttf'),
    'nunito-semi' : require('./assets/fonts/Nunito-SemiBold.ttf'),
})
  
const YourApp = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  if(fontsLoaded){
    return(
        <RootStackScreen />
    )
  } else {
    return(
      <AppLoading
       startAsync={getFonts}
       onFinish={()=> setFontsLoaded(true)}
       />
    )
  }
}

export default YourApp;