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

} from 'react-native';
import { Icon } from 'native-base'
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Sidebar from '../src/customDrawer'


const Drawer = createDrawerNavigator();

const HomeContent = ({ navigation }) => {
    return (

        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <StatusBar backgroundColor='#004d80' barStyle="light-content" />
                <View style={styles.header}>
                    <View style={{ paddingTop: 13 }}>
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Feather
                                name="menu"
                                size={24}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        flexDirection: 'row',
                        fontFamily: 'nunito-bold',
                        fontSize: 20,
                        color: '#fff',
                        paddingLeft: 15,
                        paddingTop: 10
                    }}>Smart</Text>
                    <Text style={{fontFamily: 'nunito-bold',
                        fontSize: 20,
                        color: '#fff',
                        paddingLeft:2,
                        paddingTop: 10}}>Agro</Text>
                </View>
                <View
                    style={styles.footer}
                >
                   
                        <View style={styles.box}>
                        <TouchableOpacity >
                            <Text style={{
                                color: '#007acc',
                                textAlign: 'center',
                                fontFamily: 'nunito-semi',
                                fontSize: 20,
                                paddingVertical: 25
                            }}>View 1</Text>
                             </TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: 20 }} />
                   
                        <View style={styles.box}>
                        <TouchableOpacity >
                            <Text style={{
                                color: '#007acc',
                                textAlign: 'center',
                                fontFamily: 'nunito-semi',
                                fontSize: 20,
                                paddingVertical: 25
                            }}>View 2</Text>
                             </TouchableOpacity>
                        </View>
                    <View style={{ paddingTop: 20 }} />

                    <View style={styles.box}>
                        <TouchableOpacity >
                            <Text style={{
                                color: '#007acc',
                                textAlign: 'center',
                                fontFamily: 'nunito-semi',
                                fontSize: 20,
                                paddingVertical: 25
                            }}>View 3</Text>
                             </TouchableOpacity>
                        </View>
                    <View style={{ paddingTop: 20 }} />

                    <View style={styles.box}>
                        <TouchableOpacity >
                            <Text style={{
                                color: '#007acc',
                                textAlign: 'center',
                                fontFamily: 'nunito-semi',
                                fontSize: 20,
                                paddingVertical: 25
                            }}>View 4</Text>
                             </TouchableOpacity>
                        </View>
                </View>
                <View style={{ backgroundColor: '#fff', }}>
                    <View style={{
                        justifyContent: 'flex-end',
                        paddingBottom: 25,
                        paddingRight: 20,
                        alignSelf: 'flex-end'
                    }}>
                        <View style={{
                            backgroundColor: '#007acc',
                            borderBottomEndRadius: 30,
                            borderTopRightRadius: 30,
                            borderTopLeftRadius: 30,
                            borderBottomLeftRadius: 30,
                            elevation:6
                        }}>
                            <View style={{
                                paddingRight: 15,
                                paddingBottom: 15,
                                paddingTop: 15,
                                paddingLeft: 15
                            }}>
                                <TouchableOpacity>
                                    <Feather
                                        name="plus"
                                        color="#fff"
                                        size={30}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>


            </ScrollView>
        </View>
    );
};

const Screen1Content = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{
                flexDirection: 'row',
                backgroundColor: "#007acc",
                height: 50,
                elevation: 10,
                paddingLeft: 10
            }}>
                <View style={{ paddingTop: 13 }}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Feather
                            name="menu"
                            size={24}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
                <Text style={{
                    fontFamily: 'nunito-bold',
                    fontSize: 20,
                    color: '#fff',
                    paddingLeft: 15,
                    paddingTop: 10
                }}>Screen1</Text>
            </View>
            <Text>SCREEN1</Text>
        </View>
    )
}


const Home = ({ route }) => {
    const { userData } = route.params;
    console.log(userData)
    return (
        <Drawer.Navigator initialRouteName={'Home'} drawerContent={props => <Sidebar {...props} />}>
            <Drawer.Screen name="Home" component={HomeContent}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="home" style={{ fontSize: size, color: color }} />
                    )
                }}
            />
            <Drawer.Screen name="Screen1" component={Screen1Content} />
        </Drawer.Navigator>
    )
}

export default Home;





const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        backgroundColor: "#007acc",
        height: 50,
        elevation: 10,
        paddingLeft: 10
    },
    box: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingLeft: 20,
        paddingBottom: 20,
        paddingRight: 20,
        elevation: 7
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomColor: '#b380ff',
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
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
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