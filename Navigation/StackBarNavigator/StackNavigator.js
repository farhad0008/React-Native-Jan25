import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../../screen/Login';
import ChapterScreen from '../NavigationScreen/ChapterScreen';
import BottomTabBar from '../BottomTabBar/BottomTabBar';
import TopicQuestionsScreen from '../NavigationScreen/TopicQuestionsScreen';
import QuestionScreen from '../NavigationScreen/QuestionScreen';
import EditProfile from '../NavigationScreen/EditProfile';
import CourseScreen from '../NavigationScreen/CourseScreen';
import ContactUs from '../NavigationScreen/ContactUs';
import Privacy from '../NavigationScreen/Privacy';


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
        <Stack.Screen name='TopicQuestionsScreen' component={TopicQuestionsScreen} />
        <Stack.Screen name='QuestionScreen' component={QuestionScreen} />
        <Stack.Screen name='EditProfile' component={EditProfile} />
        <Stack.Screen name='CourseScreen' component={CourseScreen} 
        options={{
          headerTitle:'Courses',
          headerShown: true,
        }}
        />
        <Stack.Screen name='ContactUs' component={ContactUs} 
         options={{
          headerTitle:'ContactUs',
          headerShown: true,
        }}
        />
        <Stack.Screen name='Privacy' component={Privacy} 
         options={{
          headerTitle:'Privacy & Policy',
          headerShown: true,
        }}
        />

    </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})