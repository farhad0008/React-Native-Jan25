// http://reactnavigation.org/docs/material-top-tab-navigator
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Home from '../screen/Home'
import About from '../screen/About'
import Article from '../screen/Article'

const TopTabNavi = () => {
    const Toptab=createMaterialTopTabNavigator();
  return (
    
    <>
   
    <Toptab.Navigator>
        <Toptab.Screen name='🏠 Home' component={Home} />
        <Toptab.Screen name='ℹ️About' component={About} />
        <Toptab.Screen name='📄Article' component={Article} />
    </Toptab.Navigator>
    
    </>
  )
}

export default TopTabNavi

// const styles = StyleSheet.create({})