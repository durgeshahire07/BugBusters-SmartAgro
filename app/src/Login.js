import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
    StatusBar,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import Feather from 'react-native-vector-icons/Feather';

// import axios from 'axios'

// const UserContext = React.createContext()

const Login = ({ navigation }) => {


    const [data, setData] = React.useState({
        userEmailId: '',
        password: '',

    });
    const [secureEntry, setSecureEntry] = React.useState({
        secureTextEntry: true
    })
    const textInput = (user) => {
        setData({
            ...data,
            userEmailId: user,
        });
    }
    const handlePasswordChange = (pass) => {
        setData({
            ...data,
            password: pass
        });
    }

    const updateSecureTextEntry = () => {
        setSecureEntry({
            ...secureEntry,
            secureTextEntry: !secureEntry.secureTextEntry
        });
    }
    // async function submitHandler() {
    //     if(data.userEmailId && data.password){
    //     try {
    //         var config = {
    //             method: 'post',
    //             url: 'http://192.168.43.19:3000/api/v1/auth/login',
    //             headers: {},
    //             data: data
    //         };
    //         const response = await axios(config)
    //         console.log(response)
    //         if (response.data.success) {
    //             // <UserContext.Provider value={response.data.data}>
    //             //     <customDrawer />
    //             // </UserContext.Provider>
                
    //             // console.log(response.data.data.firstName)
    //             navigation.navigate('Home',{
    //                 UserId: response.data.data,
    //             })
    //         }
    //         else {
    //             alert("Incorrect username or password")
    //         }
    //     } catch (error) {
    //         console.log(error)
    //             if (error.response.status === 404) {
    //               alert("User not found")
    //           } else if (error.response.status === 500) {
    //               alert("Opps something went wrong")
    //           }
    //     }
    // }
    // else{
    //     alert("Please Enter the required fields")
    // }

    // }


    return (


        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <StatusBar backgroundColor='#008080' barStyle="light-content" />
                <View style={styles.header} />
                <Animatable.View
                    //  animation="fadeInUp"
                    style={styles.footer}
                >

                    <Text style={{
                        
                        fontSize: 28,
                        color: '#008080',
                    }}>Hello There!</Text>
                    <Text style={{
                        
                        fontSize: 18,
                        paddingBottom: 10,
                        color: 'grey',

                    }}>Login to continue</Text>
                    <View style={styles.action}>

                        <TextInput
                            placeholder="Email Address"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(user) => textInput(user)}
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={secureEntry.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(pass) => handlePasswordChange(pass)}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {secureEntry.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="#a6a6a6"
                                    size={17}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="#00e6e6"
                                    size={17}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    

                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}

                            // onPress={submitHandler}
                        >
                            <LinearGradient
                                colors={['#00cccc', '#008080']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff',
                                }]}>Login</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={styles.textPrivate}>
                            <Text style={[{ color: 'grey' }]}>
                                Don't have an Account?
                </Text>
                            <TouchableOpacity
                                // onPress={() => navigation.navigate('SignUp')}
                            >
                                <Text style={[ { color: '#008080' }]}>{" "}Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Animatable.View>
            </ScrollView>
        </View>


    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00cccc'
    },

    safeArea: {
        flex: 1,
        marginTop: StatusBar.currentHeight + 10,
        paddingHorizontal: '3%',
        backgroundColor: '#4700b3'
    },
    header: {
        flex: 2,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 0.1,
        backgroundColor: '#fff', 
        borderTopRightRadius: 30,
        borderTopLeftRadius:30,
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,

    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
       
        borderBottomColor: '#66ffff',
        borderBottomWidth: 2,
    },
    textInput: {
        flex: 1,
        color: '#000000',

    },
    button: {
        alignItems: 'center',
        marginTop: 50,
        paddingBottom: 10,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        elevation: 7,
    },
    textSign: {
        fontSize: 20,
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
});