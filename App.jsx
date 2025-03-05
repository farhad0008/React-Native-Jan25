// when create drower need to import and download dependencies
import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Button, SafeAreaView,ScrollView, StatusBar, Text, View } from 'react-native'
import React, { Component, useEffect } from 'react'
import About from './screen/About.jsx';
import Article from './screen/Article.jsx';
import Home from './screen/Home.jsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavi from './navigator/StackNavi.jsx';
import DrawerNavi from './navigator/DrawerNavi.jsx';
import BottomTabNavi from './navigator/BottomTabNavi.jsx';
import TopTabNavi from './navigator/TopTabNavi.jsx';
import SplashScreen from 'react-native-splash-screen';
import BottomTabBar from './Navigation/BottomTabBar/BottomTabBar.jsx';
import StackNavigator from './Navigation/StackBarNavigator/StackNavigator.js';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const App = ({ navigation }) => {
    // const navigation=useNavigation();
    useEffect(()=>{
        setTimeout(() => {
            SplashScreen.hide();
          }, 10);
    },[])
    return (
        <>
        {/* <SafeAreaView> */}
            <StatusBar
            backgroundColor="#b3e6ff" // Background color of the status bar
            barStyle="dark-content"  //light-content ->white color Text and icon color style
            // hidden={false}          // Show or hide status bar
            translucent={false}    // Whether the status bar is translucent Android only
            // animated={true}
            />
            <NavigationContainer>
                {/* <DrawerNavi />  */}
                <StackNavigator/>
                {/* <BottomTabBar /> */}
            </NavigationContainer>

            {/* <NavigationContainer>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Button title='StackNavigator' onPress={()=>navigation.navigate(StackNavi)} />
            <Button title='DrawerNavigator' onPress={()=>navigation.navigate(DrawerNavi)}/>
            <Button title='BottomNavigator' onPress={()=>navigation.navigate(BottomTabNavi)}/>
            <Button title='TopTabNavigator' onPress={()=>navigation.navigate(TopTabNavi)}/>
        </View>
        </NavigationContainer> */}
            {/* --------Navigation Component  */}
            {/* <StackNavi /> */}
            {/* <DrawerNavi /> */}
            {/* <BottomTabNavi /> */}
            {/* <TopTabNavi /> */}
            {/* <NavigationContainer>
        <Stack.Navigator initialRouteName='About'>
                    <Stack.Screen name='Home' component={Home} />
                    <Stack.Screen name='About' component={About} />
                    <Stack.Screen name='Article' component={Article} />
        </Stack.Navigator>
        </NavigationContainer> */}

            {/* <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={Home} />
                    <Drawer.Screen name="Article" component={Article} />
                    <Drawer.Screen name="About" component={About} />
                </Drawer.Navigator>
            </NavigationContainer> */}

            {/* <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name='Home' component={Home}/>
                    <Tab.Screen name='Article' component={Article}/>
                    <Tab.Screen name='About' component={About}/>
                </Tab.Navigator>
            </NavigationContainer> */}
        {/* </SafeAreaView> */}
        </>
    )
}

export default App

// const styles = StyleSheet.create({})