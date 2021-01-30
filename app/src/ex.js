import React from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import Picker from '@react-native-picker/picker'
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import axios from 'axios'



const ex = ({ navigation }) => {

    const [data, setData] = React.useState({
        firstName: '',
        lastName: '',
        userEmailId: '',
        password: '',
        location:''
    });

    const [secureEntry, setSecureEntry] = React.useState({
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        confirm_password: '',
       
    })

    const textInputFirstName = (first) => {
        setData({
            ...data,
            firstName: first
        })
    }
    const textInputLocation = (loc) => {
        setData({
            ...data,
            location: loc
        })
    }
    const textInputlastName = (last) => {
        setData({
            ...data,
            lastName: last
        })
    }
    const textInputChange = (user) => {

        if (user.length > 10) {
            setSecureEntry({
                ...secureEntry,
                check_textInputChange: true
            })
            setData({
                ...data,
                userEmailId: user,
            });
        } else {
            setSecureEntry({
                ...secureEntry,
                check_textInputChange: false
            })
            setData({
                ...data,
                userEmailId: user
            });
        }
    }

    const handlePasswordChange = (pass1) => {
        setData({
            ...data,
            password: pass1
        });
    }

    const updateSecureTextEntry = () => {
        setSecureEntry({
            ...secureEntry,
            secureTextEntry: !secureEntry.secureTextEntry
        });
    }

    const handleConfirmPasswordChange = (pass2) => {
        setSecureEntry({
            ...secureEntry,
            confirm_password: pass2
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setSecureEntry({
            ...secureEntry,
            confirm_secureTextEntry: !secureEntry.confirm_secureTextEntry
        });
    }

    async function submitHandler() {
        setSecureEntry({
            ...secureEntry,
        })
       
        if (data.password != secureEntry.confirm_password) {
            alert("password don't match")
        }
        else if(data.password && data.firstName && data.lastName && data.userEmailId) {
            try {
                var config = {
                    method: 'post',
                    url: 'http://192.168.43.19:3100/api/v1/auth/register',
                    headers: {},
                    data: data
                };
                const response = await axios(config)
                console.log(response.config.data)
                if (response.data.success) {
                    setSecureEntry({
                        ...secureEntry,
                        isLoading: false
                    })
                    navigation.navigate('Home',{userData: response.config.data})
                }
                else {
                    alert("Sign Up failed")
                    setSecureEntry({
                        ...secureEntry,
                        isLoading: false
                    })
                }
            } catch (error) {
                setSecureEntry({
                    ...secureEntry,
                    isLoading: false
                })
                console.log(error)
                alert(error)
                
            }
        }
        else{
            alert("Please fill all the information")
        }
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <View style={styles.container}>

                <StatusBar backgroundColor='#004d80' barStyle="light-content" />
                <View style={styles.header} />
                <Text style={{
                    fontFamily: 'nunito-bold',
                    fontSize: 28,
                    color: '#fff',
                    paddingLeft: 20
                }}>Let's Get Started!</Text>
                <Text style={{
                    fontFamily: 'nunito-semi',
                    fontSize: 18,
                    paddingBottom: 30,
                    color: '#fff',
                    paddingLeft: 20,
                }}>Sign up to start your Journey!</Text>

                <Animatable.View
                    // animation="fadeInUp"
                    style={styles.footer}
                >

                    <View style={styles.action}>
                        <TextInput
                            placeholder="First Name"
                            style={styles.textInput}
                            onChangeText={(first) => textInputFirstName(first)}
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Last Name"
                            style={styles.textInput}
                            onChangeText={(last) => textInputlastName(last)}
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Email Address"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(userEmailId) => textInputChange(userEmailId)}
                        />
                        
                        {secureEntry.check_textInputChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check"
                                    color="#00e600"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Location"
                            style={styles.textInput}
                            onChangeText={(loc) => textInputLocation(loc)}
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={secureEntry.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(pass1) => handlePasswordChange(pass1)}
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
                                    color="#007acc"
                                    size={17}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Confirm Your Password"
                            style={styles.textInput}
                            secureTextEntry={secureEntry.confirm_secureTextEntry ? true : false}
                            autoCapitalize="none"
                            onChangeText={(pass2) => handleConfirmPasswordChange(pass2)}
                        />
                        <TouchableOpacity
                            onPress={updateConfirmSecureTextEntry}
                        >
                            {secureEntry.confirm_secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="#a6a6a6"
                                    size={17}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="#007acc"
                                    size={17}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                  
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={submitHandler}
                        >
                            <LinearGradient
                               colors={['#4db8ff', '#007acc']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff',
                                }]}>Sign Up</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={styles.textPrivate}>
                            <Text style={styles.color_textPrivate}>
                                Already have an Account?
                </Text>
                            <TouchableOpacity
                                onPress={() => navigation.push('Login')}
                            >
                                <Text style={[{ color: '#007acc' }, { fontFamily: 'nunito-bold' }]}>{" "}Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animatable.View>

            </View>
        </ScrollView>
    );
};

export default ex;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#007acc'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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
        borderBottomColor: '#80ccff',
        borderBottomWidth: 2,
    },
    textInput: {
        fontFamily: 'nunito-regular',
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
        shadowColor: '#000',
        elevation: 6,
    },
    textSign: {
        fontSize: 20,
        fontFamily: 'nunito-bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        fontFamily: 'nunito-regular',
        color: 'grey'
    },
});