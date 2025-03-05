import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../../screen/Login';
import ChapterScreen from '../NavigationScreen/ChapterScreen';
import BottomTabBar from '../BottomTabBar/BottomTabBar';


const StackNavigator = () => {
    const Stack=createNativeStackNavigator();
  return (
    
    <Stack.Navigator
        screenOptions={{
            headerShown:false,
        }}
        initialRouteName='BottomTabBar'
    >
        
        <Stack.Screen name='BottomTabBar' component={BottomTabBar} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='ChapterScreen' component={ChapterScreen} />
    </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})