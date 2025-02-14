//https://reactnavigation.org/docs/drawer-navigator
import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screen/Home';
import Article from '../screen/Article';
import About from '../screen/About';
import StackNavi from './StackNavi';
import BottomTabNavi from './BottomTabNavi';
import TopTabNavi from './TopTabNavi';
import BottomSheet from './BottomSheet';
import SignUp from '../screen/SignUp';
import UserDetails from '../screen/UserDetails';
import HomeRedux from '../redux/HomeRedux';
import TodoHome from '../reduxToolkit/TodoHome'
import ProductList from '../reduxToolkit/ProductList';
import CartDetails from '../reduxToolkit/CartDetails';

const DrawerNavi = () => {
  const Drawer=createDrawerNavigator();
    return (
    <>
        <Drawer.Navigator>
          {/* <Text>hello:</Text> */}
            <Drawer.Screen name='Home' component={Home} />
            <Drawer.Screen name='About' component={About} />
            <Drawer.Screen name='Article' component={Article} />
            <Drawer.Screen name='UserDetails' component={UserDetails} />
            <Drawer.Screen name='HomeRedux' component={HomeRedux} />
            <Drawer.Screen name='TodoHome' component={TodoHome} />
            <Drawer.Screen name='ProductList' component={ProductList} />
            <Drawer.Screen name='CartDetails' component={CartDetails} />
            <Drawer.Screen name='StackNavi' component={StackNavi} options={{headerShown:false}} />
            <Drawer.Screen name='BottomTabNavi' component={BottomTabNavi} options={{headerShown:false}} />
            <Drawer.Screen name='TopTabNavi' component={TopTabNavi} options={{headerShown:false}} />
            <Drawer.Screen name='BottomSheet' component={BottomSheet} options={{headerShown:false}} />
            <Drawer.Screen name='SignUp' component={SignUp} options={{headerShown:false}} />
        </Drawer.Navigator>
    </>
  )
}
export default DrawerNavi

// const styles = StyleSheet.create({})