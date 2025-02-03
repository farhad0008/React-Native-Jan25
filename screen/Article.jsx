import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Home from './Home'
import About from './About'

const Article = () => {
  const navigation=useNavigation()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <Text>Article</Text>
    <View style={{ marginTop: 15,width:'50%' }}><Button title='About' onPress={() => navigation.navigate(About)} /></View>
    <View style={{ marginTop: 15,width:'50%' }}><Button title='Article' onPress={() => navigation.navigate(Article)} /></View>
    <View style={{ marginTop: 15,width:'50%' }}><Button title='TopTabNavi' onPress={() => navigation.navigate('TopTabNavi')} /></View>
    <View style={{ marginTop: 15,width:'50%' }}><Button title='StackNavi' onPress={() => navigation.navigate('StackNavi')} /></View>
    <View style={{ marginTop: 15,width:'50%' }}><Button title='BottomTabNavi' onPress={() => navigation.navigate('BottomTabNavi')} /></View>
  </View>
  )
}

export default Article

// const styles = StyleSheet.create({})