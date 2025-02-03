import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import About from './About.jsx';
import Article from './Article.jsx';
import TopTabNavi from '../navigator/TopTabNavi.jsx';
import DrawerNavi from '../navigator/DrawerNavi.jsx';
import SignUp from './SignUp.jsx';
// import { createDrawerNavigator } from '@react-navigation/drawer';

const Home = () => {
  const navigation = useNavigation({ navigation });
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Text>🏠 Home</Text>
      <View style={{ marginTop: 15,width:'50%' }}><Button title='About' onPress={() => navigation.navigate(About)} /></View>
      <View style={{ marginTop: 15,width:'50%' }}><Button title='Article' onPress={() => navigation.navigate(Article)} /></View>
      <View style={{ marginTop: 15,width:'50%' }}><Button title='SignUp' onPress={() => navigation.navigate('SignUp')} /></View>
      <View style={{ marginTop: 15,width:'50%' }}><Button title='TopTabNavi' onPress={() => navigation.navigate('TopTabNavi')} /></View>
      <View style={{ marginTop: 15,width:'50%' }}><Button title='StackNavi' onPress={() => navigation.navigate('StackNavi')} /></View>
      <View style={{ marginTop: 15,width:'50%' }}><Button title='BottomTabNavi' onPress={() => navigation.navigate('BottomTabNavi')} /></View>
      <View style={{ marginTop: 15,width:'50%' }}><Button title='BottomSheet' onPress={() => navigation.navigate('BottomSheet')} /></View>
      {/*  */}
    </View>
  )
}

export default Home

// const styles = StyleSheet.create({})