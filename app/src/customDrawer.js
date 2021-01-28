import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { Drawer } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { Icon, Container, Body, H3, Header, Content, Thumbnail, ListItem, Left, Right, List, Footer, FooterTab } from 'native-base'
import { Switch } from 'react-native-gesture-handler';
import { UserContext } from '../src/Login'

function Sidebar({ ...props }) {
    return (
        <Container>
            <Header androidStatusBarColor="#004d80" style={{ backgroundColor: '#007acc', height: 84 }}>
                <View style={{ flex: 1 }}>
                    <ListItem thumbnail>
                        <Left>
                            <Thumbnail
                                source={{
                                    uri: 'https://i.stack.imgur.com/34AD2.jpg'
                                }}
                            />
                        </Left>
                        <Body>
                        <H3 style={{ color: "#fff" }}>Hey, firstName</H3>
                                            <Text style={{ color: '#fff' }}>email@gamil.com</Text>
                            {/* <UserContext.Consumer>
                                {
                                    user => {
                                        return (<View>
                                            <H3 style={{ color: "#fff" }}>{user.firstName}</H3>
                                            <Text style={{ color: '#fff' }}>email@gamil.com</Text>
                                        </View>)
                                    }
                                }
                            </UserContext.Consumer> */}
                        </Body>
                    </ListItem>
                </View>
            </Header>
            <Content>

                <DrawerContentScrollView {...props}>

                    <DrawerItemList {...props} />
                    <DrawerItem
                        label="Settings"
                        icon={({ color, size }) => <Icon name="settings"
                            style={{ fontSize: size, color: color }} />}
                        onPress={() => props.navigation.navigate('Home')}
                    />
                    <DrawerItem
                        label="Rate Us"
                        icon={({ color, size }) => <Icon name="star"
                            style={{ fontSize: size, color: color }} />}
                        onPress={() => props.navigation.navigate('Home')}
                    />
                    <DrawerItem
                        label="Log Out"
                        icon={({ color, size }) => <Icon name="log-out"
                            style={{ fontSize: size, color: color }} />}
                        onPress={() => props.navigation.push('Login')}
                    />

                </DrawerContentScrollView>

            </Content>


        </Container>

    )
}

export default Sidebar;