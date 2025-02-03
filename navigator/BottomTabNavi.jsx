//https://reactnavigation.org/docs/bottom-tab-navigator
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import About from '../screen/About'
import Article from '../screen/Article'
import Home from '../screen/Home'
import TopTabNavi from './TopTabNavi'

const BottomTabNavi = () => {
    const BottomTab = createBottomTabNavigator();
    return (
        <>
        
                <BottomTab.Navigator
                    initialRouteName="About"
                    screenOptions={{
                        tabBarStyle: {
                            position: 'absolute',
                            bottom: 0,
                            left: 20,
                            right: 20,
                            borderRadius: 20,
                            backgroundColor: 'tomato',
                            height: 60,
                          },
                    }}
                >
                    <BottomTab.Screen name='Home' component={Home}
                        options={
                            { tabBarBadge: 3 }
                        }
                    />
                    <BottomTab.Screen name='About' component={About} />
                    <BottomTab.Screen name='Article' component={Article} />
                </BottomTab.Navigator>
            
        </>
    )
}

export default BottomTabNavi

const styles = StyleSheet.create({})