import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../NavigationScreen/HomeScreen';
import QuestionBank from '../NavigationScreen/QuestionBank';
import YearWiseQuestion from '../NavigationScreen/YearWiseQuestion';
import Test from '../NavigationScreen/Test';
import Profile from '../NavigationScreen/Profile';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BottomTabBar = () => {
    const Tab=createBottomTabNavigator();
    const HomeIcon=(color)=><Feather name='home' color={color} size={22}/>
        
  return (
   
     <Tab.Navigator
       // initialRouteName="QBankScreen"
       screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'rgba(9, 97, 245, 1)',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 9,
        //   fontFamily: Fonts.MulishExtraBold800,
          textAlign: 'center',
        },
        tabBarStyle: {
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
      }}
     >
        <Tab.Screen name='HomeScreen' component={HomeScreen} options={{
            tabBarLabel:"Home",
            tabBarIcon :({color})=><Feather name="home" color={color} size={22} />
        }}/>
        <Tab.Screen name='QuestionBank' component={QuestionBank} 
        options={{
            tabBarLabel:"QBANK",
            tabBarIcon :({color})=><Ionicons name="document-text-outline" color={color} size={25} />
        }}
        />
        <Tab.Screen name='YearWiseQuestion' component={YearWiseQuestion}
        options={{
            tabBarLabel:({focused})=><Text style={{textAlign:'center',fontSize:9,fontWeight:'bold',color:focused?'blue':'black'}} >YEAR WISE QUESTIONS</Text>,
            tabBarIcon :({color})=><AntDesign name="message1" color={color} size={25} />
        }}
        />
        <Tab.Screen name='Test' component={Test}
         options={{
            tabBarLabel:"Test",
            tabBarIcon :({color})=><AntDesign name="wallet" color={color} size={25} />
        }}
        
        />
        <Tab.Screen name='Profile' component={Profile}
         options={{
            tabBarLabel:"PROFILE",
            tabBarIcon :({color})=><AntDesign name="user" color={color} size={25} />
        }}
        />
     </Tab.Navigator>
  )
}

export default BottomTabBar

const styles = StyleSheet.create({})