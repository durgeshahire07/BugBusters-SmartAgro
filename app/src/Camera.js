import React, { useState, useEffect , useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal , Image, SafeAreaView} from 'react-native';
import { Camera } from 'expo-camera';
import {FontAwesome} from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios'


var FormData = require('form-data');

const camera = ({navigation}) => {
  const camRef =useRef(null); 
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHaspermission] = useState(null);
  const [capturePhoto, setCapturePhoto]= useState(null);
  const [open, setOpen]= useState(false);
  const [pic,setPic] = useState({
    link: ''
  })

  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHaspermission(status === 'granted');
    })();
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      setHaspermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

   async function takePicture(){
     if(camRef){
       const data = await camRef.current.takePictureAsync();
       setCapturePhoto(data.uri);
       setOpen(true);
       setPic({
         ...pic,
         link: data.uri
       })
      //  console.log(pic.link);
     }

   }

// updatePhoto = () => {
//   setData({
//     ...data,
//     data: ''
//   })
// }

  //  async function savePicture(){
  //    return(
  //     let req = new FormData();
  //     req.append('landImag', `${pic.link}`)
  //     console.log(req)
  //     try {
        
  //       var config = {
  //           method: 'post',
  //           url: 'http://192.168.43.19:3100/api/v1/auth/getCrops',
  //           headers: {},
  //           data : req
  //       };
  //       const response = await axios(config)
  //       console.log(response)
  //       if (response.data.success) {
  //         console.log("success")
  //           // navigation.navigate('Home',{userData: response.config.data})
  //       }
  //       else {
  //           alert("something went wrong!")
  //       }
  //   } catch (error) {
  //       console.log(error)
  //       alert(error)
        
  //   }
  //    )
 
  //  }

  const savePic = () => {
    var photo = {
      landImage: pic.link
    };
    var body = new FormData();
    
    body.append(photo)
    console.log(body)
    console.log(body._parts[0][0]);

    var xhr = new XMLHttpRequest();
    xhr.open('POST','http://192.168.43.19:3100/api/v1/auth/getCrops')
    xhr.send(body._parts[0][0])
    navigation.navigate('Home')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera style= {{flex: 1}} 
      type={type}
      ref={camRef}
      >
        <View style={{flex : 1, backgroundColor: 'transparent', flexDirection:'row'}}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom:20,
              left : 20,
            }
              
            }
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
                );
            }}
            >
            <Text style={{fontSize: 20, marginBottom:13, color : '#FFF'}}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <FontAwesome name ="camera" size={23} color ="#FFF"/>

      </TouchableOpacity>

      {capturePhoto &&
        <Modal animationType = "slide"
        transparent ={false}
        visible ={open}>
          <View style ={{flex: 1, justifyContent:'center', alignItems:'center' , margin : 20}}>
            <View style={{margin:10, flexDirection :'row'}} >
            <TouchableOpacity style={{margin : 10}} onPress={()=> setOpen(false)} >
              <FontAwesome name="window-close" size={50} color="#FF0000"/>
            </TouchableOpacity>

            <TouchableOpacity style={{margin : 10}} onPress={savePic} >
            {/* <TouchableOpacity style={{margin : 10}}  > */}
              <FontAwesome name="upload" size={50} color="#121212"/>
            </TouchableOpacity>

            </View>
            

            <Image style={{width : '100%' , height : 450 , borderRadius: 20}}
            source={{uri : capturePhoto }} />

          </View>
          
        </Modal>
      }
    </SafeAreaView>
  );
}

export default camera

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : 'center'
  },
  button :{
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#121212',
    margin : 20,
    borderRadius : 10,
    height : 50,
  }
});